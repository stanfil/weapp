let express = require('express');
let router = express.Router();
let Course = require('../models/course.js');
let User = require('../models/user.js');
let jwt = require('jsonwebtoken');
let jwtSecret = require('../config.js').jwtSecret;
let hotCourses = require('../data/hotCourses.js');

function requireAuth(req, res, next) {
    let token = req.headers.authorization;
    if(token) {
        jwt.verify(token, jwtSecret, (err, decoded) => {
            if(err) {
                if(err.name === 'TokenExpiredError') {
                    return res.status(401).json({error: '认证码失效，请重新登录！'});
                } else {
                    return res.status(401).json({error: '认证失败！'});
                }
            } else {
                if(decoded.openId) {
                    req.openId = decoded.openId;
                    next();
                } else {
                    return res.status(401).json({error: '认证失败！'});
                }
            }
        })
    } else {
        return res.status(403).json({
            error: '请提供认证码！'
        })
    }
}

router.post('/index', requireAuth, (req, res)=>{
    let openId = req.openId;
    let { keyword, label } = req.body;
    console.log(label);
    let filter = [];
    User.findOne({openId}, (err, user) =>{
        if(err) return console.log(err);
        if(label === 'Own') {
            filter = user.ownCourses;
        } else if (label === 'Like') {
            filter = user.likeCourses;
        } else if (label === 'Hot') {
            filter = hotCourses;
        }
        console.log(filter);
        Course.find().select('id cover title').exec(function (err, courses) {
            if(err) {
                res.send(err);
                return err;
            }
            let arr = courses.filter((item)=>(item.title.indexOf(keyword))!==-1);
            if(label !== 'All') {
                // console.log("1111111");
                arr = arr.filter((item)=>(filter.indexOf(item.id))!==-1);
            }
            res.send(arr);
        });
    });

});


router.post('/details',(req, res)=>{
    let { id } = req.body;
    Course.findOne({"id": id}).select('id title price intro introvideolink resourcelink content').exec((err, course)=>{
        if(err) {
            res.send(err);
            return err;
        }
        res.send(course);
    })
});

module.exports = router;
