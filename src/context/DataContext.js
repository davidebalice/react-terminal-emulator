import { createContext, useCallback, useState } from "react";

export const Context = createContext();

export function DataProvider({ children }) {
  const [command, setCommand] = useState("");
  const [file, setFile] = useState("");
  const [edit, setEdit] = useState("");
  const [directory, setDirectory] = useState("");
  const [forceUpdate, setForceUpdate] = useState(false);

  const triggerUpdate = useCallback(() => {
    setForceUpdate((prevState) => !prevState);
  }, [command]);

  return (
    <Context.Provider
      value={{
        command,
        setCommand,
        file,
        setFile,
        edit,
        setEdit,
        directory,
        setDirectory,
        triggerUpdate,
      }}
    >
      {children}
    </Context.Provider>
  );
}
