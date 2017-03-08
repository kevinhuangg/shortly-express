var db = require('../db');
var util = require('../lib/utility');

// Write you session database model methods here

module.exports = {
  addSession: function(userAgent) {
    var hash = util.generateHash(userAgent);
    sessionObj = {hash: hash};

    return db.queryAsync('insert into session set ?', sessionObj).return(hash);
  }
};
