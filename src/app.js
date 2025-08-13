const express = require('express');
const cors = require('cors');
const app = express();
const usuarioRoutes = require('./routes/usuarioRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('EcoTrocaBack');
});

app.use('/api/usuario', usuarioRoutes);
app.use('/api/categoria', categoriaRoutes);

module.exports = app;