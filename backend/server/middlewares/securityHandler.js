const jwt = require("jsonwebtoken");
const { Roles } = require("../helpers/constants.js");

module.exports = class AuthMiddleware {
  verifyToken(req, res, next) {
    const token = req.headers("Authorization");

    if (!token) {
      return res.status(400).send("Access Denied! No token recieved");
    }

    try {
      const jwtData = jwt.verify(
        token.split("Bearer ")[1],
        process.env.JWT_SECRET_TOKEN
      );

      return jwtData;
    } catch (err) {
      return res.status(400).send({
        success: false,
        error: err,
      });
    }
  }

  isDugcChairman(req, res, next) {
    try {
      const jwtData = this.verifyToken(req, res, next);
      if (jwtData.role !== Roles.DUGCCHAIRMAN) throw new Error();
      req.user = jwtData;
      next();
    } catch (err) {
      res.status(400).send({ error: "You don't have enough permissions" });
    }
  }

  isDugcCord(req, res, next) {
    try {
      const jwtData = this.verifyToken(req, res, next);

      if (jwtData.role !== Roles.DUGCCORD) {
        console.error("User does not have supervisor role:", jwtData.role);
        return res.status(403).send("Access Denied! Supervisor role required");
      }
      console.log("User is a supervisor:", jwtData.role);
      req.user = jwtData;
      next();
    } catch (err) {
      console.error("Error in token verification:", err);
      res.status(500).send("Internal Server Error");
    }
  }

  isFacultyCord(req, res, next) {
    try {
      const jwtData = this.verifyToken(req, res, next);
      if (jwtData.role !== Roles.FACULTYCORD) throw new Error();
      req.user = jwtData;
      next();
    } catch (err) {
      res
        .status(400)
        .send({ error: "auth failed for STAFF, check auth-token222" });
    }
  }

  isFaculty(req, res, next) {
    try {
      const jwtData = this.verifyToken(req, res, next);
      if (jwtData.role !== Roles.FACULTY) throw new Error();
      req.user = jwtData;
      next();
    } catch (err) {
      res
        .status(400)
        .send({ error: "auth failed for STUDENT, check auth-token222" });
    }
  }
};
