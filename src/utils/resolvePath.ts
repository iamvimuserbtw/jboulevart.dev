export const resolvePath = (
  currentPath: string,
  targetPath: string,
): string => {
  if (targetPath.startsWith("/"))
    return targetPath === "/" ? "~" : `~${targetPath}`;
  if (targetPath === "~") return "~";

  const parts =
    currentPath === "~" ? [] : currentPath.replace(/^~\//, "").split("/");

  targetPath.split("/").forEach((part) => {
    if (part === "." || part === "") return;
    if (part === "..") {
      if (parts.length > 0) parts.pop();
    } else {
      parts.push(part);
    }
  });

  return parts.length === 0 ? "~" : `~/${parts.join("/")}`;
};
