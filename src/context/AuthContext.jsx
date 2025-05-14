import { createContext, useContext, useState } from "react";
import Auth from "my-auth-google";
import Email from "gmail-package";
import { ss_empleados } from "../Backend/initialize_sheets";
const apiKey = import.meta.env.VITE_API_KEY;
const clientId = import.meta.env.VITE_CLIENT_ID;

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const authGoogle = async () => {
    const auth = await Auth(apiKey, clientId);
    return auth;
  };
  const [auth, setAuth] = useState(null);
  const [user, setUser] = useState(null);
  const getAuth = async () => {
    const getAuth = await authGoogle();
    setAuth(getAuth);
  };
  const getUser = async () => {
    try {
      const emailAddress = await Email.getEmail();
      try {
        const empleado = await ss_empleados.getDataById(
          "email_empresa",
          emailAddress
        );
        setUser(empleado);
      } catch (e) {
        console.log(e);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <AuthContext.Provider value={{ auth, getAuth, getUser, user }}>
      {children}
    </AuthContext.Provider>
  );
};
