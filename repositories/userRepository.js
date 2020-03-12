"use strict";
const User = require('../models/User');
class UserRepository {

  async findOneAndUpdate(body, cb) {
    let query;
    try {
      console.log('USER REPOSITORY UPDATE', body);
      
      query = User.findOneAndUpdate({username:body.username}, body,{rawResult: true})
      if (cb) return cb(null, query); // si me dan callback devuelvo los resultados por ahí
    return query;
    } catch (error) {
      throw new Error(error)
    }
  }


  async findOneAndDelete(username, cb) {
    let query;
    try {
      query = User.findOneAndDelete({username})
      if (cb) return cb(null, query); // si me dan callback devuelvo los resultados por ahí
    return query;
    } catch (error) {
      throw new Error(error)
    }
  }

  async findByIdAndRemove(id) {
    let query;
    try {
      query = await Advert.findByIdAndRemove(id);
      return query;
    } catch (error) {
      throw new Error(error)
    }
  }
  
  async findOne(query){
    let user;
    try {
      user = await User.findOne(query);
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }
  

  async save(data){
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