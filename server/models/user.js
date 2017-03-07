var db = require('../db');
var utils = require('../lib/utility');
var crypto = require('crypto');
var Promise = require('bluebird');

// Write you user database model methods here


module.exports = {
  usernameExists: function(req, res, callback) {
    var username = req.body.username;

    db.query('select username from users where username = "' + username + '"', function(err, results, fields) {
      if (results.length === 0) { //user does not exist
        callback(false);
      } else { //user does exist
        console.log('user does exist', results);
        callback(true);
      }
    });
  },

  hashPassword: function(req, res, callback) {
    var cipher = crypto.createCipher('aes192', req.body.password);
    var hashPassword = cipher.update(req.body.password, 'utf8', 'hex');
    hashPassword += cipher.final('hex');
    callback(hashPassword);
  },

  createUsername: function(req, res, callback) {  

    var columns = {username: req.body.username, password: req.body.password};
    module.exports.hashPassword(req, res, function(hash) {
      columns.password = hash;
      console.log(hash);
      db.query('insert into users set ?', columns, function(err, result, fields) {
        if (err) {
          callback(err);
        } else {
          callback('Username Created');
        }
      });
    });
  }

};
