// export function isAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     return next();
//   }
//   res.redirect("/");
// }

exports.auth = async (req, res, next) => {
  try {
    const token =
      req.header("Authorization").replace("Bearer ") ||
      localStorage.getItem("session_id");

    if (!token) {
      res.status(401).json({
        success: false,
        message: "Token is missing.",
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
