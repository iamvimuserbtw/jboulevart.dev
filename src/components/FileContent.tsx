import remarkGfm from "remark-gfm";
import type { File } from "../types";
import Markdown from "react-markdown";

export const FileContent = ({ file }: { file: File }) => {
  const { content } = file;
  return (
    <div className="md-content">
      <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
    </div>
  );
};
