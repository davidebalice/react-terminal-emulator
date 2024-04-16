import { useMemo } from "react";


const useCommands = (pushToHistory: any) => {
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
      ls: async () => {
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

  return commands;
};

export default useCommands;
