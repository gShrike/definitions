const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cors = require('cors')

// DB CONNECTION
const knex = require('./db/knex')

// ROUTES
const auth = require('./routes/auth')
const terms = require('./routes/terms')
const users = require('./routes/users')
const topics = require('./routes/topics')
const questions = require('./routes/questions')


const app = express()

// view engine setup
// app.set('views', path.join(__dirname, 'views'))
// app.set('view engine', 'hbs')

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/auth', auth)
app.use('/terms', terms)
app.use('/users', users)
app.use('/topics', topics)
app.use('/questions', questions)
app.get('/', function(req, res, next) {
  res.json({ success: true, message: `An API for developer terms, topics, and questions` })
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.json({
    error: true,
    message: err.message
  })
})

module.exports = app
