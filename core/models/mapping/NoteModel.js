
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    content:{ type:String },//便签的内容
    member:{ type:String },//添加人
    type:{ type:Number, default:0 },
    status:{ type:Number, default:0 },
    createdate:{ type:Date, default:Date.now },
    modifydate:{ type:Date, default:Date.now }

});

mongoose.model('Note', schema);
