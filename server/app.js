const express = require('express')
const app = express()
const path = require('path')
const logger = require('morgan')
const cors = require('cors');
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const helmet = require('helmet');
const index = require('./routes/index')
const jwt = require("jsonwebtoken"); // 用於生成和驗證 token
// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
app.use(
  helmet.contentSecurityPolicy({
      directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "https://stackpath.bootstrapcdn.com"],
          styleSrc: ["'self'", "https://stackpath.bootstrapcdn.com", "'unsafe-inline'"],
          imgSrc: ["'self'", "data:", "https://stackpath.bootstrapcdn.com"],
          fontSrc: ["'self'", "https://stackpath.bootstrapcdn.com"],
          connectSrc: ["'self'"],
      },
  })
);
app.use(cors());


// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true,
}))

app.use(cookieParser())
app.use(express.json());
app.use(express.static(path.join(__dirname, '../build')));
app.use('/api', index)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'))
})

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
