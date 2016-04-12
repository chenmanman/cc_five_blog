
var blog = require('./blog');
var blogcategory = require('./blogCategory');
var note = require('./note');
var comment = require('./comment');
var reply = require('./reply');
var homepage = require('./homepage');

module.exports = function (app) {

    app.post('/postadd', blog.add);
    app.get('/postlist', blog.list);
    app.get('/postdel:pid', blog.del);
    app.get('/postlist_cate:catecode', blog.list_cate);
    app.get('/postlist_new', blog.list_new);
    app.get('/postcontentbyid:pid', blog.read_id);





    app.post('/postCategorySave', blogcategory.save);
    app.get('/postcategoryInfoList', blogcategory.categoryInfoList);
    app.get('/postcategorydel:pcid', blogcategory.del);
    app.get('/postcategoryupdate:pcidname', blogcategory.update);

    app.post('/postNoteSave', note.save);
    app.get('/notelist', note.list);
    app.get('/notelist_B', note.list_B);
    app.get('/noteInfoById:nid', note.info_id);
    app.get('/notedel:nid', note.del_id);

    app.post('/postCommentSave', comment.save);
    app.get('/getCommentByNoteid:nid', comment.commentByNoteid);

    app.get('/getReplyByNoteid:nid', reply.replyByNoteid);
    app.post('/postReplySave', reply.save);

    app.post('/homepageadd', homepage.save);
    app.get('/homepagelist', homepage.list);
    app.get('/homepagedel:qid', homepage.del);
    app.get('/homepagefirst', homepage.getfirst);

};
