const BASE_URL = 'http://localhost:3000';

export const api = {
  login: async (email, senha) => {
    const res = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha }),
    });
    if (!res.ok) throw new Error('Usuário ou senha inválidos');
    return res.json();
  },

  listarUsuarios: async (token) => {
    const res = await fetch(`${BASE_URL}/usuarios`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Erro ao listar usuários');
    return res.json();
  },

  criarUsuario: async (usuario) => {
    const res = await fetch(`${BASE_URL}/usuarios`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(usuario),
    });
    if (!res.ok) throw new Error('Erro ao criar usuário');
    return res.json();
  },

  atualizarUsuario: async (id, usuario, token) => {
    const res = await fetch(`${BASE_URL}/usuarios/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(usuario),
    });
    if (!res.ok) throw new Error('Erro ao atualizar usuário');
    return res.json();
  },

  excluirUsuario: async (id, token) => {
    const res = await fetch(`${BASE_URL}/usuarios/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Erro ao excluir usuário');
    return true;
  },
};
