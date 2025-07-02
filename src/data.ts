import type { Directory } from "./types";

export const fileSystem: Directory = {
  type: "directory",
  children: {
    "about.md": {
      type: "file",
      mime: "text/markdown",
      content:
        "I'm a passionate Senior Frontend Engineer specializing in creating beautiful, functional, and user-centric web applications with React and TypeScript. I thrive on solving complex problems and turning ideas into reality.\n\nThis terminal is a small showcase of my love for creative and clean interfaces.",
    },
    "skills.json": {
      type: "file",
      mime: "application/json",
      content: JSON.stringify(
        {
          languages: ["TypeScript", "JavaScript", "HTML", "CSS"],
          frameworks: ["React", "Next.js", "Node.js"],
          styling: ["Tailwind CSS", "CSS-in-JS"],
          apis: ["Gemini API", "REST", "GraphQL"],
          other: ["UI/UX Design", "Web Performance", "State Management"],
        },
        null,
        2,
      ),
    },
    projects: {
      type: "directory",
      children: {
        "this-portfolio.md": {
          type: "file",
          mime: "text/markdown",
          content:
            "This very terminal portfolio. It's built with React, TypeScript, and Tailwind CSS, and features an integration with the Google Gemini API. The goal was to create a unique, interactive, and memorable portfolio experience. You can find the source code on [GitHub](https://github.com).",
        },
        "project-a.md": {
          type: "file",
          mime: "text/markdown",
          content:
            "An interactive data visualization dashboard built with React, D3, and TypeScript. It allows users to explore complex datasets with dynamic charts and filters.",
        },
        "project-b.md": {
          type: "file",
          mime: "text/markdown",
          content:
            "A real-time chat application using WebSockets, React, and a modern UI framework. Features include private messaging, user presence, and message history.",
        },
      },
    },
    "contact.txt": {
      type: "file",
      mime: "text/plain",
      content:
        "Let's connect:\n\nEmail:    hello@example.com\nGitHub:   https://github.com/your-profile\nLinkedIn: https://linkedin.com/in/your-profile",
    },
  },
};
