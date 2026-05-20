import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  header: {
    backgroundColor: '#66a9e0',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  headerSubtitle: {
    color: '#ffffff',
    fontSize: 13,
    marginTop: 4,
    // fontWeight: 'bold',
  },
  form: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  formTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e1b4b',
    marginBottom: 12,
  },
  input: {
    height: 46,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
    backgroundColor: '#f9fafb',
    fontSize: 15,
    color: '#111827',
  },
  inputFocused: {
    borderColor: '#66a9e0',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 8,
  },
  btnPrimary: {
    flex: 1,
    backgroundColor: '#66a9e0',
    borderRadius: 8,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnSecondary: {
    flex: 1,
    backgroundColor: '#e5e7eb',
    borderRadius: 8,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnDanger: {
    backgroundColor: '#ef4444',
    borderRadius: 8,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
  },
  btnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  btnTextSecondary: {
    color: '#374151',
    fontWeight: '700',
    fontSize: 14,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 6,
  },
  listTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#374151',
  },
  listCount: {
    fontSize: 13,
    color: '#6b7280',
  },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 10,
    borderRadius: 10,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  cardEditing: {
    borderWidth: 2,
    borderColor: '#66a9e0',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#66a9e0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  cardInfo: {
    flex: 1,
  },
  cardId: {
    fontSize: 11,
    color: '#9ca3af',
    marginBottom: 2,
  },
  cardNome: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },
  cardEmail: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 2,
  },
  cardActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionBtn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editBtn: {
    backgroundColor: '#ede9fe',
  },
  deleteBtn: {
    backgroundColor: '#fee2e2',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 15,
    color: '#9ca3af',
    marginTop: 8,
  },
  loadingContainer: {
    padding: 30,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#6b7280',
  },
  errorContainer: {
    margin: 16,
    padding: 14,
    backgroundColor: '#fef2f2',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#ef4444',
  },
  errorText: {
    color: '#b91c1c',
    fontSize: 13,
  },
  gridContainer: {
    paddingHorizontal: 8,
    paddingBottom: 20,
  },
  gridItem: {
    flex: 1,
    margin: 8,
  },
  listItem: {
    flex: 1,
  },

  // Login
  loginContainer: {
    flex: 1,
    backgroundColor: '#f0f2f5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  loginBox: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 28,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  loginIcon: {
    fontSize: 48,
    textAlign: 'center',
    marginBottom: 8,
  },
  loginTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1e1b4b',
    textAlign: 'center',
    marginBottom: 4,
  },
  loginSubtitle: {
    fontSize: 13,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 20,
  },

  // Header com botão de logout
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  btnLogout: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  btnLogoutText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 13,
  },

  // Badges de perfil
  badgeAdmin: {
    color: '#7c3aed',
    fontWeight: '700',
    fontSize: 11,
  },
  badgeUsuario: {
    color: '#0369a1',
    fontWeight: '700',
    fontSize: 11,
  },

  // Card de perfil (TelaUsuario)
  perfilCard: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  perfilLabel: {
    fontSize: 11,
    color: '#9ca3af',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  perfilNome: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  perfilInfo: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 2,
  },

  // Seletor de perfil no formulário
  perfilSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  perfilSelectorLabel: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '600',
  },
  perfilOpcao: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  perfilOpcaoAtivo: {
    backgroundColor: '#66a9e0',
    borderColor: '#66a9e0',
  },
  perfilOpcaoText: {
    fontSize: 13,
    color: '#374151',
    fontWeight: '600',
  },
  perfilOpcaoTextAtivo: {
    color: '#fff',
  },
});

export default styles;
