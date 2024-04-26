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
  openLogin: number;
  setOpenLogin: React.Dispatch<React.SetStateAction<number>>;
};
