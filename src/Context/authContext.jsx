import { createContext, useState, useContext } from "react";
import { loginUsuario } from "../servicios/serviciosLogin";
const AuthContext = createContext();

// Creamos el "Proveedor" (El componente que envuelve a la App)
export function AuthProvider({ children }) {
  // Por ahora, el usuario es null (no logueado). 

  const [user, setUser] = useState(() => {
    const usuarioGuardado = localStorage.getItem("user");
    return usuarioGuardado ? JSON.parse(usuarioGuardado) : null;
  });
  const [token, setToken] = useState(() => {
    const tokenGuardado = localStorage.getItem("token");
    return tokenGuardado ? tokenGuardado : null;
    //El token es un item solamente, no se parsea
  }); 
  
  const login = async (dataUsuario) => {
    const usuario= await loginUsuario(dataUsuario); 
    setUser(usuario.user);
    setToken(usuario.token);    
    localStorage.setItem("user", JSON.stringify(usuario.user));
    localStorage.setItem("token", usuario.token);
    //No se hace el stringify porque JSON.stringify("tu_token_abc") -> ""tu_token_abc"" 
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user"); 
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user,token, login, logout }}>
      {children} 
    </AuthContext.Provider>
  );
}
export const useAuth = () => useContext(AuthContext);
