const User = require('../models/User');
const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const registerUser = async (req, res) => {
    // Registration logic here
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).send('All fields are required');
    }
    const foundUser = await User.findOne({ email });
    if (foundUser) {
        return res.status(409).send('User already exists');
    }
    const hashedPassword = await bycrypt.hash(password, 10);

    const newUser = await new User({ username, email, password: hashedPassword });
    const accessToken = jwt.sign(
        {
            UserInfo: {
                Id: newUser._id
            }
        },
        process.env.JWT_SECRET,
        { expiresIn: "15m" }
    );
    newUser.refreshToken = jwt.sign(
        { Id: newUser._id },
        process.env.JWT_SECRET_REFRESH,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    await newUser.save();
    res.cookie('jwt', newUser.refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
    res.json({ accessToken , email: newUser.email, username: newUser.username });
    

}; 
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send('All fields are required');
    }   
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
        return res.status(401).send('user not found');
    }
    const match = await bycrypt.compare(password, foundUser.password);
    if (!match) {
        return res.status(401).send('Invalid credentials');
    }
    const accessToken = jwt.sign(
        {
            UserInfo: {
                Id: foundUser._id
            }
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    foundUser.refreshToken = jwt.sign(
        { Id: foundUser._id },
        process.env.JWT_SECRET_REFRESH,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    res.cookie('jwt', foundUser.refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

    res.json({ accessToken , email: foundUser.email, username: foundUser.username });
    
}
const logoutUser = async (req, res) => {
    const cookies = req.cookies;
    console.log('Logout request cookies:', cookies);
    const refreshToken = cookies?.jwt;
    if (!refreshToken) return res.sendStatus(204);

    // Verify and log the refresh token (non-blocking)
    jwt.verify(refreshToken, process.env.JWT_SECRET_REFRESH, (err, decoded) => {
        if (err) {
            console.log('Refresh token verification failed:', err.message);
        } else {
            console.log('Decoded refresh token:', decoded);
        }
    });

    // Remove refresh token from user in DB if present
    try {
        const foundUser = await User.findOne({ refreshToken });
        if (foundUser) {
            foundUser.refreshToken = '';
            await foundUser.save();
            console.log(`Cleared refreshToken for user ${foundUser._id}`);
        }
    } catch (err) {
        console.error('Error clearing refresh token from DB:', err);
    }

    res.clearCookie('jwt', { httpOnly: true, secure: true, sameSite: 'None' });
    return res.sendStatus(204);
};
module.exports={ registerUser, loginUser, logoutUser };