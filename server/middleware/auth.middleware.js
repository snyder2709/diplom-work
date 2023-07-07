const jwt = require('jsonwebtoken');
const config = require('config');
const secret = config.get('secretKey')

function authenticateToken(req, res, next) {
    const token = req.headers['authorization'].split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Не авторизован' });
    }
    try {
        const decoded = jwt.verify(token, secret);
        req.userId = decoded;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Не авторизован' });
    }
}
module.exports = authenticateToken
