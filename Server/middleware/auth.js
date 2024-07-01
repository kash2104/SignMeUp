const jwt = require("jsonwebtoken");

exports.auth = async (req, res, next) => {
  try {
    const token =
      req.header("Authorization").replace("Bearer ") ||
      localStorage.getItem("session_id");

    console.log("token: ", token);

    if (!token) {
      res.status(401).json({
        success: false,
        message: "Token is missing.",
      });
    }

    try {
      const decodedToken = jwt.verify(token, "Kavish");
      console.log("Decoded token is: ", decodedToken);

      req.user = decodedToken;
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Token is invalid",
      });
    }
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Error while validating the token",
    });
  }
};
