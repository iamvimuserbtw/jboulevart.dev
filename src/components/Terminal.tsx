import { useCallback, useEffect, useRef, useState } from "react";
import type { CommandHistoryEntry } from "../types";
import { getAutocompleteSuggestions } from "../utils/getAutocompleteSuggestion";
import { getNode } from "../utils/getNode";
import { resolvePath } from "../utils/resolvePath";
import { commandProcessor } from "../utils/commandProcessor";

const welcomeMessages = [
  {
    command: "booting...",
    output: <p>Welcome to my interactive portfolio...</p>,
  },
  { command: " ", output: <p>This is a simulated shell environment.</p> },
  {
    command: " ",
    output: (
      <p>
        Try '<span className="text-[#89dceb]">ls</span>' to see available files,
        and '<span className="text-[#89dceb]">help</span>' for all commands.
      </p>
    ),
  },
];

export const Terminal = () => {
  const [history, setHistory] = useState<CommandHistoryEntry[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isProcessing, setIsProcessing] = useState(true);
  const [currentPath, setCurrentPath] = useState("~");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const PROMPT = (
    <>
      <span className="text-[#a6e3a1]">{currentPath}</span>{" "}
      <span className="text-[#cba6f7]">❯</span>
    </>
  );

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < welcomeMessages.length) {
        setHistory((prev) => [
          ...prev,
          { ...welcomeMessages[i], id: Date.now() + i },
        ]);
        i++;
      } else {
        clearInterval(interval);
        setIsProcessing(false);
        inputRef.current?.focus();
      }
    }, 300);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, isProcessing, suggestions]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (suggestions.length > 0) {
      setSuggestions([]);
    }
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const currentSuggestions = getAutocompleteSuggestions(
        inputValue,
        currentPath,
      );

      if (currentSuggestions.length === 1) {
        const completion = currentSuggestions[0];
        const parts = inputValue.trimEnd().split(" ");
        const isCompletingCommand =
          parts.length === 1 && !inputValue.includes(" ");

        if (isCompletingCommand) {
          setInputValue(completion + " ");
        } else {
          const lastPart = parts[parts.length - 1];
          const pathBase = lastPart.substring(0, lastPart.lastIndexOf("/") + 1);
          parts[parts.length - 1] = pathBase + completion;

          let completedValue = parts.join(" ");
          const node = getNode(
            resolvePath(currentPath, parts.slice(1).join(" ")),
          );

          if (node?.type === "directory") {
            completedValue += "/";
          } else {
            completedValue += " ";
          }
          setInputValue(completedValue);
        }
        setSuggestions([]);
      } else if (currentSuggestions.length > 1) {
        setSuggestions(currentSuggestions);
      }
      return;
    }

    if (suggestions.length > 0) {
      setSuggestions([]);
    }

    if (e.key === "Enter" && !isProcessing) {
      const commandToProcess = inputValue;
      setInputValue("");

      if (commandToProcess.trim() === "") {
        setHistory((prev) => [
          ...prev,
          { id: Date.now(), command: "", output: null },
        ]);
        return;
      }

      setIsProcessing(true);

      const commandId = Date.now();
      const newHistoryEntry: CommandHistoryEntry = {
        id: commandId,
        command: commandToProcess,
        output: "",
      };

      setHistory((prev) => [...prev, newHistoryEntry]);

      const result = await commandProcessor(commandToProcess, currentPath);

      if (result.output === "clear") {
        setHistory([]);
      } else {
        setHistory((prev) =>
          prev.map((entry) =>
            entry.id === commandId
              ? { ...entry, output: result.output }
              : entry,
          ),
        );
      }

      if (result.newPath) {
        setCurrentPath(result.newPath);
      }

      setIsProcessing(false);
      // Use a timeout to ensure state update has rendered before focusing
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  };

  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div
      className="w-full h-full p-4 md:p-6 text-[#cdd6f4] text-sm md:text-base"
      onClick={focusInput}
    >
      {history.map((entry) => (
        <div key={entry.id} className="mb-2 animate-fade-in opacity-0">
          {entry.command && (
            <div className="flex items-center gap-2">
              {PROMPT}
              <span>{entry.command}</span>
            </div>
          )}
          <div className="mt-1">{entry.output}</div>
        </div>
      ))}

      {!isProcessing && (
        <>
          <div className="flex items-center gap-2">
            {PROMPT}
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="bg-transparent border-none outline-none text-[#cdd6f4] w-full"
              autoFocus
              disabled={isProcessing}
              spellCheck="false"
              autoComplete="off"
            />
          </div>
          {suggestions.length > 0 && (
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-[#89b4fa]">
              {suggestions.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
          )}
        </>
      )}
      <div ref={bottomRef} />
    </div>
  );
};
