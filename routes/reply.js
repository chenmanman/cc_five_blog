
var  Reply = require("../core/models").Reply;


exports.replyByNoteid = function (req, res) {
    var noteid = req.param("nid");
//    Note.findById(noteid,function(err,data){
//        res.json(data);
//    });

    Reply.find()
        .where('note_id',noteid)
        .exec(function(err,date){
            res.json(date);
        });
};


exports.save = function (req, res) {//添加一条记录
    var reply = new Reply(req.body);

    reply.createdate=new Date();
    reply.modifydate=new Date();

    reply.save(function (err) {
        if (err) {
            return res.json({err:err});
        }
        res.json();//这边是返回值
    });


};
