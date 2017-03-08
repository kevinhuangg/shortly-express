var Sessions = require('../models/session');
var util = require('../lib/utility');
var _ = require('underscore');

var createSession = function(req, res, next) {
  //check if cookies exist
  var agent = req.get('User-Agent');
  console.log(agent);

  if (!req.cookies.shortlyid) {
    Sessions.addSession(agent).then(function(hash) {
      req.session = {hash: hash};
      res.cookies['shortlyid'] = hash;
      next();
    }); 
  }
    //if no
      //create new session
      //set new cookie on response
    //if yes
      //check if sessionidhash exists in database
      //if not
        //destroy cookie
        //create new session
        //set new cookie response
      //if exists
        //get session from database
        //assign session object to request


  

  // if (_.isEmpty(req.cookies)) { //new session if no cookies
  //   var hash = util.generateHash();
  //   req.session = {hash: hash};
  //   res.cookies['shortlyid'] = {value: ''};
  // }

  next();
};

module.exports = createSession;

