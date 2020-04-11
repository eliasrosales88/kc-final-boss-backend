"use strict";
const User = require("../models/User");
class UserRepository {
  async findOneAndUpdate(body, cb) {
    let query;
    try {
      console.log("USER REPOSITORY UPDATE", body);

      query = await User.findOneAndUpdate({ username: body.username }, body, {
        rawResult: true,
        new: true
      });
      console.log("USER UPDATED", query);

      if (cb) return cb(null, query); // si me dan callback devuelvo los resultados por ahí
      return query;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOneAndDelete(username, cb) {
    let query;
    try {
      query = User.findOneAndDelete({ username });
      if (cb) return cb(null, query); // si me dan callback devuelvo los resultados por ahí
      return query;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findByIdAndRemove(id) {
    let query;
    try {
      query = await Advert.findByIdAndRemove(id);
      return query;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(query) {
    let user;
    try {
      user = await User.findOne(query);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async findOneAndDelete(username) {
    let result;
    try {
      console.log(username);
      
      result = await User.findOneAndDelete({...username})
    } catch (error) {
      throw error;
    }
    return result;
  }

  async save(data) {
    const user = new User(data);
    let result;
    try {
      result = await user.save();
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = new UserRepository();
