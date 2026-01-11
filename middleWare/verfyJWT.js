const jwt = require('jsonwebtoken');
const verfyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) 
        return res.status(401).json({ message: 'Unauthorized' });
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.JWT_SECRET,
        (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Forbidden' });
            console.log('Decoded JWT:', decoded); // Log the decoded token
            req.user = decoded.userInfo?.Id; // Use optional chaining
            next();
        }
    );
};

module.exports = verfyJWT;