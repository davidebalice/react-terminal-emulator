import {
  ForwardedRef,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Login } from "./Login";
import "./terminal.css";
import { TerminalProps } from "./types";

export const Terminal = forwardRef(
  (props: TerminalProps, ref: ForwardedRef<HTMLDivElement>) => {
    const { username, setUsername } = props;
    const { openTerminal, setOpenTerminal } = props;
    const { commandsHistory, setCommandsHistory } = props;
    const { openLogin, setOpenLogin } = props;
    const { history = [], commands = {} } = props;
    const inputRef = useRef<HTMLInputElement>();
    const [input, setInputValue] = useState<string>("");
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    useEffect(() => {
      inputRef.current?.focus();
    });

    const focusInput = useCallback(() => {
      inputRef.current?.focus();
    }, []);

    const handleInputChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
      },
      []
    );

    const handleInputKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
          const inputCommand = input.toLowerCase().trim();
          const commandParts = inputCommand.split(" ");

          const commandName = commandParts[0];
          const commandArgs = commandParts.slice(1);
          const commandToExecute = commands?.[commandName];
          if (
            (commandName === "cd" || commandName === "page") &&
            commandArgs[0].length >= 2
          ) {
            localStorage.setItem("command", commandArgs[0]);
          }

          if (commandToExecute) {
            commandToExecute();

            setInputValue("");
            const newCommands = [...commandsHistory, inputCommand];
            console.log(newCommands);
            if (newCommands) {
              setCommandsHistory(newCommands);
            }
          }
        }
      },
      [commands, input, commandsHistory, setCommandsHistory, setInputValue]
    );

    useEffect(() => {
      const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "ArrowUp") {
          setCurrentIndex((prevIndex) => {
            const newCurrentIndex = Math.min(
              prevIndex + 1,
              commandsHistory.length - 1
            );

            const lastCommand = commandsHistory[newCurrentIndex];
            setInputValue(lastCommand || "");
            return newCurrentIndex;
          });
        } else if (event.key === "ArrowDown") {
          setCurrentIndex((prevIndex) => {
            const newCurrentIndex = Math.max(prevIndex - 1, 0);
            const lastCommand = commandsHistory[newCurrentIndex];
            setInputValue(lastCommand || "");
            return newCurrentIndex;
          });
        }
      };

      window.addEventListener("keyup", handleKeyUp as any);
      return () => window.removeEventListener("keyup", handleKeyUp as any);
    }, [commandsHistory]);

    return (
      <div className="terminal" ref={ref} onClick={focusInput}>
        {history.map((line, index) => (
          <div
            className="terminal__line"
            key={`terminal-line-${index}-${line}`}
          >
            {line}
          </div>
        ))}
        {openTerminal && (
          <div className="terminal__prompt">
            <div className="terminal__prompt__label">{username + `>`}</div>
            <div className="terminal__prompt__input">
              <input
                type="text"
                value={input}
                onKeyDown={handleInputKeyDown}
                onChange={handleInputChange}
                // @ts-ignore
                ref={inputRef}
              />
              <div style={{ height: "50px" }}></div>
            </div>
          </div>
        )}
        {(openLogin === 1 || openLogin === 2) && (
          <Login
            openTerminal={openTerminal}
            setOpenTerminal={setOpenTerminal}
            openLogin={openLogin}
            setOpenLogin={setOpenLogin}
            username={username}
            setUsername={setUsername}
          />
        )}
      </div>
    );
  }
);
