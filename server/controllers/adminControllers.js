const adminUtilities = require('../utilities/adminUtilities');
const jwt=require('jsonwebtoken');

const adminLogin = (req, res) => {
  const data = req.body;

  adminUtilities.doAdminLogin(data).then((response) => {
    if (response.status) {
      const token = jwt.sign(
        {
          adminId: response.admin._id,

          email: response.admin.email,
        },
        process.env.JWT_SECRET_KEY
      );
      return res.json({ status: 'ok', admin: token });
    } else {
      return res.json({ status: 'error', admin: false });
    }
  });
};

module.exports = {
  adminLogin,
};
