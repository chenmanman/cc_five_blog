
var  Homepage = require("../core/models").Homepage;

var os=require('os');


exports.save = function (req, res) {

        var hp=new Homepage(req.body);
        hp.status=0;
        hp.createdate = new Date();
        hp.modifydate = new Date();
        hp.save(function (err) {
            if (err) {
                return res.json({err:err});
            }
            res.json();
        });
};


exports.list = function (req, res) {
    Homepage.find()
        .desc('createdate')
        .select('quote_content')
        .exec(function(err,date){
            res.json(date);
        });
};


exports.del=function(req,res){
    var qid = req.param("qid");
    Homepage.remove({_id:qid},function(err,docs){
        res.json();
    });
};


exports.getfirst=function(req,res){


    //console.log(os.networkInterfaces().en0[1].mac);
    // 访问者的Mac地址
    //这边单独的保存起来,目前不保存，因为觉得保存起来，
    //对我也没有什么作用，我依然不知道是谁在访问我，只能猜


    Homepage.find()
        .limit(1)
        .desc('createdate')
        //.select('title','createdate')
        .exec(function(err,date){
            res.json(date);
        });


};