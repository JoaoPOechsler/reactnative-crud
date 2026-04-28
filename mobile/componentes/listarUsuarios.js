import { FlatList, View, Text, ActivityIndicator } from 'react-native';
import CardUsuario from './cardUsuario';
import styles from '../estilos/estilos';

export default function ListarUsuarios({ usuarios, onEditar, onExcluir, editandoId, carregando }) {
  if (carregando) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4f46e5" />
        <Text style={styles.loadingText}>Carregando usuários...</Text>
      </View>
    );
  }

  return (
    <>
      <View style={styles.listHeader}>
        <Text style={styles.listTitle}>Usuários cadastrados</Text>
        <Text style={styles.listCount}>{usuarios.length} registro(s)</Text>
      </View>

      <FlatList
        data={usuarios}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <CardUsuario
            usuario={item}
            onEditar={onEditar}
            onExcluir={onExcluir}
            editandoId={editandoId}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={{ fontSize: 40 }}>📭</Text>
            <Text style={styles.emptyText}>Nenhum usuário cadastrado ainda.</Text>
          </View>
        }
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </>
  );
}
