let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let UserSchema = new Schema(
    {
        openId: String,
        ownCourses: {type: Array, default:['75', '74']},
        likeCourses: {type: Array, default:['73', '70', '54']},
    },
    {timestamps: true}
);

module.exports = mongoose.model('User', UserSchema);
