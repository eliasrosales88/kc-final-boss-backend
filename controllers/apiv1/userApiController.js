"use strict";
const UserManager = require("../../managers/userManager");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UserApiController {

  async update(req, res, next) {
    let query;
    try {
      const body = req.body;
      console.log("BODY UPDATE", body);
      query = await UserManager.findOneAndUpdate(body)


      console.log("SENT DATA", query);
      

      res.json({ ok: true, result: query});
    } catch (error) {
      throw new Error(error);
    }
    
  }

  async delete(req, res, next) {
    let query;
    const body = req.body;
    console.log("USERNAME", body);

    try {
      query = await UserManager.deleteUserAndUserAdverts(body.username);
      res.json({ ok: true, result: query });
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(req, res, next) {
    const username = req.query.username;
    console.log("username", username);
    try {
      let user = await UserManager.findOne({ username });
      if (user) {
        let about = user.about;
        let twitter = user.twitter;
        let username = user.username;
        let email = user.email;

        // Response
        res.json({ success: true, result: { username, email, about, twitter } });
      } else {
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
