
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    title:{ type:String },
    author:{ type:String },
    blogcontent:{ type:String },
    catecode:{ type:String },//存放该文章属于哪一个文章的系列：blogCategory_code
    tag:{ type:String },//这个字段暂时先空着，留着以后来存文章的标签
    visit_count:{ type:Number },
    status:{ type:Number },
    createdate:{ type:Date, default:Date.now },
    modifydate:{ type:Date, default:Date.now }

});

mongoose.model('Blog', schema);

