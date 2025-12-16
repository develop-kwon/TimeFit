# Quickstart Guide

This guide provides the initial steps to set up and run the job portal frontend application.

## Prerequisites

*   Node.js (v18 or later recommended)
*   npm or yarn package manager

## Setup

1.  **Clone the repository** (if not already done).
2.  **Navigate to the frontend directory**:
    ```bash
    cd frontend
    ```
3.  **Install dependencies**:
    ```bash
    npm install
    # or
    yarn install
    ```

## Running the Development Server

Start the Vite development server:

```bash
npm run dev
# or
yarn dev
```

This will typically start the application on `http://localhost:5173` (or another port if 5173 is in use). The application will automatically reload on code changes.

## Building for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

This command compiles your application and creates an optimized build in the `frontend/dist/` directory.

## Further Information

For more detailed information, refer to the project's `README.md` and the individual component/page documentation.
