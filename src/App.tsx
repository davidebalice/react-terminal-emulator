import { useState } from "react";
import { useLocation } from "react-router-dom";
import Modal from "./Components/Modal";
import { Terminal } from "./Components/Terminal";
import useCommands from "./Components/Terminal/useCommands";
import { useTerminal } from "./Components/Terminal/useTerminal";

function App() {
  const [commandsHistory, setCommandsHistory] = useState<string[]>([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isEditModal, setEditModal] = useState(false);
  const [modalData, setModalData] = useState<string>("");
  const [modalTitle, setModalTitle] = useState<string>("");

  const {
    history,
    pushToHistory,
    setHistory,
    setTerminalRef,
    openTerminal,
    setOpenTerminal,
    openLogin,
    setOpenLogin,
    username,
    setUsername,
  } = useTerminal();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const showHeader = searchParams.get("header") !== "no";

  const openModalWithData = (data: any, title: string, edit: boolean) => {
    setIsOpenModal(true);
    setEditModal(edit);
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
      {showHeader && (
        <div className="terminalHeader">
          <div className="terminalHeaderTitle">Db Terminal</div>
        </div>
      )}
      <Modal
        isOpen={isOpenModal}
        onClose={closeModal}
        title={modalTitle}
        edit={isEditModal}
      >
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
