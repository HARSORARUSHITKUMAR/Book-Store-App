const jwt = require('jsonwebtoken');

// get secret key of jwt
const JWT_SECRET = process.env.JWT_SECRET_KEY;

// verify the admin token
const verifyAminToken = (req, res, next) => {

    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {

        return res.status(401).json({ message: 'Access Denied. No token provided' });
    }
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            console.log("JWT Error:", err.message);
            return res.status(403).json({ message: 'Invalid credientials' });
        }
        req.user = user;
        next();
    })
}

module.exports = verifyAminToken;