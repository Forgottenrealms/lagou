var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//引入路由模块
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var positionsRouter = require('./routes/positions');
// 引入 express-session 模块
const session = require("express-session");

// Express 应用实例
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// 使用 session 中间件
app.use(session({
  secret: 'oiqerulkdsafoiasufoiwqe',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 30 * 60 * 1000 } // session会话时效
}));
// 使用中间件：静态资源
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/', indexRouter);  // 访问 "/api/" 目录下的资源
app.use('/api/users', usersRouter); // 访问 "/api/users/" 目录下的资源
app.use('/api/positions', positionsRouter); // 访问 "/api/positions/" 目录下的资源

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
