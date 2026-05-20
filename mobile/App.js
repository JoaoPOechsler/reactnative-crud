import { AuthProvider, useAuth } from './contexto/AuthContext';
import TelaLogin from './telas/TelaLogin';
import TelaAdmin from './telas/TelaAdmin';
import TelaUsuario from './telas/TelaUsuario';

function Roteador() {
  const { token, usuario } = useAuth();

  if (!token) return <TelaLogin />;
  if (usuario?.perfil === 'admin') return <TelaAdmin />;
  return <TelaUsuario />;
}

export default function App() {
  return (
    <AuthProvider>
      <Roteador />
    </AuthProvider>
  );
}
