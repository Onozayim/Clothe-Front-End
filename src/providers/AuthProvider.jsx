import { createContext, useEffect, useMemo, useState } from "react";
import { jwtDecode } from "jwt-decode";
import api from "../configs/axiosConfig";

const AuthContext = createContext();
const _token = localStorage.getItem("jwt-token");

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(_token);
  const [email, setEmail] = useState("");

  console.log("hehihei");

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      console.log("use effect");

      if (decoded.exp * 1000 < new Date().getTime()) {
        localStorage.removeItem("jwt-token");
        delete api.defaults.headers.common["Authorization"];
        setToken(null);
        setEmail(null);
      } else {
        setEmail(decoded.email);
      }
    }
  }, [token]);

  const authValue = useMemo(
    () => ({
      token,
      setToken,
      email,
      setEmail,
    }),
    [token, email]
  );

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
