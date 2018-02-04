let express = require('express');
let app = express();
// let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let cors = require('cors');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
// mongoose.connect('mongodb://localhost:27017/weapp-server');

app.get('/',(req, res)=>{
    res.send("Hello World!");
});

app.listen(3000, function () {
    console.log("Your server is running on port 3000");
});