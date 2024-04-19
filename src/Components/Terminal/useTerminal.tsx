import { useCallback, useEffect, useState } from "react";
import {
  TerminalHistory,
  TerminalHistoryItem,
  TerminalPushToHistoryWithDelayProps,
} from "./types";

export const useTerminal = () => {
  const [terminalRef, setDomNode] = useState<HTMLDivElement>();
  const setTerminalRef = useCallback(
    (node: HTMLDivElement) => setDomNode(node),
    []
  );
  const [history, setHistory] = useState<TerminalHistory>([]);

  useEffect(() => {
    const windowResizeEvent = () => {
      terminalRef?.scrollTo({
        top: terminalRef?.scrollHeight ?? 99999,
        behavior: "smooth",
      });
    };
    window.addEventListener("resize", windowResizeEvent);

    return () => {
      window.removeEventListener("resize", windowResizeEvent);
    };
  }, [terminalRef]);

  useEffect(() => {
    terminalRef?.scrollTo({
      top: terminalRef?.scrollHeight ?? 99999,
      behavior: "smooth",
    });
  }, [history, terminalRef]);

  const pushToHistory = useCallback((item: TerminalHistoryItem) => {
    setHistory((old) => [...old, item]);
  }, []);

  const pushToHistoryWithDelay = useCallback(
    ({ delay = 0, content }: TerminalPushToHistoryWithDelayProps) =>
      new Promise((resolve) => {
        setTimeout(() => {
          pushToHistory(content);
          return resolve(content);
        }, delay);
      }),
    [pushToHistory]
  );

  const resetTerminal = useCallback(() => {
    setHistory([]);
  }, []);

  return {
    history,
    pushToHistory,
    pushToHistoryWithDelay,
    terminalRef,
    setTerminalRef,
    resetTerminal,
    setHistory,
  };
};
