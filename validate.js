const jwt = require('jsonwebtoken');

const checkUrlAndValidateToken = (req, res, next) => {
  if (req.path === '/register') {
    return next();
  }

  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }


//   Hard coding the secret_key as of now, should move secret to different file and git ignore it
  jwt.verify(token, 'secret', (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Failed to authenticate token' });
    }

    req.userId = decoded.userId;
    next();
  });
};

module.exports = checkUrlAndValidateToken;
