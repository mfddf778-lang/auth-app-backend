const corsoptions = {
    origin: function (origin, callback) {
        const allowOrgin = require('./allowOrgin');
        if (allowOrgin.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
};
module.exports = corsoptions;