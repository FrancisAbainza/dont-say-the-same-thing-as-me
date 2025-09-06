# Don't Say The Same Thing As Me

This is a fun and interactive web-based game built with Next.js, Drizzle ORM, Neon, and Clerk for authentication. The goal of the game is to provide unique answers to prompts without repeating what computer have said.

## Features

*   **Real-time Gameplay:** Compete with other players in real-time.
*   **Unique Answers:** Challenge your creativity by providing answers that no one else has submitted.
*   **Leaderboard:** See how you stack up against other players.
*   **Database:** Powered by Neon with Drizzle ORM for type-safe database interactions.

## Technologies Used

*   [Next.js](https://nextjs.org/): React framework for building full-stack web applications.
*   [Drizzle ORM](https://orm.drizzle.team/): TypeScript ORM for Neon.
*   [Neon](https://neon.tech/): Serverless PostgreSQL.
*   [OpenAI](https://openai.com/): For AI-powered features.
*   [Tailwind CSS](https://tailwindcss.com/): Utility-first CSS framework.
*   [shadcn/ui](https://ui.shadcn.com/): Reusable UI components.
*   [Vercel](https://vercel.com/): Platform for frontend frameworks and static sites.

## Getting Started

### Prerequisites

Before running this project, you will need:

*   Node.js (LTS recommended)
*   npm or yarn
*   A Neon account and PostgreSQL database

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/FrancisAbainza/dont-say-the-same-thing-as-me.git
    cd dont-say-the-same-thing-as-me
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up environment variables:**

    Create a `.env.local` file in the root of your project and add the following:

    ```env
    DATABASE_URL="YOUR_NEON_DATABASE_URL"
    OPENAI_API_KEY="YOUR_OPENAI_API_KEY"
    ```

    Replace the placeholder values with your actual Neon database URL and OpenAI API key.

4.  **Run database migrations:**

    ```bash
    npm run db:push
    # or
    yarn db:push
    ```

5.  **Start the development server:**

    ```bash
    npm run dev
    # or
    yarn dev
    ```

    Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Contributing

Contributions are welcome! Please feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
