require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const con = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

/**
 * Middleware para validar o token JWT
 */
function autenticar(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ mensagem: 'Token não informado' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const usuario = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = usuario;
    next();
  } catch (erro) {
    return res.status(401).json({ mensagem: 'Token inválido' });
  }
}

/**
 * POST /usuarios
 * Cadastra um usuário
 */
app.post('/usuarios', (req, res) => {
  const { nome, email, senha, perfil } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ error: 'Nome, email e senha são obrigatórios' });
  }

  const perfilFinal = perfil || 'usuario';

  con.query(
    'INSERT INTO usuarios (nome, email, senha, perfil) VALUES (?, ?, ?, ?)',
    [nome, email, senha, perfilFinal],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso' });
    }
  );
});

/**
 * POST /login
 * Valida email e senha e retorna um token JWT
 */
app.post('/login', (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ mensagem: 'Email e senha são obrigatórios' });
  }

  con.query(
    'SELECT * FROM usuarios WHERE email = ? AND senha = ?',
    [email, senha],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      if (results.length === 0) {
        return res.status(401).json({ mensagem: 'Usuário ou senha inválidos' });
      }

      const usuario = results[0];

      const token = jwt.sign(
        { id: usuario.id, nome: usuario.nome, perfil: usuario.perfil },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      res.json({ mensagem: 'Login realizado com sucesso', token });
    }
  );
});

/**
 * GET /perfil
 * Retorna os dados do usuário autenticado
 */
app.get('/perfil', autenticar, (req, res) => {
  res.json({ mensagem: 'Acesso autorizado', usuario: req.usuario });
});

/**
 * GET /usuarios
 * Lista todos os usuários (protegido)
 */
app.get('/usuarios', autenticar, (req, res) => {
  con.query('SELECT id, nome, email, perfil FROM usuarios', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

/**
 * PUT /usuarios/:id
 * Atualiza um usuário (protegido)
 */
app.put('/usuarios/:id', autenticar, (req, res) => {
  const { nome, email } = req.body;
  const { id } = req.params;

  con.query(
    'UPDATE usuarios SET nome = ?, email = ? WHERE id = ?',
    [nome, email, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0) return res.status(404).json({ error: 'Usuário não encontrado' });
      res.json({ id: Number(id), nome, email });
    }
  );
});

/**
 * DELETE /usuarios/:id
 * Remove um usuário (protegido)
 */
app.delete('/usuarios/:id', autenticar, (req, res) => {
  const { id } = req.params;

  con.query('DELETE FROM usuarios WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Usuário não encontrado' });
    res.status(200).json({ deleted: true });
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
