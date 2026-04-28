const BASE_URL = 'http://localhost:3000';

export const api = {
  // GET /usuarios
  listarUsuarios: async () => {
    const res = await fetch(`${BASE_URL}/usuarios`);
    if (!res.ok) throw new Error('Erro ao listar usuários');
    return res.json();
  },

  // POST /usuarios
  criarUsuario: async (usuario) => {
    const res = await fetch(`${BASE_URL}/usuarios`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(usuario),
    });
    if (!res.ok) throw new Error('Erro ao criar usuário');
    return res.json();
  },

  // PUT /usuarios/:id
  atualizarUsuario: async (id, usuario) => {
    const res = await fetch(`${BASE_URL}/usuarios/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(usuario),
    });
    if (!res.ok) throw new Error('Erro ao atualizar usuário');
    return res.json();
  },

  // DELETE /usuarios/:id
  excluirUsuario: async (id) => {
    const res = await fetch(`${BASE_URL}/usuarios/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Erro ao excluir usuário');
    return true;
  },
};
