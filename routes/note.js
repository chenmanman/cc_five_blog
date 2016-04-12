
var  Note = require("../core/models").Note;


exports.save = function (req, res) {//添加一条记录
    var note = new Note(req.body);

    note.createdate=new Date();
    note.modifydate=new Date();

    note.save(function (err) {
        if (err) {
            return res.json({err:err});
        }
        res.json();//这边是返回值
    });


};


exports.list = function (req, res) {
    Note.find({type:1},['content','member','createdate','modifydate'],function (err, docs) {
        res.json(docs);
    });//直接查询的方法

};


exports.list_B = function (req, res) {
    Note.find({type:2},['content','member','createdate','modifydate'],function (err, docs) {
        res.json(docs);
    });//直接查询的方法

};


exports.info_id = function (req, res) {
    var noteid = req.param("nid");
    Note.findById(noteid,function(err,data){
        res.json(data);
    });

};

exports.del_id = function (req, res) {
    var noteid = req.param("nid");
    Note.remove({_id:noteid},function(err,docs){  //根据id来删除数据,注意看一下ng-nice中的那些格式
        res.json();
    });

};





////这边要做的是得到一个文章类型名称的列表：直接将数据都传过去，值传递name
////addtime,name,code.
//exports.categoryInfoList = function (req, res) {
//    BlogCategory.find({},['blogCategory_name','blogCategory_code','createdate','modifydate'],function (err, docs) {
//        res.json(docs);
//    });//直接查询的方法
//
//};
//
//exports.del=function(req,res){
//    var postcateid = req.param("pcid");
//    BlogCategory.remove({_id:postcateid},function(err,docs){  //根据id来删除数据,注意看一下ng-nice中的那些格式
//        res.json();
//    });
//};
//
//exports.update=function(req,res){
//    var postcateidname = req.param("pcidname");
//
////将数据分割为id和name
//    console.log(postcateidname);
//    var strs= new Array();
//    strs= postcateidname.split('&');
//    var pcid=strs[0];
//    var pcname=strs[1];
//  //这边做的是update的操作
//    BlogCategory.findById(pcid,function(err,blogcategory){
//        console.log(blogcategory);
//        blogcategory.blogCategory_name=pcname;
//        blogcategory.save(function(err){});
//    });
//
//};


