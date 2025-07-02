import { CommandNotFound } from "../components/CommandNotFound";
import { DirectoryListing } from "../components/DirectoryListing";
import { ErrorOutput } from "../components/ErrorOutput";
import { FileContent } from "../components/FileContent";
import { HelpOutput } from "../components/HelpOutput";
import { SnakeGame } from "../components/SnakeGame";
import type { CommandProcessorResult } from "../types";
import { getNode } from "./getNode";
import { resolvePath } from "./resolvePath";

export const commandProcessor = (
  commandLine: string,
  currentPath: string,
): Promise<CommandProcessorResult> => {
  return new Promise((resolve) => {
    const [command, ...args] = commandLine.trim().split(/\s+/);
    const lowerCaseCommand = command.toLowerCase();

    switch (lowerCaseCommand) {
      case "help":
        resolve({ output: <HelpOutput /> });
        break;
      case "clear":
        resolve({ output: "clear" });
        break;
      case "":
        resolve({ output: null });
        break;
      case "pwd":
        resolve({ output: <p>{currentPath}</p> });
        break;
      case "ls": {
        const targetPath = args[0]
          ? resolvePath(currentPath, args[0])
          : currentPath;
        const node = getNode(targetPath);
        if (node?.type === "directory") {
          resolve({ output: <DirectoryListing node={node} /> });
        } else {
          resolve({
            output: (
              <ErrorOutput
                message={`ls: cannot access '${args[0] || "."}': Not a directory`}
              />
            ),
          });
        }
        break;
      }
      case "cd": {
        if (!args[0]) {
          resolve({ newPath: "~", output: null });
          return;
        }
        const newPath = resolvePath(currentPath, args[0]);
        const node = getNode(newPath);
        if (node?.type === "directory") {
          resolve({ newPath, output: null });
        } else {
          resolve({
            output: (
              <ErrorOutput
                message={`cd: no such file or directory: ${args[0]}`}
              />
            ),
          });
        }
        break;
      }
      case "cat": {
        if (!args[0]) {
          resolve({ output: <p>Usage: cat &lt;file&gt;</p> });
          return;
        }
        const targetPath = resolvePath(currentPath, args[0]);
        const node = getNode(targetPath);
        if (node?.type === "file") {
          resolve({ output: <FileContent file={node} /> });
        } else if (node?.type === "directory") {
          resolve({
            output: <ErrorOutput message={`cat: ${args[0]}: Is a directory`} />,
          });
        } else {
          resolve({
            output: (
              <ErrorOutput
                message={`cat: ${args[0]}: No such file or directory`}
              />
            ),
          });
        }
        break;
      }
      case "snake":
        resolve({ output: <SnakeGame /> });
        break;
      default:
        resolve({ output: <CommandNotFound command={command} /> });
        break;
    }
  });
};
