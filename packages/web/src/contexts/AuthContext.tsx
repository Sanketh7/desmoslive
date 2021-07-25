import React, { useState, createContext, useContext } from "react";

interface AuthContextProps {
  authToken: string;
  setAuthToken: React.Dispatch<React.SetStateAction<string>>;
}

const AuthContext: React.Context<Partial<AuthContextProps>> = createContext({});

interface Props {
  children?: React.ReactNode;
}

const AuthProvider: React.FC<Props> = ({ children }: Props) => {
  const [authToken, setAuthToken] = useState<string>("");

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = (): AuthContextProps =>
  useContext(AuthContext) as AuthContextProps;

export { AuthProvider, useAuthContext };
