var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var bodyParser = require('body-parser');
const expressJWT = require('express-jwt')
const {PRIVATE_KEY} = require('./utils/constant')
var app = express();
app.use(bodyParser.urlencoded({extended:true}));  //支持编码的主体

 app.use(bodyParser.json());  //支持json编码的主体

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(expressJWT({
  secret: PRIVATE_KEY,   
  algorithms:['HS256']
}).unless({
  path: ['/api/user/register','/api/user/login','/api/user/upload']  //白名单,除了这里写的地址，其他的URL都需要验证
}));

console.log('testrestart--')
app.use('/', indexRouter);
app.use('/api/user', usersRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
