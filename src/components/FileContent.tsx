import type { File } from "../types";
import Markdown from "react-markdown";

export const FileContent = ({ file }: { file: File }) => {
  const { content } = file;
  return (
    <div className="md-content">
      <Markdown>{content}</Markdown>
    </div>
  );
};
