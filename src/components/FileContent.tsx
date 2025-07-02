import type { File } from "../types";

export const FileContent = ({ file }: { file: File }) => {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts = file.content.split(linkRegex);
  return (
    <p className="whitespace-pre-wrap">
      {parts.map((part, i) => {
        if (i % 3 === 1) {
          // This is the link text
          return (
            <a
              key={i}
              href={parts[i + 1]}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#94e2d5] underline hover:text-[#89dceb]"
            >
              {part}
            </a>
          );
        }
        if (i % 3 === 2) {
          // This is the URL, we already used it
          return null;
        }
        return <span key={i}>{part}</span>; // Regular text
      })}
    </p>
  );
};
