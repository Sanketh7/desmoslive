import { useState, createContext, useContext } from "react";
import { ExpressionChange } from "../interfaces/changesList";

interface ChangesContextProps {
  changesList: ExpressionChange[];
  setChangesList: React.Dispatch<React.SetStateAction<ExpressionChange[]>>;
}

const ChangesContext: React.Context<Partial<ChangesContextProps>> =
  createContext({});

interface Props {
  children?: React.ReactNode;
}

const ChangesProvider: React.FC<Props> = ({ children }: Props) => {
  const [changesList, setChangesList] = useState<ExpressionChange[]>([]);

  return (
    <ChangesContext.Provider value={{ changesList, setChangesList }}>
      {children}
    </ChangesContext.Provider>
  );
};

const useChangesContext = (): ChangesContextProps =>
  useContext(ChangesContext) as ChangesContextProps;

export { ChangesProvider, useChangesContext };
