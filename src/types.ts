import type { ReactNode } from "react";

export type File = {
  type: "file";
  content: string;
  mime: "text/plain" | "text/markdown" | "application/json";
};

export type Directory = {
  type: "directory";
  children: { [key: string]: File | Directory };
};

export type FileSystemNode = File | Directory;

export type CommandProcessorResult = {
  output: ReactNode | "clear";
  newPath?: string;
};

export type CommandHistoryEntry = {
  id: number;
  command: string;
  output: ReactNode;
};
