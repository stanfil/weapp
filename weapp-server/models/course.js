let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let CourseSchema = new Schema({
    id: { type: String, unique: true, required: true },
    cover: { type: String },
    title: { type: String, required: true},
    price: { type: Number },
    intro: { type: String },
    introvideolink: { type: String },
    resourcelink: {type: String},
    content: {type: String}
});

module.exports = mongoose.model('Course', CourseSchema);