//VERIFICATION AND AUTHERIZATION USING JWT

const jwt = require("jsonwebtoken");

module.exports = (credentials = []) => {
  return (req, res, next) => {
    if (typeof credentials === "string") {
      credentials = [credentials];
    }
    const token = req.headers["authorization"];
    if (!token) return res.status(401).send("Access Denied");
    try {
      const verified = jwt.verify(
        token,
        process.env.TOKEN_SECRET,
        (err, decoded) => {
          if (err) {
            return res.status(401).send("Error:Access Denied");
          }
          if (credentials.length > 0) {
            if (  
              decoded.permissions &&
              credentials.some((cred) => decoded.permissions.indexOf(cred) >= 0)
            ) {
              next();
            } else {
              return res.status(401).send("Error:Access Denied");
            }
          } else {
            // No credentials required, user is authorized
            next();
          }
        }
      );
    } catch (err) {
      res.status(400).send("Invalid Token");
    }
  };
};
