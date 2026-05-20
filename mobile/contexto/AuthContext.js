import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [usuario, setUsuario] = useState(null);

  const salvarLogin = (novoToken, dadosUsuario) => {
    setToken(novoToken);
    setUsuario(dadosUsuario);
  };

  const logout = () => {
    setToken(null);
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ token, usuario, salvarLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
