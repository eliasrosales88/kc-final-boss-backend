'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// const nodemailerTransport = require('../lib/nodemailerConfigure');

// definimos un esquema
const userSchema = mongoose.Schema({
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String
});


userSchema.statics.hashPassword = function(plainPassword) {
  return bcrypt.hash(plainPassword, 10);
}


// userSchema.methods.sendEmail = function(from, subject, body) {
//   // enviar el correo
//   return nodemailerTransport.sendMail({
//     from: from,
//     to: this.email,
//     subject: subject,
//     html: body
//   })
// }

const User = mongoose.model('User', userSchema);

module.exports = User;