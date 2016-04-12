
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    blogCategory_name:{ type:String },//这个分类的name
    blogCategory_code:{ type:String },//这个分类的描述
    blogCategory_desc:{type:String},//这个分类的编码：这个编码手动添加
    status:{ type:Number, default:0 },
    createdate:{ type:Date, default:Date.now },
    modifydate:{ type:Date, default:Date.now }

});

mongoose.model('BlogCategory', schema);//文章的分类