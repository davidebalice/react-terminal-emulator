import { useEffect } from "react";
import { Terminal } from "./Components/Terminal";
import { logo } from "./Components/Terminal/logo";
import useCommands from "./Components/Terminal/useCommands";
import { useTerminal } from "./Components/Terminal/useTerminal";

function App() {
  const {
    history,
    pushToHistory,
    setHistory,
    setTerminalRef,
    resetTerminal,
    openTerminal,
    setOpenTerminal,
  } = useTerminal();

  const commands = useCommands(pushToHistory, setHistory, setOpenTerminal);

  const description = (
    <>
      <div>
        <br />
        DB Terminal emulator 0.8 developed in React, Typescript and Css
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
          setOpenTerminal(true);
        }, delayBetweenItems);
      }
    };

    pushToHistoryWithDelay(itemsToSend, 0);
  }, []);

  return (
    <>
      <Terminal
        history={history}
        openTerminal={openTerminal}
        setOpenTerminal={setOpenTerminal}
        ref={setTerminalRef}
        promptLabel={<>{`User>`}</>}
        commands={commands}
      />
    </>
  );
}

export default App;
