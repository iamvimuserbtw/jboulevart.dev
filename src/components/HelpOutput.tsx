export const HelpOutput = () => (
  <div className="mt-1">
    <ul className="list-inside list-disc mt-1 space-y-1">
      <li>
        <span className="text-[#89dceb] w-24 inline-block">ls [path]</span> List
        files and directories.
      </li>
      <li>
        <span className="text-[#89dceb] w-24 inline-block">cd &lt;dir&gt;</span>{" "}
        Change directory.
      </li>
      <li>
        <span className="text-[#89dceb] w-24 inline-block">
          cat &lt;file&gt;
        </span>{" "}
        Display file content.
      </li>
      <li>
        <span className="text-[#89dceb] w-24 inline-block">pwd</span> Print
        working directory.
      </li>
      <li>
        <span className="text-[#89dceb] w-24 inline-block">help</span> You are
        here.
      </li>
      <li>
        <span className="text-[#89dceb] w-24 inline-block">clear</span> Clears
        the terminal.
      </li>
    </ul>
  </div>
);
