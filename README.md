# Todo App

A modern, feature-rich todo application built with Next.js 15, featuring drag-and-drop functionality, dark mode, and persistent storage.

## Features

- **Task Management**: Create, complete, and delete tasks with an intuitive interface
- **Filtering System**: View all tasks, active tasks, or completed tasks
- **Drag and Drop**: Reorder tasks with long-press activation for better mobile experience
- **Dark Mode**: Toggle between light and dark themes with persistent preference
- **Local Storage**: Tasks and theme preferences persist across browser sessions
- **Responsive Design**: Optimized for both mobile and desktop devices
- **Smooth Animations**: Polished transitions and interactions throughout the interface

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4
- **Drag and Drop**: @dnd-kit/core, @dnd-kit/sortable
- **Language**: JavaScript (React)
- **State Management**: React Hooks (useState, useEffect)

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

### Installation

1. Clone the repository

```bash
git clone https://github.com/lianxxxx/todo-app-next-js
cd todo-app-next-js
```

2. Install dependencies

```bash
npm install
```

3. Run the development server

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
todo-app-next-js/
├── src/
│   ├── app/
│   │   ├── layout.js           # Root layout with theme provider
│   │   ├── page.js             # Main application page
│   │   └── globals.css         # Global styles and Tailwind configuration
│   ├── components/
│       ├── BgImage.jsx         # Background image component with theme toggle
│       ├── TodoInput.jsx       # Input component for creating new todos
│       └── TodoList.jsx        # List component with drag-drop and filtering
│
└── public/
    ├── bg-desktop-dark.jpg
    ├── bg-desktop-light.jpg
    ├── bg-mobile-dark.jpg
    ├── bg-mobile-light.jpg
    ├── icon-check.svg
    ├── icon-cross.svg
    ├── icon-logo.png
    └── icon-moon.svg
    └── icon-sun.svg
```

## Usage

### Adding a Todo

Type your task in the input field and press Enter to add it to the list.

### Completing a Todo

Click the circle button next to a task to mark it as complete. Click again to mark as incomplete.

### Deleting a Todo

Click the X icon on the right side of any task to remove it from the list.

### Reordering Tasks

Long-press (250ms) on any task text to activate drag mode, then drag to reorder.

### Filtering Tasks

Use the filter buttons to switch between:

- **All**: Show all tasks
- **Active**: Show only incomplete tasks
- **Completed**: Show only completed tasks

### Clearing Completed Tasks

Click "Clear Completed" to remove all completed tasks from the list.

### Theme Toggle

Click the sun/moon icon in the header to switch between light and dark modes.

## Key Features Explained

### Long-Press Drag Activation

The drag-and-drop functionality requires a 250ms hold before activation, preventing accidental drags while allowing normal interactions like clicking to complete or delete tasks.

### Persistent Storage

All tasks and theme preferences are automatically saved to browser localStorage, ensuring your data persists across sessions.

### Responsive Layout

The application adapts seamlessly between mobile and desktop viewports, with optimized layouts for each screen size.

### Gradient Styling

Custom gradient borders and backgrounds enhance the visual appeal, with proper fallbacks for completed task indicators.

## Performance Optimizations

- Next.js App Router for optimal bundle splitting
- Image optimization with Next.js Image component
- Efficient re-rendering with React keys and memoization patterns
- Minimal dependencies for faster load times

## License

This project is open source and available under the MIT License.

## Acknowledgments

- Design inspiration from Frontend Mentor
- Built with Next.js and Tailwind CSS
- Drag and drop powered by dnd-kit

## Contact

For questions or feedback, please open an issue in the repository.
