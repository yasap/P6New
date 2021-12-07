const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, 'I_LIKE_WEBDEVELOPMET_AND_I_WOULD_LIKE_TO_BECOME_A_DEVELOPER', function (error, verify) {
    if (error) {
      res.status(401).json({
        error: "invalid token"
      })
    }
    else {
      next();
    }
  });
}
