import axios from "axios";
import { useContext, useEffect, useMemo } from "react";
import { Context } from "../../context/DataContext";
import "./terminal.css";
import { FileItem } from "./types";

const useCommands = (
  pushToHistory: any,
  setHistory: any,
  setOpenTerminal: any,
  commandsHistory: any
) => {
  const apiUrlFile: string = process.env.REACT_APP_FILE_API_URL || "";
  const apiUrlDirectory: string = process.env.REACT_APP_CHECKDIR_URL || "";
  const { setDirectory, command, triggerUpdate } = useContext(Context);
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

  const getTokenFromLocalStorage = () => {
    return localStorage.getItem("token");
  };

  const commandlist = async () => {
    pushToHistory(
      <>
        <span style={{ color: "orange" }}>
          <strong>Command list</strong>
        </span>
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
          <p className="terminal__command">info</p>
          <p className="terminal__command__text">
            some info about this terminal
          </p>
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
  };

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

  const info = async () => {
    pushToHistory(
      <>
        <span style={{ color: "orange" }}>
          <strong>Terminal info</strong>
        </span>
        <div className="terminal__text__row">
          This terminal is just an experiment, developed in React and TypeScript
          for study purpose.
          <br />
          Possible uses are interaction with files system, file creation,
          setting permissions, viewing information, generating passwords and
          more.
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
          <span style={{ color: "#ccc" }}>
            Press <b>F2</b> to restart terminal
          </span>
        </div>
      </>
    );
  };

  const ls = async () => {
    const token = getTokenFromLocalStorage();
    await axios
      .get<ApiResponse>(apiUrlFile, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Response:", response.data);
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

        pushToHistory(
          <>
            <div>
              <span style={{ color: "orange" }}>
                <strong>Project filesystem</strong>
              </span>
              {fileListElements}
            </div>
          </>
        );
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const cd = async () => {
    const token = getTokenFromLocalStorage();

    triggerUpdate();

    //const currentCommand = command.toLowerCase().trim();
    let currentCommand: any = "";
    let directory = localStorage.getItem("directory");
    if (directory === "") {
      currentCommand = localStorage.getItem("command");
    } else {
      currentCommand = directory + `\\` + localStorage.getItem("command");
    }
    await axios
      .get(apiUrlDirectory, {
        params: { dir: currentCommand },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Response:", response.data);
        console.log(response.data.exists);
        if (response.data.exists === true) {
          console.log("entrato");
          console.log(response.data.exists);
          console.log(directory);

          setDirectory(currentCommand);
          localStorage.setItem("directory", currentCommand);
        } else {
          pushToHistory(
            <>
              <div>
                <span style={{ color: "red" }}>
                  <strong>Directory not found</strong>
                </span>
              </div>
            </>
          );
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  /*
  
  const cd = async () => {
    const token = getTokenFromLocalStorage();
    const directory = localStorage.getItem("directory");
    await axios
      .get<ApiResponse>(apiUrl, {
        params: { directory: directory },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Response:", response.data);
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

        pushToHistory(
          <>
            <div>
              <span style={{ color: "orange" }}>
                <strong>Project filesystem</strong>
              </span>
              {fileListElements}
            </div>
          </>
        );
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  */

  const commands = useMemo(
    () => ({
      help: commandlist,
      h: commandlist,
      info: info,
      github: github,
      close: close,
      site: site,
      ls: ls,
      dir: ls,
      clear: clear,
      cd: cd,
    }),
    [pushToHistory, commandsHistory]
  );

  return commands;
};

export default useCommands;
