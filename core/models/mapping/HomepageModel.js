
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    note_one:{ type:String },
    note_two:{ type:String },
    note_three:{ type:String },
    note_four:{ type:String },
    note_five:{ type:String },
    quote_content:{ type:String },//引用
    img_one:{ type:String },//第一张图片
    img_two:{ type:String },
    img_three:{ type:String },
    status:{ type:Number },
    createdate:{ type:Date, default:Date.now },
    modifydate:{ type:Date, default:Date.now }

});

mongoose.model('Homepage', schema);

