import axios from "axios";
import { useContext, useEffect, useMemo } from "react";
import { Context } from "../../context/DataContext";
import "./terminal.css";
import { FileItem } from "./types";

const useCommands = (
  pushToHistory: any,
  setHistory: any,
  setOpenTerminal: any,
  commandsHistory: any,
  openModalWithData: (data: any, title: string, edit: boolean) => void,
  closeModal: () => void
) => {
  const apiUrlFiles: string = process.env.REACT_APP_FILES_API_URL || "";
  const apiUrlFile: string = process.env.REACT_APP_FILE_API_URL || "";
  const apiUrlNewFile: string = process.env.REACT_APP_NEW_FILE_API_URL || "";
  const apiUrlDirectory: string = process.env.REACT_APP_CHECKDIR_URL || "";
  const { setDirectory, triggerUpdate } = useContext(Context);
  interface ApiResponse {
    items: FileItem[];
  }

  const notAllowedString: string[] = [
    "..",
    ".",
    "/",
    "//",
    "\\",
    "\\\\",
    "'",
    '"',
  ];

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
        <div className="terminalRow">
          <p className="terminalCommand">cd [directory]</p>
          <p className="terminalCommandText">navigate to directory</p>
        </div>
        <div className="terminalRow">
          <p className="terminalCommand">cd.</p>
          <p className="terminalCommandText">
            navigate to root directory level
          </p>
        </div>
        <div className="terminalRow">
          <p className="terminalCommand">cd..</p>
          <p className="terminalCommandText">navigate up one directory level</p>
        </div>
        <div className="terminalRow">
          <p className="terminalCommand">clear</p>
          <p className="terminalCommandText">clear terminal history</p>
        </div>
        <div className="terminalRow">
          <p className="terminalCommand">close</p>
          <p className="terminalCommandText">close terminal</p>
        </div>
        <div className="terminalRow">
          <p className="terminalCommand">dir</p>
          <p className="terminalCommandText">
            show real file system of this project
          </p>
        </div>
        <div className="terminalRow">
          <p className="terminalCommand">edit [filename]</p>
          <p className="terminalCommandText">open and edit file</p>
        </div>
        <div className="terminalRow">
          <p className="terminalCommand">file [filename]</p>
          <p className="terminalCommandText">open file and view source code</p>
        </div>
        <div className="terminalRow">
          <p className="terminalCommand">github</p>
          <p className="terminalCommandText">show source of this project</p>
        </div>
        <div className="terminalRow">
          <p className="terminalCommand">info</p>
          <p className="terminalCommandText">some info about this terminal</p>
        </div>
        <div className="terminalRow">
          <p className="terminalCommand">ls</p>
          <p className="terminalCommandText">
            show real file system of this project
          </p>
        </div>
        <div className="terminalRow">
          <p className="terminalCommand">site</p>
          <p className="terminalCommandText">show my website</p>
        </div>
        <div className="terminalRow">
          <p className="terminalCommand">skills</p>
          <p className="terminalCommandText">show my dev skills</p>
        </div>
      </>
    );
  };

  const github = async () => {
    pushToHistory(
      <>
        <br />
        <div className="terminalTextRow">
          <span style={{ color: "orange" }}>
            <strong>Backend filesystem node server</strong>
          </span>
          <br />
          <a
            href="https://github.com/davidebalice/node-file-system-api"
            target="_blank"
            title="github db"
            rel="noreferrer"
            className="terminalLink"
          >
            https://github.com/davidebalice/node-file-system-api
          </a>
          <br />
          <br />
          <span style={{ color: "orange" }}>
            <strong>Frontend React</strong>
          </span>
          <br />
          <a
            href="https://github.com/davidebalice/react-terminal-emulator"
            target="_blank"
            title="github db"
            rel="noreferrer"
            className="terminalLink"
          >
            https://github.com/davidebalice/react-terminal-emulator
          </a>
          <br />

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
        <br />
        <div className="terminalTextRow">
          <span style={{ color: "orange" }}>
            <strong>My website</strong>
          </span>
          <br />
          <a
            href="https://www.davidebalice.dev"
            target="_blank"
            title="davidebalice.dev"
            rel="noreferrer"
            className="terminalLink"
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
        <br />
        <span style={{ color: "orange" }}>
          <strong>Terminal info</strong>
        </span>
        <div className="terminalTextRow">
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

  const skills = async () => {
    pushToHistory(
      <>
        <br />
        <span style={{ color: "orange" }}>
          <strong>Skills</strong>
        </span>
        <div className="terminalTextRow">
          Backend:
          <br />
          Php, Laravel, Node, Express, Java, Spring Boot
          <br />
          <br />
          Frontend:
          <br />
          React, Angular, Javascript, Typescript, jQuery
        </div>
      </>
    );
  };

  const close = async () => {
    setHistory([]);
    setOpenTerminal(false);

    pushToHistory(
      <>
        <div className="terminalTextRow">
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
    let directory = localStorage.getItem("directory");
    await axios
      .get<ApiResponse>(apiUrlFiles, {
        params: { dir: directory },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Response:", response.data);
        const fileList = response.data.items;
        const fileListElements = fileList.map((item, index) => (
          <div key={index} className="filesystemRow">
            <p
              className={
                item.type === "directory"
                  ? "filesystemRowDirectory"
                  : "filesystemRowFile"
              }
            >
              {item.type === "directory" ? (
                <strong>/{item.name}</strong>
              ) : (
                <strong>{item.name}</strong>
              )}
            </p>
            {item.type === "directory" ? (
              <p className="filesystemRowDirectory">{`<dir>`}</p>
            ) : (
              <p className="filesystemRowFile">{item.size}kb</p>
            )}
          </div>
        ));

        pushToHistory(
          <>
            <div>
              <span style={{ color: "white" }}>
                <strong>root/{directory}</strong>
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
    const verifyCommand = localStorage.getItem("command");
    if (verifyCommand === "..") {
      back();
    } else if (verifyCommand === ".") {
      root();
    } else {
      if (verifyCommand !== null && !notAllowedString.includes(verifyCommand)) {
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
            pushToHistory(
              <>
                <div>
                  <span style={{ color: "red" }}>
                    <strong>Directory not found</strong>
                  </span>
                </div>
              </>
            );
          });
      }
    }
  };

  const file = async () => {
    const token = getTokenFromLocalStorage();
    triggerUpdate();
    const verifyFile = localStorage.getItem("file");

    if (verifyFile !== null && !notAllowedString.includes(verifyFile)) {
      let directory = localStorage.getItem("directory");

      await axios
        .get(apiUrlFile, {
          params: { dir: directory, filename: verifyFile },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("Response:", response.data);
          console.log("error:", response.data.error);

          openModalWithData(response.data.content, response.data.title, false);
          //closeModal: any
        })
        .catch((error) => {
          pushToHistory(
            <>
              <div>
                <span style={{ color: "red" }}>
                  <strong>file not found</strong>
                </span>
              </div>
            </>
          );
        });
    }
  };

  const edit = async () => {
    const token = getTokenFromLocalStorage();
    triggerUpdate();
    const verifyFile = localStorage.getItem("edit");

    if (verifyFile !== null && !notAllowedString.includes(verifyFile)) {
      let directory = localStorage.getItem("directory");

      await axios
        .get(apiUrlFile, {
          params: { dir: directory, filename: verifyFile },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("Response:", response.data);
          console.log("error:", response.data.error);

          openModalWithData(response.data.content, response.data.title, true);
        })
        .catch((error) => {
          pushToHistory(
            <>
              <div>
                <span style={{ color: "red" }}>
                  <strong>file not found</strong>
                </span>
              </div>
            </>
          );
        });
    }
  };

  const newfile = async () => {
    const token = getTokenFromLocalStorage();
    triggerUpdate();
    const verifyFile = localStorage.getItem("new");

    console.log(verifyFile);

    if (verifyFile !== null && !notAllowedString.includes(verifyFile)) {
      let directory = localStorage.getItem("directory");

      await axios
        .post(
          apiUrlNewFile,
          {
            dir: directory,
            filename: verifyFile,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log("Response:", response.data);
          console.log("error:", response.data.error);
        })
        .catch((error) => {
          pushToHistory(
            <>
              <div>
                <span style={{ color: "red" }}>
                  <strong>file not found</strong>
                </span>
              </div>
            </>
          );
        });
    }
  };

  const back = async () => {
    let directory: string | null = localStorage.getItem("directory");

    if (directory !== null && directory !== "") {
      if (directory.includes("\\")) {
        directory = directory.substring(0, directory.lastIndexOf("\\"));
        localStorage.setItem("directory", directory);
        setDirectory(directory);
      } else {
        localStorage.setItem("directory", "");
        setDirectory("");
      }
    }
  };

  const root = async () => {
    localStorage.setItem("directory", "");
    setDirectory("");
  };

  const commands = useMemo(
    () => ({
      help: commandlist,
      h: commandlist,
      info: info,
      edit: edit,
      file: file,
      github: github,
      close: close,
      site: site,
      skills: skills,
      ls: ls,
      dir: ls,
      new: newfile,
      clear: clear,
      cd: cd,
      "cd.": root,
      "cd..": back,
    }),
    [pushToHistory, commandsHistory]
  );

  return commands;
};

export default useCommands;
