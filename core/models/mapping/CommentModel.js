
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    note_id:{ type:String },//对应的便签id
    content:{ type:String },//便签的内容
    member:{ type:String },//评论的人
    type:{ type:Number, default:0 },
    status:{ type:Number, default:0 },
    createdate:{ type:Date, default:Date.now },
    modifydate:{ type:Date, default:Date.now }

});

mongoose.model('Comment', schema);
