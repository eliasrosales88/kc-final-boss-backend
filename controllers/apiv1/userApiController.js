"use strict";
const UserManager = require("../../managers/userManager");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UserApiController {
  async findOne(req, res, next) {
    const username = req.query.username;
    console.log("username", username);
    try {
      let user = await UserManager.findOne({ username });
      if (user) {
        
        let username = user.username;
        
        // Response
        res.json({ success: true, username });
      }else {
        res.status(404);
        res.json({ success: false, message: "Not found" });
        return;
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new UserApiController();
