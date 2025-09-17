const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { getUsuarioByEmail, createUsuario } = require('../models/usuarioModel');
const { createUsuarioHandler} = require('../controller/usuarioController')

function signToken(usuario) {
    return jwt.sign(
        {
            sub: usuario.id,
            role: usuario.tipoUsuario,
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
    );
};

async function register(req, res) {
    const { nome, email, senha, cidade, estado, dataNasc} = req.body;

    if (!nome || !dataNasc || !email || !senha || !cidade || !estado) {
        return res.status(400).json({ error: 'Campos obrigatórios faltando.' });
    };

    const exists = await getUsuarioByEmail(email);
    if (exists) {
        return res.status(409).json({ error: 'Email já cadastrado.' });
    };

    const novoUsuario = await createUsuario(nome, email, senha, cidade, estado, dataNasc);
    res.status(201).json({ message: "Usuário cadastrado com sucesso", novoUsuario });
};

async function login (req, res) {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
  }

  const usuario = await getUsuarioByEmail(email);

  if (!usuario || !usuario.senhaHash) {
    return res.status(401).json({ error: 'Credenciais inválidas.' });
  }

  const ok = await bcrypt.compare(senha, usuario.senhaHash);
  if (!ok) {
    return res.status(401).json({ error: 'Credenciais inválidas.' });
  }

  const token = signToken(usuario);

  return res.json({
    token,
    usuario: {
      id: usuario.id,
      regra: usuario.tipoUsuario,
      email: usuario.email,
    },
  });
}

module.exports = {
    register,
    login
};