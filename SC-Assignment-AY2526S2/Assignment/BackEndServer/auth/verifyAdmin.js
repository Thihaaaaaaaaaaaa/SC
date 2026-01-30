

const userDB = require('../model/users'); 

function verifyAdmin(req, res, next) {
  const userid = req.userid; // set by verifyToken

  if (!userid) {
    return res.status(401).json({ auth: false, message: 'Unauthorized' });
  }

  // Use the SAFE function you added (does not touch your vulnerable endpoint)
  userDB.getUserRoleByUserid(userid, function (err, results) {
    if (err) {
      console.log(err);
      return res.status(500).json({ auth: false, message: 'Internal Server Error' });
    }

    if (!results || results.length === 0) {
      return res.status(401).json({ auth: false, message: 'User not found' });
    }

    const role = results[0].type;

    if (role !== 'Admin' && role !== 'admin') {
      return res.status(403).json({ auth: false, message: 'Admin access required' });
    }

    // Optional: attach user info for later handlers
    req.user = {
      userid: results[0].userid,
      username: results[0].username,
      type: results[0].type
    };

    next();
  });
}

module.exports = verifyAdmin;
