const Ngo = require('../models/ngo');

exports.uploadNgo = async (req, res) => {
  try {
    const { organizationname, registrationno, website, cause } = req.body;

    const newNgo = await Ngo.create({
      user: req.user._id, // must come from authentication middleware
      organizationname,
      registrationno,
      website,
      cause
    });

    res.status(201).json({ success: true, data: newNgo });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
