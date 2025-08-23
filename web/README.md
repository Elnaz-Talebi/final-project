# Final Project 🚀

A full-stack web application built with Next.js frontend and Express.js backend API.

## 🏗️ Project Structure

This project consists of two main parts:

- **`web/`** - Next.js frontend application
- **`api/`** - Express.js backend API server

## 🎯 What's Been Built So Far

### Frontend (Next.js)

- **Modern React 19** with Next.js 15.5
- **Material-UI Integration** using @mui/material and @emotion
- **Component Architecture** with reusable components:
  - `Home.jsx` - Main landing page with welcome message
  - `Button.jsx` - Custom styled button component
  - `Header.jsx` - Application header with project title
  - `Footer.jsx` - Footer with dynamic year display
- **Responsive Design** with CSS-in-JS styling
- **Client-side Interactivity** with click handlers and alerts

### Backend (Express.js)

- **Express 5.1** server with modern ES6+ features
- **CORS Support** for cross-origin requests
- **Environment Configuration** using dotenv
- **Health Check Endpoint** at `/health` for monitoring
- **Development Mode** with nodemon for auto-restart
- **Configurable Port** (defaults to 4000)

## 🚀 Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager

### Frontend Setup

```bash
cd web
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the frontend.

### Backend Setup

```bash
cd api
npm install
npm run dev
```

The API will be available at [http://localhost:4000](http://localhost:4000).

## 🛠️ Available Scripts

### Frontend (web/)

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Backend (api/)

- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server

## 📁 Project Structure

```
final-project/
├── web/                    # Next.js frontend
│   ├── src/
│   │   ├── app/           # Next.js app router
│   │   ├── components/    # React components
│   │   └── globals.css    # Global styles
│   ├── public/            # Static assets
│   └── package.json       # Frontend dependencies
├── api/                   # Express.js backend
│   ├── src/
│   │   └── index.js       # Main server file
│   └── package.json       # Backend dependencies
└── README.md              # This file
```

## 🔧 Technologies Used

### Frontend

- **Next.js 15.5** - React framework
- **React 19.1** - UI library
- **Material-UI 7.3** - Component library
- **Emotion** - CSS-in-JS styling

### Backend

- **Express.js 5.1** - Web framework
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management
- **nodemon** - Development server with auto-restart

## 🌟 Features Implemented

- ✅ **Responsive UI Components** - Header, Footer, Button, Home page
- ✅ **Interactive Elements** - Clickable buttons with event handlers
- ✅ **Modern Styling** - Clean, professional appearance
- ✅ **API Health Check** - Backend monitoring endpoint
- ✅ **Development Workflow** - Hot reloading for both frontend and backend
- ✅ **Cross-Origin Support** - Ready for frontend-backend communication

## 🚧 Next Steps

Potential areas for future development:

- [ ] Database integration

## 📝 Development Notes

Will update here..

## 📄 License

This project is for educational and portfolio purposes.
