import React, { useEffect, useMemo } from "react";
import { Terminal } from "./Components/Terminal";
import { useTerminal } from "./Components/Terminal/useTerminal";

function App() {
  const { history, pushToHistory, setTerminalRef, resetTerminal } =
    useTerminal();

  useEffect(() => {
    resetTerminal();

    pushToHistory(
      <>
      <div style={{ fontSize: 10,lineHeight:13+"px" }}>
{"            "}+%%%%%%%%%=-  :%%%%%%%%-.<br/>
{"     "}.*.   *%%%%%%%%%%%%+ .%%%%%%%%%%%%-   .*.<br/>
{"  "}.***.     *%%%:   .:+%%%#           %%%   .***.<br/>
{""}.***.       ++==       :%%%= :%%%%%%%%***      .***.<br/>
{""}.***.       -=++.      :%%%+ :%%%%%%%%%%-      .***.<br/>
{"  "}.***.     +%%%.    .=#%%#.          %%%    .***.<br/>
{"     "}.*.   *%%%%%%%%%%%%*. -%%%%%%%%%%%=   .*.<br/>
{"           "}*%%%%%%%##*=. :+%%%%%%%%+=:<br/>
      </div>
      <div><br/>DB Terminal emulator</div>
      <div style={{ fontSize: 20 }}>Lorem Ipsum</div>
      <br />


        <div>Insert command....</div>
      </>
    );
  }, []);

  const commands = useMemo(
    () => ({
      start: async () => {
        await pushToHistory(
          <>
            <div>
              <strong>Starting</strong> the server...{" "}
              <span style={{ color: "green" }}>Done</span>
            </div>
          </>
        );
      },
      alert: async () => {
        alert("Hello!");
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
    }),
    [pushToHistory]
  );

  return (
    <div className="App">
      <Terminal
        history={history}
        ref={setTerminalRef}
        promptLabel={<>User:</>}
        commands={commands}
      />
    </div>
  );
}

export default App;
