import { getNode } from "./getNode";
import { resolvePath } from "./resolvePath";

export const getAutocompleteSuggestions = (
  inputValue: string,
  currentPath: string,
): string[] => {
  const allCommands = ["ls", "cd", "cat", "pwd", "help", "clear", "snake"];
  const parts = inputValue.trim().split(/\s+/);

  // If typing the command itself
  if (parts.length <= 1 && !inputValue.endsWith(" ")) {
    return allCommands.filter((cmd) => cmd.startsWith(parts[0]));
  }

  // Path/file completion for relevant commands
  const command = parts[0];
  const pathCommands = ["ls", "cd", "cat"];
  if (!pathCommands.includes(command)) return [];

  const pathArg = parts.length > 1 ? parts[parts.length - 1] : "";
  const pathBase = pathArg.substring(0, pathArg.lastIndexOf("/") + 1);
  const partial = pathArg.substring(pathArg.lastIndexOf("/") + 1);

  const dirToSearchIn = resolvePath(currentPath, pathBase || ".");
  const node = getNode(dirToSearchIn);

  if (node?.type === "directory") {
    return Object.keys(node.children).filter((name) =>
      name.startsWith(partial),
    );
  }

  return [];
};
