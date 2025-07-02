export const isValidCommand = (command: string): boolean => {
  const lowerCaseCommand = command.toLowerCase();
  switch (lowerCaseCommand) {
    case "help":
    case "clear":
    case "pwd":
    case "ls":
    case "cd":
    case "cat":
    
      return true;
    default:
      return false;
  }
};
