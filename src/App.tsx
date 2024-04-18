import { useEffect } from "react";
import { Terminal } from "./Components/Terminal";
import useCommands from "./Components/Terminal/useCommands";
import { useTerminal } from "./Components/Terminal/useTerminal";

function App() {
  const { history, pushToHistory, setHistory, setTerminalRef, resetTerminal } = useTerminal();
  const commands = useCommands(pushToHistory,setHistory);

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
      <div><br/>DB Terminal emulator 0.8 developed in React, Typescript and Css</div>

        <div>
          Type <b style={{color:"#fff"}}>help</b> to view list of commands<br /><br />
        </div>
      </>
    );
  }, []);
  
  return (
    <>
      <Terminal
        history={history}
        ref={setTerminalRef}
        promptLabel={<>{`User>`}</>}
        commands={commands}
      />
    </>
  );
}

export default App;
