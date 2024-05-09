import { useContext, useState } from "react";
import Modal from "./Components/Modal";
import { Terminal } from "./Components/Terminal";
import useCommands from "./Components/Terminal/useCommands";
import { useTerminal } from "./Components/Terminal/useTerminal";
import { Context } from "./context/DataContext";

function App() {
  const [commandsHistory, setCommandsHistory] = useState<string[]>([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalData, setModalData] = useState<string>("");
  const [modalTitle, setModalTitle] = useState<string>("");
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

  const openModalWithData = (data: any, title: string) => {
    setIsOpenModal(true);
    setModalData(data);
    setModalTitle(title);
  };

  const closeModal = () => {
    setIsOpenModal(false);
    setModalData("");
  };

  const commands = useCommands(
    pushToHistory,
    setHistory,
    setOpenTerminal,
    commandsHistory,
    openModalWithData,
    closeModal
  );

  return (
    <>
      <Modal isOpen={isOpenModal} onClose={closeModal} title={modalTitle}>
        <pre>{modalData}</pre>
      </Modal>
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
