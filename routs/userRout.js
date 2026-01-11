const express = require('express'); 
const userControllers = require('../controllers/userCont');
const router = express.Router();
const verfyJWT = require('../middleWare/verfyJWT');


router.use(verfyJWT);
router.route('/').get(userControllers.getAllUsers);
module.exports = router;