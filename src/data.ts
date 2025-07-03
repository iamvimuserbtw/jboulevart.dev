import { aboutMeContent } from "./content/about-me";
import { educationContent } from "./content/education";
import { employmentContent } from "./content/employment";
import type { Directory } from "./types";

export const fileSystem: Directory = {
  type: "directory",
  children: {
    "jboulevart.dev": {
      type: "directory",
      children: {
        "about-me.md": {
          type: "file",
          mime: "text/markdown",
          content: aboutMeContent,
        },
        "education.md": {
          type: "file",
          mime: "text/markdown",
          content: educationContent,
        },
        "employment.md": {
          type: "file",
          mime: "text/markdown",
          content: employmentContent,
        },
      },
    },
  },
};
