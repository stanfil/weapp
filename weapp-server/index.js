let express = require('express');
let app = express();
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let cors = require('cors');
let uri = require('./config.js').uri;
let Course = require('./models/course.js');
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

let course = new Course({
    id: "15",
    cover: "http://o86bpj665.bkt.clouddn.com/posters/chrome-devtools.png",
    title: "Chrome 开发者工具",
    price: 88,
    intro: "",
    introvideolink: "",
    resourselink: "",
    content: ""
});
course.save();

app.post('/course/index',(req, res)=>{
    // let data = req.body;
    // console.log(data);
    Course.find().select('id cover title').exec(function (err, courses) {
        if(err) return  err;
        res.send(courses);
    });
});

app.post('/course/details',(req, res)=>{
    res.send("Hello World!");
});


app.listen(3000, function () {
    console.log("Your server is running on port 3000");
});