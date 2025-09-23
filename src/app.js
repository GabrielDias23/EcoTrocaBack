const express = require('express');
const cors = require('cors');
const app = express();
const usuarioRoutes = require('./routes/usuarioRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const itemRoutes = require('./routes/itemRoutes');
const propostaRoutes = require('./routes/propostaRoutes');
const chatRouets = require('./routes/chatRoutes');
const mensagemRoutes = require('./routes/mensagemRoutes');
const authRoutes = require('./routes/authRoutes');

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
    res.send('EcoTrocaBack');
});

app.use('/api/usuario', usuarioRoutes);
app.use('/api/categoria', categoriaRoutes);
app.use('/api/item', itemRoutes);
app.use('/api/proposta', propostaRoutes);
app.use('/api/chat', chatRouets);
app.use('/api/mensagem', mensagemRoutes);
app.use('/api/auth', authRoutes);

module.exports = app;