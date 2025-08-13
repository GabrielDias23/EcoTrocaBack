const express = require('express');
const cors = require('cors');
const app = express();
const usuarioRoutes = require('./routes/usuarioRoutes');

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('EcoTrocaBack');
    console.log("vida boa");
});

app.use('/api/usuario', usuarioRoutes);

module.exports = app;