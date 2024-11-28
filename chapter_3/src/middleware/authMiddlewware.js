import jwt from 'jsonwebtoken'


function authMiddleware (req, res, next) {
    const token = req.headers['authorization']

    if (!token) { return res.status(401).json ( {message: "no token provided"})}

}