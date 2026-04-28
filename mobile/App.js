import { SafeAreaView, View, Text, Alert } from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import styles from './estilos/estilos';
import Formulario from './componentes/formulario';
import ListarUsuarios from './componentes/listarUsuarios';
import { api } from './services/api';

export default function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  const carregarUsuarios = useCallback(async () => {
    try {
      setErro(null);
      const dados = await api.listarUsuarios();
      setUsuarios(dados);
    } catch (e) {
      setErro('Não foi possível conectar ao servidor. Verifique se o backend está rodando.');
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    carregarUsuarios();
  }, [carregarUsuarios]);

  const handleSalvar = async (form, idEditando) => {
    try {
      if (idEditando) {
        await api.atualizarUsuario(idEditando, form);
        setUsuarioEditando(null);
        Alert.alert('Sucesso', 'Usuário atualizado!');
      } else {
        await api.criarUsuario(form);
        Alert.alert('Sucesso', 'Usuário cadastrado!');
      }
      carregarUsuarios();
    } catch (e) {
      Alert.alert('Erro', e.message);
    }
  };

  const handleEditar = (usuario) => {
    setUsuarioEditando(usuario);
  };

  const handleCancelarEdicao = () => {
    setUsuarioEditando(null);
  };

  const handleExcluir = async (id) => {
    try {
      await api.excluirUsuario(id);
      setUsuarios((prev) => prev.filter((u) => String(u.id) !== String(id)));
      if (String(usuarioEditando?.id) === String(id)) setUsuarioEditando(null);
    } catch (e) {
      Alert.alert('Erro ao excluir', e.message);
      carregarUsuarios();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}><Text style={{fontSize: 30}}>👥</Text> Gerenciar Usuários</Text>
        <Text style={styles.headerSubtitle}>Cadastro, edição e exclusão via API REST</Text>
      </View>

      {/* Mensagem de erro de conexão */}
      {erro && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{erro}</Text>
        </View>
      )}

      {/* Formulário de cadastro / edição */}
      <Formulario
        onSalvar={handleSalvar}
        onCancelar={handleCancelarEdicao}
        usuarioEditando={usuarioEditando}
      />

      {/* Lista de usuários */}
      <ListarUsuarios
        usuarios={usuarios}
        onEditar={handleEditar}
        onExcluir={handleExcluir}
        editandoId={usuarioEditando?.id}
        carregando={carregando}
      />
    </SafeAreaView>
  );
}