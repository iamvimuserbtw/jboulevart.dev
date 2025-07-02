import type { Directory } from "../types";

export const DirectoryListing = ({ node }: { node: Directory }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-1">
    {Object.entries(node.children).map(([name, child]) => (
      <span
        key={name}
        className={child.type === "directory" ? "text-[#89b4fa]" : ""}
      >
        {name}
        {child.type === "directory" ? "/" : ""}
      </span>
    ))}
  </div>
);
