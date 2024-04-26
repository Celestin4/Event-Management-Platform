const jwt = require('jsonwebtoken');

exports.isAuthenticated = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userData = { userId: decoded.userId };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'You are not logged in please' });
  }
};


exports.isAdmin = (req, res, next) => {
 
  if (req.userData && req.userData.isAdmin) {
    next();
  } else {
    return res.status(403).json({ message: 'Unauthorized access' });
  }
};
