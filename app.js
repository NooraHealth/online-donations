var express = require('express');
var path = require('path');
var coffeescript = require('coffee-script').register();
var mongoose = require('mongoose');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('express-handlebars');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var passportLocalMongoose = require('passport-local-mongoose');

//Mongoose models
var Donor = require('./models/Donors');

//ROUTES
var routes = require('./routes/index');
var donations = require('./routes/donations');
var registerNewDonor = require('./routes/register');
var login = require('./routes/login');
var logout = require('./routes/logout');
var donors = require('./routes/donors');

var app = express();

//Mongoose config
//mongoose.connect(process.env.MONGO_URL 
                 //|| 'mongodb://lucyanne:artichokes@lighthouse.0.mongolayer.com:10104/production');

mongoose.connect(process.env.MONGO_URL 
                 || "mongodb://localhost/");
                 
// view engine setup
app.engine("html", require('ejs').renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.set('stripe secret key', process.env.STRIPE_SECRET_KEY_TESTING)

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  resave: true, 
  saveUninitialized: true,
  secret: "Noora Health donors",
  maxAge: 6000
}));
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

app.use(passport.initialize());
app.use(passport.session());

//PASSPORT CONFIG
passport.use(Donor.createStrategy());

passport.serializeUser(Donor.serializeUser());
passport.deserializeUser(Donor.deserializeUser());

//ROUTES
//app.param("stripeId", function(req, res, next, stripeId) {
  //consol.log("in the paramaterized routes");
   //var promise = MyStripe.retrieveDonorInfo(stripeId);
   //promise.then(function(donorInfo) {
     //console.log("Got this donor info from Mystripe");
     //console.log(donorInfo);
    //req.donorInfo = donorInfo;
    //next();
   //}).fail(function(err) {
     //console.log("There was an error getting infor");
     //console.log(err);
      //next(err);
   //});
//});

app.use('/', routes);
app.use('/donations', registerNewDonor);
app.use('/donations', donations);
app.use('/login', login);
app.use('/logout', logout);

app.use( function (req, res, next) {
  if(req.user)
    next();
  else {
    res.redirect('/');
  }
});

app.use('/donors', donors);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
