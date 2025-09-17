const jwt = require('jsonwebtoken');

async function requireAuth (req, res, next) {
    const auth = req.headers.authorization || '';

    const token = auth.startWith('Bearer ') ? auth.slice(7) : null;
    if (!token) {
        return res.status(401).json({error: 'Não autenticado'})
    };
};

module.exports = {
    requireAuth
};