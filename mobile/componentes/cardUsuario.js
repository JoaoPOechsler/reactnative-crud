import { View, Text, TouchableOpacity, Alert, Platform } from 'react-native';
import styles from '../estilos/estilos';

export default function CardUsuario({ usuario, onEditar, onExcluir, editandoId, somenteLeitura }) {
  const isEditando = editandoId === usuario.id;
  const inicial = usuario.nome ? usuario.nome.charAt(0).toUpperCase() : '?';

  const confirmarExclusao = () => {
    if (Platform.OS === 'web') {
      if (window.confirm(`Deseja excluir "${usuario.nome}"?`)) {
        onExcluir(usuario.id);
      }
    } else {
      Alert.alert(
        'Excluir usuário',
        `Deseja excluir "${usuario.nome}"?`,
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Excluir', style: 'destructive', onPress: () => onExcluir(usuario.id) },
        ]
      );
    }
  };

  return (
    <View style={[styles.card, isEditando && styles.cardEditing]}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{inicial}</Text>
      </View>

      <View style={styles.cardInfo}>
        <Text style={styles.cardId}>ID: {usuario.id}</Text>
        <Text style={styles.cardNome}>{usuario.nome}</Text>
        <Text style={styles.cardEmail}>{usuario.email}</Text>
        {usuario.perfil && (
          <Text style={usuario.perfil === 'admin' ? styles.badgeAdmin : styles.badgeUsuario}>
            {usuario.perfil.toUpperCase()}
          </Text>
        )}
      </View>

      {!somenteLeitura && (
        <View style={styles.cardActions}>
          <TouchableOpacity style={[styles.actionBtn, styles.editBtn]} onPress={() => onEditar(usuario)}>
            <Text style={{ fontSize: 16 }}>✏️</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionBtn, styles.deleteBtn]} onPress={confirmarExclusao}>
            <Text style={{ fontSize: 16 }}>🗑️</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
