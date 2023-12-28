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

router.get('/profile', function(req, res, next) {
  res.render('profile');
});

router.get('/register', function(req, res, next) {
  res.render('register');
});

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

module.exports = router;