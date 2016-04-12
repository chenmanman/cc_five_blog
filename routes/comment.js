
var  Comment = require("../core/models").Comment;


exports.save = function (req, res) {//添加一条记录
    var comment = new Comment(req.body);

    comment.createdate=new Date();
    comment.modifydate=new Date();

    comment.save(function (err) {
        if (err) {
            return res.json({err:err});
        }
        res.json();//这边是返回值
    });


};


exports.del_id = function (req, res) {
    var noteid = req.param("nid");
    Note.remove({_id:noteid},function(err,docs){  //根据id来删除数据,注意看一下ng-nice中的那些格式
        res.json();
    });

};

exports.commentByNoteid = function (req, res) {
    var noteid = req.param("nid");
//    Note.findById(noteid,function(err,data){
//        res.json(data);
//    });

    Comment.find()
        .where('note_id',noteid)
        .exec(function(err,date){
            res.json(date);
        });
};



