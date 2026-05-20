import { View, Text, TextInput, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import { useState } from 'react';
import { useAuth } from '../contexto/AuthContext';
import { api } from '../services/api';
import styles from '../estilos/estilos';

function decodeJWT(token) {
  const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
  return JSON.parse(atob(base64));
}

export default function TelaLogin() {
  const { salvarLogin } = useAuth();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !senha.trim()) {
      Alert.alert('Atenção', 'Informe e-mail e senha.');
      return;
    }
    setCarregando(true);
    try {
      const dados = await api.login(email.trim(), senha);
      const payload = decodeJWT(dados.token);
      salvarLogin(dados.token, { id: payload.id, nome: payload.nome, perfil: payload.perfil });
    } catch (e) {
      Alert.alert('Erro', e.message);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <SafeAreaView style={styles.loginContainer}>
      <View style={styles.loginBox}>
        <Text style={styles.loginIcon}>👥</Text>
        <Text style={styles.loginTitle}>Gerenciar Usuários</Text>
        <Text style={styles.loginSubtitle}>Faça login para continuar</Text>

        <TextInput
          style={styles.input}
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />

        <TouchableOpacity style={styles.btnPrimary} onPress={handleLogin} disabled={carregando}>
          <Text style={styles.btnText}>{carregando ? 'Entrando...' : 'Entrar'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
