const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const secretKey = process.env.TOKEN_SECRET;

const tokenGuard = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).send({ message: "Unauthorized" });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            if (err.expiredAt) {
                res.status(403).send({ message: "Your token has expired, please login again." });
            } else {
                res.status(403).send({ message: `Forbidden: ${err}` });
            }
        } else {
            console.log("DECODED", decoded);
            req.user = decoded;
            next();
        }
    });
};

module.exports = { tokenGuard };