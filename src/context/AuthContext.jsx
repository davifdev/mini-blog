/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { useContext, createContext } from "react";

const AuthContext = createContext();

export const AuthContextProvider = ({ value, children }) => {
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthValue = () => {
  return useContext(AuthContext);
};
