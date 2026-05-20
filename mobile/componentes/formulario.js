import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import styles from '../estilos/estilos';

export default function Formulario({ onSalvar, onCancelar, usuarioEditando }) {
  const modoEdicao = usuarioEditando !== null;

  const [form, setForm] = useState({ nome: '', email: '', senha: '', perfil: 'usuario' });
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    if (usuarioEditando) {
      setForm({ nome: usuarioEditando.nome, email: usuarioEditando.email, senha: '', perfil: usuarioEditando.perfil || 'usuario' });
    } else {
      setForm({ nome: '', email: '', senha: '', perfil: 'usuario' });
    }
  }, [usuarioEditando]);

  const validar = () => {
    if (!form.nome.trim()) {
      Alert.alert('Atenção', 'Informe o nome do usuário.');
      return false;
    }
    if (!form.email.trim() || !form.email.includes('@')) {
      Alert.alert('Atenção', 'Informe um e-mail válido.');
      return false;
    }
    if (!modoEdicao && !form.senha.trim()) {
      Alert.alert('Atenção', 'Informe a senha.');
      return false;
    }
    return true;
  };

  const handleSalvar = async () => {
    if (!validar()) return;
    setSalvando(true);
    try {
      await onSalvar(form, usuarioEditando?.id);
      setForm({ nome: '', email: '', senha: '', perfil: 'usuario' });
    } finally {
      setSalvando(false);
    }
  };

  return (
    <View style={styles.form}>
      <Text style={styles.formTitle}>
        {modoEdicao ? `Editando: ${usuarioEditando.nome}` : '+ Novo usuário'}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Nome completo"
        value={form.nome}
        onChangeText={(text) => setForm({ ...form, nome: text })}
        autoCapitalize="words"
      />

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={form.email}
        onChangeText={(text) => setForm({ ...form, email: text })}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {!modoEdicao && (
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={form.senha}
          onChangeText={(text) => setForm({ ...form, senha: text })}
          secureTextEntry
        />
      )}

      <View style={styles.perfilSelector}>
        <Text style={styles.perfilSelectorLabel}>Perfil:</Text>
        <TouchableOpacity
          style={[styles.perfilOpcao, form.perfil === 'usuario' && styles.perfilOpcaoAtivo]}
          onPress={() => setForm({ ...form, perfil: 'usuario' })}
        >
          <Text style={[styles.perfilOpcaoText, form.perfil === 'usuario' && styles.perfilOpcaoTextAtivo]}>
            Usuário
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.perfilOpcao, form.perfil === 'admin' && styles.perfilOpcaoAtivo]}
          onPress={() => setForm({ ...form, perfil: 'admin' })}
        >
          <Text style={[styles.perfilOpcaoText, form.perfil === 'admin' && styles.perfilOpcaoTextAtivo]}>
            Admin
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.btnPrimary} onPress={handleSalvar} disabled={salvando}>
          <Text style={styles.btnText}>
            {salvando ? 'Salvando...' : modoEdicao ? 'Atualizar' : 'Cadastrar'}
          </Text>
        </TouchableOpacity>

        {modoEdicao && (
          <TouchableOpacity style={styles.btnSecondary} onPress={onCancelar}>
            <Text style={styles.btnTextSecondary}>Cancelar</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
