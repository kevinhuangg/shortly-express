var parseCookies = function(req, res, next) {
  var cookieString = req.headers.cookie || '';
  var cookiesArray = cookieString.split(' ');

  var cookiesObj = {};

  cookiesArray.forEach(function(cookie) {
    var index = cookie.indexOf('=');
    
    if (index !== -1) {
      var key = cookie.slice(0, index);
      if (cookie.indexOf(';') === -1) {
        cookiesObj[key] = cookie.slice(index + 1);  
      } else {
        cookiesObj[key] = cookie.slice(index + 1, cookie.length - 1);
      }

    }
  });
  //added these lines ; why does our test pass if we don't invoke next
  req.cookies = cookiesObj;
  next();
};

module.exports = parseCookies;