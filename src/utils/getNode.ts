import { fileSystem } from "../data";
import type { FileSystemNode } from "../types";

export const getNode = (path: string): FileSystemNode | null => {
  if (path === "~" || path === "/") return fileSystem;
  const parts = path.replace(/^~\//, "").split("/");
  let currentNode: FileSystemNode = fileSystem;
  for (const part of parts) {
    if (currentNode.type === "directory" && currentNode.children[part]) {
      currentNode = currentNode.children[part];
    } else {
      return null;
    }
  }
  return currentNode;
};
