# Margdarshak - React Frontend Application

Margdarshak is a modern React-based frontend application built with Vite, featuring real-time communication capabilities using Agora SDK, data visualization with Chart.js and Recharts, and a beautiful UI powered by Tailwind CSS.

## Features

- Real-time communication using Agora SDK
- Interactive data visualization with Chart.js and Recharts
- Modern UI components with Tailwind CSS
- Markdown support with React Markdown
- Syntax highlighting for code blocks
- Responsive design
- Client-side routing with React Router

## Tech Stack

- React 19
- Vite 6
- Tailwind CSS 4
- Agora RTC SDK
- Chart.js & Recharts
- React Router DOM
- Lucide React Icons

## Prerequisites

- Node.js (Latest LTS version recommended)
- npm or yarn package manager

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd margdarshak
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory and add your environment variables:
```
VITE_AGORA_APP_ID=your_agora_app_id
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

## Project Structure

```
src/
├── assets/         # Static assets
├── components/     # Reusable React components
├── context/        # React context providers
├── App.jsx         # Main application component
├── main.jsx        # Application entry point
└── index.css       # Global styles
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
