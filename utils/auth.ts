import React from 'react';

interface AuthContextType {
  signIn: (data: any) => Promise<void>;
  signOut: () => void;
  signUp: (data: any) => Promise<void>;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export { AuthContext, AuthContextType };