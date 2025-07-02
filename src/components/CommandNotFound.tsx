export const CommandNotFound = ({ command }: { command: string }) => (
  <div>
    <p>
      command not found: <span className="text-red">{command}</span>
    </p>
    <p>
      Type '<span className="text-sky">help</span>' to see a list of available
      commands.
    </p>
  </div>
);
