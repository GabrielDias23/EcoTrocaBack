const jwt = require('jsonwebtoken');

function requireAuth (req, res, next) {
    const auth = req.headers.authorization || '';

    const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
    if (!token) {
        return res.status(401).json({error: 'Não autenticado'})
    };
    try {

        const payload = jwt.verify(token, process.env.JWT_SECRET)
        console.log("Payload do token (sub):", payload.sub);

        req.userId = payload.sub;

        next();
    } catch (error) {
        return res.status(401).json({error: 'token invalido'});
    }
};

module.exports = {
    requireAuth
};