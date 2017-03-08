var Sessions = require('../models/session');
var util = require('../lib/utility');
var _ = require('underscore');

var createSession = function(req, res, next) {
  //check if cookies exist
  var agent = req.get('User-Agent');

  if (!req.cookies.shortlyid) { //if theres no current session
    return Sessions.addSession(agent).then(function(hash) {
      req.session = {hash: hash};
      res.cookie('shortlyid', {hash: hash});
      next();
    }); 
  } 
  //if there's a current session
  Sessions.getSession(req.cookies.shortlyid).then(function(sessionID) {
    console.log(sessionID);
  });
    //get session from db (input: req.cookies.shortlyid)



  

  // if (_.isEmpty(req.cookies)) { //new session if no cookies
  //   var hash = util.generateHash();
  //   req.session = {hash: hash};
  //   res.cookies['shortlyid'] = {value: ''};
  // }

  next();
};

module.exports = createSession;

