var express = require('express');
var routes = require('./routes/routes');
var path = require('path');
var ejs = require('ejs');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();
app.set('port',8952);
app.set('views', path.join(__dirname, 'web'));
app.engine('.html', ejs.__express);
app.set('view engine', 'html');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'web/static')));

app.get('/', function (req, res) {

    res.sendfile('web/static/index.html');

});

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

routes(app);
module.exports = app;
