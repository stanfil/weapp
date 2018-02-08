let express = require('express');
let app = express();
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let cors = require('cors');
let uri = require('./config.js').uri;
let Course = require('./models/course.js');
let courses = require('./data/courses.js'); //导入数据
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
mongoose.connect(uri);

let db = mongoose.connection;
db.on('error', function (err) {
    console.log('connection failed!', err);
});
db.once('open', function () {
    console.log('success!');
});

app.post('/course/index',(req, res)=>{
    let { keyword, label } = req.body;
    console.log(label);
    Course.find().select('id cover title').exec(function (err, courses) {
        if(err) {
            res.send(err);
            return err;
        }
        let arr = courses.filter((item)=>(item.title.indexOf(keyword))!==-1);
        res.send(arr);
    });
});

app.post('/course/details',(req, res)=>{
    let { id } = req.body;
    Course.findOne({"id": id}).select('id title price intro introvideolink resourcelink content').exec((err, course)=>{
        if(err) {
            res.send(err);
            return err;
        }
        res.send(course);
    })
});


app.listen(3000, function () {
    console.log("Your server is running on port 3000");
});