"use strict";

const jwt = require("jsonwebtoken");

module.exports = function () {
  return function (req, res, next) {
    // Leer el token que me mandan
    const token = req.body.token || req.query.token || req.get('Authorization')
    console.log("TOKEN JWT_AUTH", token);
    
    // Si no tengo token no dejo pasar
    if (!token) {
      console.log("NO TOKEN", token);
      const err = new Error("No token provided");
      err.status = 401;
      next(err);
      return;
    }

    // Si el token es invalido no dejo pasar
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) {
        console.log("TOKEN VERIFY", token);
        err.status = 401;
        console.log("ERROR",err);
        
        next(err);
        return;
      }
      req.apiUserId = payload._id;
      next();
    });
  }
}