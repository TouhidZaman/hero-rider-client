import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useMemo, useState } from "react";
import auth from "../utils/firebase.init";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    });
  }, []);

  const logOut = () => {
    setUser(null);
    setIsLoading(false);
  };

  const AuthContextValues = useMemo(() => ({
    user,
    setUser,
    isLoading,
    setIsLoading,
    logOut,
  }));

  return (
    <AuthContext.Provider value={AuthContextValues}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
