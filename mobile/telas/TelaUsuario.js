import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexto/AuthContext';
import { api } from '../services/api';
import styles from '../estilos/estilos';
import ListarUsuarios from '../componentes/listarUsuarios';

export default function TelaUsuario() {
  const { token, usuario, logout } = useAuth();
  const [usuarios, setUsuarios] = useState([]);
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.headerTitle}>👥 Usuários</Text>
            <Text style={styles.headerSubtitle}>
              Olá, {usuario?.nome} · <Text style={styles.badgeUsuario}>USUÁRIO</Text>
            </Text>
          </View>
          <TouchableOpacity onPress={logout} style={styles.btnLogout}>
            <Text style={styles.btnLogoutText}>Sair</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.perfilCard}>
        <Text style={styles.perfilLabel}>Meu perfil</Text>
        <Text style={styles.perfilNome}>{usuario?.nome}</Text>
        <Text style={styles.perfilInfo}>ID: {usuario?.id} · Perfil: {usuario?.perfil}</Text>
      </View>

      {erro && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{erro}</Text>
        </View>
      )}

      <ListarUsuarios
        usuarios={usuarios}
        carregando={carregando}
        somenteLeitura
      />
    </SafeAreaView>
  );
}
