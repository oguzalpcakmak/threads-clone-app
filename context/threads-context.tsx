import {
  ReactNode,
  createContext,
  PropsWithChildren,
  useState,
  useEffect,
} from "react";
import { Thread } from "../types/threads";
import { generateThreads } from "../utils/generate-dummy-data";

export const ThreadsContext = createContext<Thread[]>([]);

export const ThreadsProvider = ({ children }: PropsWithChildren): ReactNode => {
  const [threads, setThreads] = useState<Thread[]>([]);
  useEffect(() => {
    setThreads(generateThreads(50));
  }, []);

  return (
    <ThreadsContext.Provider value={threads}>
      {children}
    </ThreadsContext.Provider>
  );
};
