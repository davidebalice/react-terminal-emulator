import { ReactNode } from "react";

export type TerminalHistoryItem = ReactNode | string;
export type TerminalHistory = TerminalHistoryItem[];
export type TerminalPushToHistoryWithDelayProps = {
  content: TerminalHistoryItem;
  delay?: number;
};

export type TerminalCommands = {
  [command: string]: () => void;
};

export type TerminalProps = {
  history: TerminalHistory;
  promptLabel?: TerminalHistoryItem;
  commands: TerminalCommands;
  openTerminal: boolean;
  setOpenTerminal: React.Dispatch<React.SetStateAction<boolean>>;
  commandsHistory: string[];
  setCommandsHistory: React.Dispatch<React.SetStateAction<string[]>>;
  openLogin: number;
  setOpenLogin: React.Dispatch<React.SetStateAction<number>>;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
};

export type LoginProps = {
  openLogin: number;
  setOpenLogin: React.Dispatch<React.SetStateAction<number>>;
  openTerminal: boolean;
  setOpenTerminal: React.Dispatch<React.SetStateAction<boolean>>;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
};

export type FileItem = {
  name: string;
  size: number;
  type: "file" | "directory";
};
