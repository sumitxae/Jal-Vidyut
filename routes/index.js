var express = require('express');
const passport = require('passport');
var router = express.Router();
const userModel = require('./users');
const localStrategy = require('passport-local').Strategy;

passport.use(new localStrategy(userModel.authenticate()));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/profile', isLoggedIn, async function(req, res, next) {
  const thisuser = await userModel.findOne({username: req.session.passport.user});
  res.render('profile', {user: thisuser});
});

router.get('/register', function(req, res, next) {
  res.render('register');
});

router.post('/register', (req, res, next) => {
  const user = new userModel({
    username: req.body.username,
    name: req.body.name,
  })
  userModel.register(user, req.body.password)
    .then(function (u) {
      passport.authenticate('local')(req, res, () => {
        res.redirect('/profile')
      })
    })
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/profile',
  failureRedirect: '/login',
  failureFlash: true,
  }), (req, res, next) => {}
);

router.get('/home', function(req, res, next) {
  res.render('choose');
});

router.get('/water', function(req, res, next) {
  res.render('water');
});

router.get('/elec', function(req, res, next) {
  res.render('elec');
});

router.get('/analyse-water', function(req, res, next) {
  res.render('waterAnalyse');
});

router.get('/analyse-elec', function(req, res, next) {
  res.render('elecAnalyse');
});

router.get('/goals', function(req, res, next) {
  res.render('goals');
});

router.get('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/profile');
}

module.exports = router;