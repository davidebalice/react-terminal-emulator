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