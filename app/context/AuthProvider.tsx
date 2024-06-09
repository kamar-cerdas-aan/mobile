import React, { createContext, ReactNode, useContext, useState } from "react";

const AuthContext = createContext<any>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<boolean>(false);
  const [token, setToken] = useState<string>("dummy");
  const [device_id, setDeviceID] = useState<string>("dummy");

  return (
    <AuthContext.Provider value={{ authState, setAuthState, token, setToken, device_id, setDeviceID }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthContext, AuthProvider, useAuth };
