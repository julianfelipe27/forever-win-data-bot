var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const cron = require('node-cron');
const scrapeIt = require("scrape-it");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const { application } = require('express');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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

cron.schedule('* * * * *', () => {

});

async function scrapeItExample() {
  const scrapeResult = await scrapeIt('https://www.google.com/search?q=la+liga&sxsrf=ALiCzsZ8z-BLS1MNbJfdw_A8TCNrhGFVkw%3A1666140803022&source=hp&ei=gkpPY_ieO9qRwbkPtNKJsA8&iflsig=AJiK0e8AAAAAY09Yk9S_R7lmUH2vgxpjtkK1pznkBB2b&ved=0ahUKEwj459OViuv6AhXaSDABHTRpAvYQ4dUDCAg&uact=5&oq=la+liga&gs_lcp=Cgdnd3Mtd2l6EAMyCQgjECcQRhD9ATIECCMQJzIECCMQJzIHCC4Q1AIQQzIECAAQQzIECAAQQzIICAAQgAQQywEyEQguEIAEEMcBEK8BENQCEMsBMggILhCABBDLATIICC4QgAQQywE6BQgAEJECOgoILhDHARDRAxBDOgsILhCABBDHARDRAzoFCC4QgAQ6BQgAEIAEOgsILhCABBDHARCvAToECC4QQ1AAWN4FYPEGaABwAHgAgAG-A4gB1wuSAQcyLTMuMS4xmAEAoAEB&sclient=gws-wiz#sie=lg;/g/11sqj24s0_;2;/m/09gqx;st;fp;1;;;', {
      presentations: {
          listItem: 'li.deck.public',
          data: {
              title: 'span.deck-title-value',
              description: 'span.deck-description-value',
              link: {
                  selector: 'a.deck-link',
                  attr: 'href'
              }
          }
      }
  });
  console.log(scrapeResult.body);
}

scrapeItExample()

module.exports = app;
