import { useContext, useEffect, useState } from "react";
import { Terminal } from "./Components/Terminal";
import { logo } from "./Components/Terminal/logo";
import useCommands from "./Components/Terminal/useCommands";
import { useTerminal } from "./Components/Terminal/useTerminal";
import { Context } from "./context/DataContext";

function App() {
  const [commandsHistory, setCommandsHistory] = useState<string[]>([]);
  const { directory, setDirectory, command, setCommand } = useContext(Context);
  const {
    history,
    pushToHistory,
    setHistory,
    setTerminalRef,
    resetTerminal,
    openTerminal,
    setOpenTerminal,
    openLogin,
    setOpenLogin,
    username,
    setUsername,
  } = useTerminal();

  const commands = useCommands(
    pushToHistory,
    setHistory,
    setOpenTerminal,
    commandsHistory
  );

  const description = (
    <>
      <div>
        <br />
        DB Terminal emulator 0.8 developed in React, TypeScript and Css
      </div>
    </>
  );

  const help = (
    <>
      <div>
        Type <b style={{ color: "#fff" }}>help</b> or <b>h</b> to view list of
        commands
        <br />
        <br />
      </div>
    </>
  );

  useEffect(() => {
    resetTerminal();

    const itemsToSend = [
      "Starting server",
      "Please wait",
      logo,
      description,
      help,
    ];

    const delayBetweenItems = 1000;

    const pushToHistoryWithDelay = (items: any, index: number) => {
      if (index < items.length) {
        setTimeout(() => {
          pushToHistory(items[index]);
          pushToHistoryWithDelay(items, index + 1);
        }, delayBetweenItems);
      } else {
        setTimeout(() => {
          //setOpenTerminal(true);
          setOpenLogin(1);
        }, delayBetweenItems);
      }
    };

    pushToHistoryWithDelay(itemsToSend, 0);
  }, []);

  return (
    <>
      <h1 style={{ color: "white" }}>
        dir: {directory}
        <br />
        command: {command}
        <br />
      </h1>
      <Terminal
        history={history}
        openTerminal={openTerminal}
        setOpenTerminal={setOpenTerminal}
        openLogin={openLogin}
        setOpenLogin={setOpenLogin}
        username={username}
        setUsername={setUsername}
        ref={setTerminalRef}
        commands={commands}
        commandsHistory={commandsHistory}
        setCommandsHistory={setCommandsHistory}
      />
    </>
  );
}

export default App;
