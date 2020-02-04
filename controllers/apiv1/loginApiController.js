"use strict";
const UserManager = require("../../managers/userManager");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class LoginApiController {
  async loginJWT(req, res, next) {
    try {
      // Request credentials
      const username = req.body.username;
      const email = req.body.email;
      const password = req.body.password;
      
      // Find user by email or username
      const user = await UserManager.findOne({
        $or: [{ email: email }, { username: username }]
      });

      // Not authenticate if user is not registered in database
      if (!user || !(await bcrypt.compare(password, user.password))) {
        res.json({ success: false, error: "Not Authenticated" });
        return;
      }

      // If user exists in database create JWT
      // no meter una instancia de mongoose en el Payload!!!!!!!!
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "2d"
      });

      // Response
      res.json({ success: true, token: token });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new LoginApiController();
