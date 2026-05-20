import { SafeAreaView, View, Text, Alert, TouchableOpacity } from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexto/AuthContext';
import { api } from '../services/api';
import styles from '../estilos/estilos';
import Formulario from '../componentes/formulario';
import ListarUsuarios from '../componentes/listarUsuarios';

export default function TelaAdmin() {
  const { token, usuario, logout } = useAuth();
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  const carregarUsuarios = useCallback(async () => {
    try {
      setErro(null);
      const dados = await api.listarUsuarios(token);
      setUsuarios(dados);
    } catch (e) {
      setErro('Não foi possível carregar os usuários.');
    } finally {
      setCarregando(false);
    }
  }, [token]);

  useEffect(() => {
    carregarUsuarios();
  }, [carregarUsuarios]);

  const handleSalvar = async (form, idEditando) => {
    try {
      if (idEditando) {
        await api.atualizarUsuario(idEditando, form, token);
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

  const handleExcluir = async (id) => {
    try {
      await api.excluirUsuario(id, token);
      setUsuarios((prev) => prev.filter((u) => String(u.id) !== String(id)));
      if (String(usuarioEditando?.id) === String(id)) setUsuarioEditando(null);
    } catch (e) {
      Alert.alert('Erro ao excluir', e.message);
      carregarUsuarios();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.headerTitle}>👥 Gerenciar Usuários</Text>
            <Text style={styles.headerSubtitle}>
              Olá, {usuario?.nome} · <Text style={styles.badgeAdmin}>ADMIN</Text>
            </Text>
          </View>
          <TouchableOpacity onPress={logout} style={styles.btnLogout}>
            <Text style={styles.btnLogoutText}>Sair</Text>
          </TouchableOpacity>
        </View>
      </View>

      {erro && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{erro}</Text>
        </View>
      )}

      <Formulario
        onSalvar={handleSalvar}
        onCancelar={() => setUsuarioEditando(null)}
        usuarioEditando={usuarioEditando}
      />

      <ListarUsuarios
        usuarios={usuarios}
        onEditar={setUsuarioEditando}
        onExcluir={handleExcluir}
        editandoId={usuarioEditando?.id}
        carregando={carregando}
      />
    </SafeAreaView>
  );
}
