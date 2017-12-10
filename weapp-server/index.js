let express = require('express');
let app = express();
let mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/weapp-server');

app.listen(3000, function () {
    console.log("Your server is running on port 3000");
})