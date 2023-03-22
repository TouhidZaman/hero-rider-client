import { createContext, useMemo, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const AuthContextValues = useMemo(() => ({
    user,
    setUser,
    loading,
    setLoading,
  }));

  return (
    <AuthContext.Provider value={AuthContextValues}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
