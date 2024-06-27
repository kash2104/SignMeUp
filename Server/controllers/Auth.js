const User = require("../models/User");

const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "id not found",
      });
    }

    const user = await User.findById({ _id: id });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User is not registered. Please sign up first",
      });
    }

    const payload = {
      name: user.googleDisplayName,
    };

    const token = jwt.sign(payload, "Kavish");

    const options = {
      httpOnly: true,
    };

    res.cookie("token", token, options).status(200).json({
      success: true,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Login failed. Please try again",
    });
  }
};
