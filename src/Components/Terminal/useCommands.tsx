import axios from "axios";
import { useEffect, useMemo } from "react";
import "./terminal.css";

const useCommands = (
  pushToHistory: any,
  setHistory: any,
  setOpenTerminal: any
) => {
  const apiUrl: string = process.env.REACT_APP_FILE_API_URL || "";
  interface FileItem {
    name: string;
    size: number;
    type: "file" | "directory";
  }

  interface ApiResponse {
    items: FileItem[];
  }

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "F2") {
        setHistory([]);
        window.location.reload();
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [setOpenTerminal]);

  const commandlist = (
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
        <p className="terminal__command__text">show source of this project</p>
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

  const github = async () => {
    pushToHistory(
      <>
        <div className="terminal__row">
          <a
            href="https://github.com/davidebalice"
            target="_blank"
            title="github db"
            rel="noreferrer"
            className="terminal__link"
          >
            https://github.com/davidebalice
          </a>
          <br />
          <br />
        </div>
      </>
    );
  };

  const clear = async () => {
    setHistory([]);
  };

  const site = async () => {
    pushToHistory(
      <>
        <div className="terminal__text__row">
          <a
            href="https://www.davidebalice.dev"
            target="_blank"
            title="davidebalice.dev"
            rel="noreferrer"
            className="terminal__link"
          >
            https://www.davidebalice.dev
          </a>
        </div>
      </>
    );
  };

  const close = async () => {
    setHistory([]);
    setOpenTerminal(false);

    pushToHistory(
      <>
        <div className="terminal__text__row">
          <span style={{ color: "#ff0000" }}>Terminal closed</span>
          <br />
          <span style={{ color: "#ccc" }}>Press <b>F2</b> to restart terminal</span>
        </div>
      </>
    );
  };

  const ls = async () => {
    const response = await axios.get<ApiResponse>(apiUrl);
    const fileList = response.data.items;
    const fileListElements = fileList.map((item, index) => (
      <div key={index} className="filesystem__row">
        <p
          className={
            item.type === "directory"
              ? "filesystem__row__directory"
              : "filesystem__row__file"
          }
        >
          {item.type === "directory" ? (
            <strong>/{item.name}</strong>
          ) : (
            <strong>{item.name}</strong>
          )}
        </p>
        {item.type === "directory" ? (
          <p className="filesystem__row__directory">{`<dir>`}</p>
        ) : (
          <p className="filesystem__row__file">{item.size}kb</p>
        )}
      </div>
    ));

    await pushToHistory(
      <>
        <div>
          <span style={{ color: "orange" }}>
            <strong>Project filesystem</strong>
          </span>
          {fileListElements}
        </div>
      </>
    );
  };

  const commands = useMemo(
    () => ({
      help: async () => {
        await pushToHistory(<>{commandlist}</>);
      },
      h: async () => {
        await pushToHistory(<>{commandlist}</>);
      },
      github: github,
      close: close,
      site: site,
      ls: ls,
      dir: ls,
      clear: clear,
    }),
    [pushToHistory]
  );

  return commands;
};

export default useCommands;
