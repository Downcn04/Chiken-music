const express = require('express');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const registerRouter = require('./router');

const port = process.env.PORT || 9090;

const app = express();

app.use(cookieParser());
// 移除 csrfProtection 中间件
// app.use(csrfProtection);

app.get('/', function (req, res, next) {
  // 可选：如果不需要 CSRF，可能不需要设置 token
  // res.cookie('XSRF-TOKEN', req.csrfToken());
  return next();
});

registerRouter(app);

app.use(compression());
app.use(express.static('./dist'));

app.use(function (err, req, res, next) {
  return next();
});

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Listening at http://localhost:' + port + '\n');
});
