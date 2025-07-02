export const CommandNotFound = ({ command }: { command: string }) => (
  <div>
    <p>
      command not found: <span className="text-[#f38ba8]">{command}</span>
    </p>
    <p>
      Type '<span className="text-[#89dceb]">help</span>' to see a list of
      available commands.
    </p>
  </div>
);
