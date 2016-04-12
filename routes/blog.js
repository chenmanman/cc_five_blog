
var  Blog = require("../core/models").Blog;
var markdown=require('markdown').markdown;

exports.list = function (req, res) {

    Blog.find()
        .desc('createdate')
        .select('title','catecode','author','visit_count')
        .exec(function(err,date){
            res.json(date);
        });
};

exports.list_cate = function (req, res) { //按照标签获取文章列表

    var catecode = req.param("catecode");

    Blog.find()
        .where('catecode',catecode)
        .desc('createdate')
        .select('title','createdate','author')
        .exec(function(err,date){
            res.json(date);
        });


};

exports.list_new = function (req, res) { //去最近的15篇文章
    Blog.find()
        .limit(15)
        .desc('createdate')
        .select('title','createdate')
        .exec(function(err,date){
            res.json(date);
    });
};




exports.add = function (req, res) {
    var createblog = new Blog(req.body);
    createblog.tag="1";
    createblog.blogcontent=markdown.toHTML(createblog.blogcontent);
    createblog.createdate = new Date();
    createblog.modifydate = new Date();
    createblog.status = 0;
    createblog.visit_count = 0;

    createblog.save(function (err) {
        if (err) {
            return res.json({err:err});
        }
        res.json();
    });

};



exports.allposttitle = function (req, res) {

    Blog.find({},'title', function (err, docs) {
       res.json(docs);
    });

};


exports.del=function(req,res){
    var postid = req.param("pid");
    Blog.remove({_id:postid},function(err,docs){  //根据id来删除数据,注意看一下ng-nice中的那些格式
        res.json();
    });
};



exports.read_id = function (req, res) {
    var blogid = req.param("pid");

    Blog.findById(blogid,function(err,data){
        data.visit_count=data.visit_count+1;
        data.save(function(err){
            if (err) {
                return res.json({err:err});
            }
            res.json();//这边是返回值

        });

        res.json(data);
    });

};

