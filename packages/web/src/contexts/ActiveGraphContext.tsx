import React, { useState, createContext, useContext } from "react";

interface ActiveGraphContextProps {
  activeGraph: string;
  setActiveGraph: React.Dispatch<React.SetStateAction<string>>;
}

const ActiveGraphContext: React.Context<Partial<ActiveGraphContextProps>> =
  createContext({});

interface Props {
  children?: React.ReactNode;
}

const ActiveGraphProvider: React.FC<Props> = ({ children }: Props) => {
  const [activeGraph, setActiveGraph] = useState<string>("");

  return (
    <ActiveGraphContext.Provider value={{ activeGraph, setActiveGraph }}>
      {children}
    </ActiveGraphContext.Provider>
  );
};

const useActiveGraphContext = (): ActiveGraphContextProps =>
  useContext(ActiveGraphContext) as ActiveGraphContextProps;

export { ActiveGraphProvider, useActiveGraphContext };
