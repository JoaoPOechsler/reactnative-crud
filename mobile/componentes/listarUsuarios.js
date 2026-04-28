import { FlatList, View, Text, ActivityIndicator, useWindowDimensions, Platform } from 'react-native';
import CardUsuario from './cardUsuario';
import styles from '../estilos/estilos';

export default function ListarUsuarios({ usuarios, onEditar, onExcluir, editandoId, carregando }) {
  const { width } = useWindowDimensions();

  const isDesktop = Platform.OS === 'web' && width > 768;
  const numColumns = isDesktop ? 2 : 1;

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
        key={numColumns} // força re-render ao mudar colunas
        data={usuarios}
        keyExtractor={(item) => String(item.id)}
        numColumns={numColumns}
        renderItem={({ item }) => (
          <View style={isDesktop ? styles.gridItem : styles.listItem}>
            <CardUsuario
              usuario={item}
              onEditar={onEditar}
              onExcluir={onExcluir}
              editandoId={editandoId}
            />
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={{ fontSize: 40 }}>📭</Text>
            <Text style={styles.emptyText}>Nenhum usuário cadastrado ainda.</Text>
          </View>
        }
        contentContainerStyle={isDesktop ? styles.gridContainer : { paddingBottom: 20 }}
      />
    </>
  );
}