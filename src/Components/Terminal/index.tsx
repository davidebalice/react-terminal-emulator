import {
  ForwardedRef,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Context } from "../../context/DataContext";
import { Login } from "./Login";
import TextAnimation from "./TextAnimation";
import { logoText } from "./logo";
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
    const { directory, setCommand, setFile, setEdit } = useContext(Context);
    const [animationFinished, setAnimationFinished] = useState<boolean>(false);

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
      async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
          const inputCommand = input.toLowerCase().trim();
          const commandParts = inputCommand.split(" ");

          const commandName = commandParts[0];
          const commandArgs = commandParts.slice(1);
          if (commandArgs[0] !== "" && commandArgs[0] !== undefined) {
            commandArgs[0] = commandArgs[0].replace("/", "").replace("\\", "");
          }

          const commandToExecute = commands?.[commandName];

          if (commandName === "cd" && commandArgs[0].length >= 2) {
            setCommand(commandArgs[0]);
            sessionStorage.setItem("command", commandArgs[0]);
          }

          if (commandName === "file" && commandArgs[0].length >= 2) {
            setFile(commandArgs[0]);
            sessionStorage.setItem("file", commandArgs[0]);
          }

          if (commandName === "edit" && commandArgs[0].length >= 2) {
            setEdit(commandArgs[0]);
            sessionStorage.setItem("edit", commandArgs[0]);
          }

          if (commandName === "new" && commandArgs[0].length >= 2) {
            sessionStorage.setItem("new", commandArgs[0]);
          }

          if (commandName === "delete" && commandArgs[0].length >= 2) {
            sessionStorage.setItem("delete", commandArgs[0]);
          }

          if (
            commandName === "rename" &&
            commandArgs[0].length >= 2 &&
            commandArgs[1].length >= 2
          ) {
            sessionStorage.setItem("rename", commandArgs[0]);
            sessionStorage.setItem("newname", commandArgs[1]);
          }

          if (commandToExecute) {
            commandToExecute();

            setInputValue("");
            const newCommands = [...commandsHistory, inputCommand];
            if (newCommands) {
              setCommandsHistory(newCommands);
            }
          }
        }
      },
      [input, commands, setCommand, commandsHistory, setCommandsHistory]
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

    const handleAnimationFinish = () => {
      setAnimationFinished(true);
    };

    useEffect(() => {
      if (animationFinished) {
        setOpenLogin(1);
      }
    }, [animationFinished]);

    return (
      <>
        <div className="scanlines"></div>
        <div className="refresh-line"></div>
        <div
          className="terminal"
          ref={ref}
          onClick={focusInput}
          onMouseEnter={focusInput}
        >
          <TextAnimation
            texts={logoText}
            onFinishAnimation={handleAnimationFinish}
          />
          {history.map((line, index) => (
            <div
              className="terminalLine"
              key={`terminal-line-${index}-${line}`}
            >
              {line}
            </div>
          ))}
          {openTerminal && (
            <>
              <div className="terminalPrompt">
                <div className="terminalPromptLabel">{username + `>`}</div>
                <div className="terminalPromptRoot">root/</div>
                {directory !== "" && directory != null && (
                  <div className="terminalPromptDirectory">
                    {directory + `/`}
                  </div>
                )}

                <div className="terminalPromptInput">
                  <input
                    type="text"
                    value={input}
                    onKeyDown={handleInputKeyDown}
                    onChange={handleInputChange}
                    // @ts-ignore
                    ref={inputRef}
                  />
                </div>
              </div>
            </>
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
      </>
    );
  }
);
