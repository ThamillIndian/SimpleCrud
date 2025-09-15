# CodeCraftr - Product Inventory Management System

A modern, full-stack product inventory management application built with React, TypeScript, Node.js, and PostgreSQL. This application provides a clean, intuitive interface for managing product inventory with CRUD operations.

<div style="display: flex; gap: 1rem; margin: 1rem 0;">
  <img src="./attached_assets/Screenshot 2025-09-15 231322.png" alt="Product List View" style="width: 48%; border: 1px solid #e5e7eb; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1);" />
  <img src="./attached_assets/Screenshot 2025-09-15 231334.png" alt="Product Edit View" style="width: 48%; border: 1px solid #e5e7eb; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1);" />
</div>

## Features

- **Product Management**: Add, view, edit, and delete products
- **Responsive Design**: Works on desktop and mobile devices
- **Dark/Light Mode**: Toggle between themes for comfortable viewing
- **Modern UI**: Built with Radix UI and Tailwind CSS
- **Type Safety**: Full TypeScript support
- **Real-time Updates**: Powered by React Query

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI Components**: Radix UI, Tailwind CSS
- **State Management**: React Query
- **Backend**: Node.js, Express
- **Database**: PostgreSQL with Drizzle ORM
- **Form Handling**: React Hook Form with Zod validation

## Project Structure

```
.
├── client/                 # Frontend React application
│   ├── public/            # Static assets
│   └── src/               # Source files
│       ├── components/    # Reusable UI components
│       ├── hooks/         # Custom React hooks
│       ├── lib/           # Utility functions and configurations
│       └── App.tsx        # Main application component
│
├── server/                # Backend server
│   ├── db/               # Database configurations
│   ├── routes/           # API routes
│   ├── models/           # Database models
│   └── index.ts          # Server entry point
│
├── shared/               # Shared code between frontend and backend
│   └── schema.ts         # Shared TypeScript types and validations
│
├── .gitignore            # Git ignore file
├── package.json          # Project dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── vite.config.ts        # Vite configuration
```

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- pnpm (recommended) or npm

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/ThamillIndian/SimpleCrud
   cd CodeCraftr
   ```

2. Install dependencies
   ```bash
   pnpm install
   ```

3. Set up environment variables
   Create a `.env` file in the root directory with the following variables:
   ```env
   DATABASE_URL=your_database_connection_string
   NODE_ENV=development
   ```

4. Set up the database
   ```bash
   pnpm db:push
   ```

5. Start the development server
   ```bash
   pnpm dev
   ```

6. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `pnpm dev` - Start the development server
- `pnpm build` - Build the application for production
- `pnpm start` - Start the production server
- `pnpm check` - Type-check the codebase
- `pnpm db:push` - Push database schema changes

## Design System

This application follows a utility-focused design system based on Material Design principles. For detailed design guidelines, see [DESIGN_GUIDELINES.md](./design_guidelines.md).

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Radix UI](https://www.radix-ui.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [React Query](https://tanstack.com/query/latest/)
- [Vite](https://vitejs.dev/)
