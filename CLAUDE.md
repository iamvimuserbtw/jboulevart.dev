# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal website built as a terminal-style interface using React, TypeScript, and Vite. The site simulates a Unix-like terminal where users can explore content using familiar commands like `ls`, `cd`, `cat`, and `help`.

## Development Commands

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production (runs TypeScript compiler then Vite build)
- `npm run lint` - Run ESLint to check code quality
- `npm run preview` - Preview production build locally

## Architecture

### Core Components

- **Terminal** (`src/components/Terminal.tsx`) - Main terminal interface with command input, history, and autocompletion
- **Command Processor** (`src/utils/commandProcessor.tsx`) - Handles command parsing and execution
- **File System** (`src/data.ts`) - Virtual file system structure containing markdown content

### Virtual File System

The site uses a virtual file system defined in `src/data.ts` with the following structure:
- Files are stored as objects with `type: "file"` and markdown content
- Directories have `type: "directory"` and contain `children` objects
- Content files are imported from `src/content/` directory (about-me.ts, education.ts, employment.ts)

### Terminal Commands

Supported commands are processed in `src/utils/commandProcessor.tsx`:
- `ls` - List directory contents
- `cd` - Change directory
- `cat` - Display file content (renders markdown)
- `pwd` - Print working directory
- `help` - Show available commands
- `clear` - Clear terminal history

### Key Features

- **Autocompletion** - Tab completion for commands and paths
- **Command History** - Previous commands are displayed in terminal
- **Markdown Rendering** - Files are rendered as markdown using react-markdown
- **Path Resolution** - Supports relative and absolute paths
- **Responsive Design** - Works on mobile and desktop

### Styling

- Uses Tailwind CSS with custom Catppuccin theme colors
- Terminal styling with monospace font and terminal-like appearance
- Custom CSS classes for terminal colors (text-green, text-blue, text-mauve, etc.)

## File Structure

```
src/
├── components/          # React components
│   ├── Terminal.tsx     # Main terminal interface
│   ├── FileContent.tsx  # Markdown file renderer
│   ├── DirectoryListing.tsx  # Directory contents display
│   └── [other components]
├── utils/               # Utility functions
│   ├── commandProcessor.tsx  # Command execution logic
│   ├── getNode.ts       # File system navigation
│   └── resolvePath.ts   # Path resolution
├── content/             # Content files (markdown strings)
└── data.ts             # Virtual file system definition
```

## Adding New Content

To add new content:
1. Create content file in `src/content/` (e.g., `projects.ts`)
2. Add file to virtual file system in `src/data.ts`
3. Content should be markdown strings exported as constants

## Testing

Currently no test framework is configured. When adding tests, check the project structure and add appropriate test commands to package.json scripts.