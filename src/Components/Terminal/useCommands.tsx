import { useMemo } from "react";
import "./terminal.css";

const useCommands = (pushToHistory: any, setHistory: any) => {
  const commands = useMemo(
    () => ({
      help: async () => {
        await pushToHistory(
          <>
            <div className="terminal__row">
              <p className="terminal__command">about</p>
              <p className="terminal__command__text">some info about me</p>
            </div>
            <div className="terminal__row">
              <p className="terminal__command">clear</p>
              <p className="terminal__command__text">clear terminal history</p>
            </div>
            <div className="terminal__row">
              <p className="terminal__command">close</p>
              <p className="terminal__command__text">close terminal</p>
            </div>
            <div className="terminal__row">
              <p className="terminal__command">email</p>
              <p className="terminal__command__text">send an email to me</p>
            </div>
            <div className="terminal__row">
              <p className="terminal__command">github</p>
              <p className="terminal__command__text">
                show source of this project
              </p>
            </div>
            <div className="terminal__row">
              <p className="terminal__command">site</p>
              <p className="terminal__command__text">show my website</p>
            </div>
            <div className="terminal__row">
              <p className="terminal__command">skills</p>
              <p className="terminal__command__text">show my dev skills</p>
            </div>
            <div className="terminal__row">
              <p className="terminal__command">ls</p>
              <p className="terminal__command__text">
                show real list of file of this project
              </p>
            </div>
          </>
        );
      },
      ls: async () => {
        await pushToHistory(
          <>
            <div>
              <strong>Alert</strong>
              <span style={{ color: "orange", marginLeft: 10 }}>
                <strong>Shown in the browser</strong>
              </span>
            </div>
          </>
        );
      },
      clear: async () => {
        setHistory([]);
      },
    }),
    [pushToHistory]
  );

  return commands;
};

export default useCommands;
