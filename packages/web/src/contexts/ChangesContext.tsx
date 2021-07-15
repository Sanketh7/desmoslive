import { useState, createContext, useContext } from "react";
import { Change } from "../interfaces/changesList";

interface ChangesContextProps {
  changesList: Change[];
  setChangesList: React.Dispatch<React.SetStateAction<Change[]>>;
}

const ChangesContext: React.Context<Partial<ChangesContextProps>> =
  createContext({});

interface Props {
  children?: React.ReactNode;
}

const ChangesProvider: React.FC<Props> = ({ children }: Props) => {
  const [changesList, setChangesList] = useState<Change[]>([]);

  return (
    <ChangesContext.Provider value={{ changesList, setChangesList }}>
      {children}
    </ChangesContext.Provider>
  );
};

const useChangesContext = (): ChangesContextProps =>
  useContext(ChangesContext) as ChangesContextProps;

export { ChangesProvider, useChangesContext };
