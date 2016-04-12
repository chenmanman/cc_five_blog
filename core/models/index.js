/**
 *数据库连接的初始化部分
 *
 * **/

var mongoose = require('mongoose');
var config = require('../../config');
var fs = require('fs');
var log = require('./../libs/log');

mongoose.connect(config.connectionstring);

var db = mongoose.connection;
db.on('error', function(err){
    console.error('connect to %s error: ', config.connectionstring, err.message);
    process.exit(1);
});
db.once('open', function () {
    log.success('%s has been connected.', config.connectionstring);
});

var models_path = __dirname + '/../models/mapping';//__dirname：开发期间，该行代码所在的目录。全局变量
fs.readdirSync(models_path).forEach(function (file) {
    require(models_path + '/' + file);
    var modelName = file.replace('Model.js', '');
    exports[modelName] = mongoose.model(modelName);
});
