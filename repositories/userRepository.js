"use strict";
const User = require('../models/User');
class UserRepository {

  async findOne(query){
    let user;
    try {
      user = await User.findOne(query);
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  findMany(){}

  async save(data){
    const user = new User(data);
    let result;
    try {
      result = await user.save();
    } catch (error) {
      throw new Error(error);
    }
  }
  
  update(){}
  deleteOne(){}
  deleteMany(){}

}



module.exports = new UserRepository();