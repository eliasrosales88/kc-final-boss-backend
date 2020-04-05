"use strict";
const User = require("../models/User");
const UserRepository = require("../repositories/userRepository");
const AdvertRepository = require("../repositories/advertRepository");

class UserManager {

  async findOneAndUpdate(body) {
    let query;
    try {
      query = await UserRepository.findOneAndUpdate(body);
      return query;
    } catch (error) {
      throw error;
    }
  }

  async deleteUserAndUserAdverts(username) {
    let onDeleteAdvert;
    let onDeleteUser;
    try {
      onDeleteAdvert = await AdvertRepository.deleteMany({owner: username});
      if (onDeleteAdvert.ok === 1) {
        onDeleteUser = await UserRepository.findOneAndDelete({username});
        return onDeleteUser;
      } else (onDeleteAdvert);
    } catch (error) {
      throw error
    }
  }


  async findOne(query) {
    let user;
    try {
      
      user = await UserRepository.findOne(query);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async checkUniqueUserInDB(user, username, email, password) {
    let response;
    try {
      if (user === null) {
        const dataToSaveMongo = {
          success: true,
          message: "User registered",
          data: {
            username,
            email,
            password: await User.hashPassword(password)
          }
        };
        response = dataToSaveMongo;
  
        return response;
      }
      
    } catch (error) {
      throw error;
    }

    // Check if username or email exist in database
    if (user.email === email && user.username === username) {
      response = {
        success: false,
        message: "Email and username already exist",
        data: { username, email }
      };
    } else if (user.email === email) {
      response = {
        success: false,
        message: "Email already exist",
        data: { email }
      };
    } else if (user.username === username) {
      response = {
        success: false,
        message: "Username already exist",
        data: { username }
      };
    }

    return response;
  }
  

  async save(res) {
    try {
      await UserRepository.save(res);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new UserManager();
