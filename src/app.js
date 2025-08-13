const express = require('express');
const cors = require('cors');
const app = express();
const usuarioRoutes = require('./routes/usuarioRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const itemRoutes = require('./routes/itemRoutes');

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('EcoTrocaBack');
});

app.use('/api/usuario', usuarioRoutes);
app.use('/api/categoria', categoriaRoutes);
app.use('/api/item', itemRoutes);

module.exports = app;