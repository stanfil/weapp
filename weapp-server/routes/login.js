let express = require('express');
let app = express();
let router = express.Router();
let jwt = require('jsonwebtoken');
let axios = require('axios');
let User = require('../models/user');
//import configuration
let appId = require('../config.js').appId;
let appSecret = require('../config.js').appSecret;
let jwtSecret = require('../config.js').jwtSecret;

function generateToken(user) {
    return jwt.sign(user, jwtSecret, {
        expiresIn: 7200
    });
}

router.post('/', (req, res) => {
    const queryString = `appid=${appId}&secret=${appSecret}&js_code=${req.body.code}&grant_type=authorization_code`;
    const wxAPI = `https://api.weixin.qq.com/sns/jscode2session?${queryString}`;
    axios.get(wxAPI)
        .then(response => {
            openId = response.data.openid;
            User.findOne({openId}, (err, user) => {
                if(err) return err;
                if(!user) {
                    let user = new User();
                    user.openId = openId;
                    user.save();
                }
                res.json({
                    token: generateToken({openId: openId})
                })
            });
        })
        .catch(error => {
            console.log(error);
        });
})

module.exports = router;
