import React, { useState, createContext, useContext } from "react";

interface ActiveGraph {
  name: string;
  id: string;
}

interface ActiveGraphContextProps {
  activeGraph: ActiveGraph | null;
  setActiveGraph: React.Dispatch<React.SetStateAction<ActiveGraph | null>>;
}

const ActiveGraphContext: React.Context<Partial<ActiveGraphContextProps>> =
  createContext({});

interface Props {
  children?: React.ReactNode;
}

const ActiveGraphProvider: React.FC<Props> = ({ children }: Props) => {
  const [activeGraph, setActiveGraph] = useState<ActiveGraph | null>(null);

  return (
    <ActiveGraphContext.Provider value={{ activeGraph, setActiveGraph }}>
      {children}
    </ActiveGraphContext.Provider>
  );
};

const useActiveGraphContext = (): ActiveGraphContextProps =>
  useContext(ActiveGraphContext) as ActiveGraphContextProps;

export { ActiveGraphProvider, useActiveGraphContext };
