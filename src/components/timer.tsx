"use client"

import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react"
import { AlarmClock } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

export interface TimerRef {
  start: (duration?: number) => void
  stop: () => void
}

interface TimerProps {
  className?: string
  label?: string
  onComplete?: () => void
  onTick?: (remainingTime: number, progress: number) => void
}

export const Timer = forwardRef<TimerRef, TimerProps>(({ className, label, onComplete, onTick }, ref) => {
  const [duration, setDuration] = useState(10) // Default 10 seconds
  const [timeLeft, setTimeLeft] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const startTimeRef = useRef<number>(0)
  const [smoothProgress, setSmoothProgress] = useState(0)

  const formatTime = (seconds: number) => {
    if (seconds >= 60) {
      const mins = Math.floor(seconds / 60)
      const secs = seconds % 60
      return `${mins}m ${secs}s`
    }
    return `${seconds}s`
  }

  const start = (newDuration?: number) => {
    if (newDuration !== undefined) {
      setDuration(newDuration)
      setTimeLeft(newDuration)
    } else if (timeLeft === 0) {
      setTimeLeft(duration)
    }
    startTimeRef.current = Date.now()
    setIsRunning(true)
  }

  const stop = () => {
    setIsRunning(false)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  useImperativeHandle(ref, () => ({
    start,
    stop,
  }))

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        const elapsed = (Date.now() - startTimeRef.current) / 1000
        const remaining = Math.max(0, duration - elapsed)
        const progress = duration > 0 ? (remaining / duration) * 100 : 0

        setSmoothProgress(progress)

        // Update time left every second
        const newTimeLeft = Math.ceil(remaining)
        if (newTimeLeft !== timeLeft) {
          setTimeLeft(newTimeLeft)
          onTick?.(newTimeLeft, progress)
        }

        if (remaining <= 0) {
          setIsRunning(false)
          setTimeLeft(0)
          setSmoothProgress(0)
          onComplete?.()
        }
      }, 50) // Update every 50ms for smooth animation
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning, duration, onComplete, onTick])

  return (
    <div className={cn("flex gap-3 items-center", className)}>
      <AlarmClock className={cn("h-5 w-5 transition-colors", isRunning ? "text-primary" : "text-muted-foreground")} />
      <div className="w-20 sm:w-40 md:w-60">
        <p
          className={cn(
            "text-sm font-medium mb-1 transition-colors",
            isRunning ? "text-foreground" : "text-muted-foreground",
          )}
        >
          {label ? `${label} ` : ""}
          {formatTime(timeLeft)}
        </p>
        <Progress value={smoothProgress} className="h-2" />
      </div>
    </div>
  )
})

Timer.displayName = "Timer"
