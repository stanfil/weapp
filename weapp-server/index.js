let express = require('express');
let app = express();
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let cors = require('cors');
let uri = require('./config.js').uri;
let morgan = require('morgan');
let course = require('./routes/course.js');
let login = require('./routes/login.js');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
mongoose.Promise = require('bluebird');
mongoose.connect(uri, { useMongoClient: true });

//db connection
let db = mongoose.connection;
db.on('error', function (err) {
    console.log('connection failed!', err);
});
db.once('open', function () {
    console.log('database connection successes!');
});

//routes
app.use('/login', login);
app.use('/course', course);

// port listening
app.listen(3000, function () {
    console.log("Your server is running on port 3000");
});
