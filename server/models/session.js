var db = require('../db');
var util = require('../lib/utility');

// Write you session database model methods here

module.exports = {
  addSession: function(userAgent) {
    userAgent = userAgent || Math.floor((Math.random() * 100) + 1).toString(); //comment out later
    var hash = util.generateHash(userAgent);
    sessionObj = {hash: hash};

    return db.queryAsync('insert into sessions set ?', sessionObj).return(hash);
  },
  
  getSession: function(cookie) {
    var queryString = 'select * from sessions where hash = ?';

    return db.queryAsync(queryString, cookie).then(function(results) {
      var session = results[0][0];
      console.log(session);
      if (!session) {
        return session;
      }
      
    });
  }
};
