"use strict";
const Advert = require("../models/Advert");


class AdvertRepository {
  async findOne(query) {
    let advert;
    try {
      advert = await Advert.findOne(query);
      return advert;
    } catch (error) {
      throw new Error(error);
    }
  }

  async find(filters, startRow, numRows, sortField, includeTotal, cb) {
    try {
      
      const query = Advert.find(filters);
      query.sort([[sortField, -1]]);
      query.skip(startRow);
      query.limit(numRows);
      // if (filters.name) {
      //   query.select('name');
      // };
      
      const result = {};

      if (includeTotal) {
        result.total = await Advert.countDocuments(filters);
      }
      result.rows = await query.exec();

      

      if (cb) return cb(null, result); // si me dan callback devuelvo los resultados por ahí
      return result; // si no, los devuelvo por la promesa del async (async está en la primera linea de esta función)
    } catch (error) {
      throw new Error(error);
    }
  }

  async save(advertTosave) {
    try {
      const advert = new Advert(advertTosave);
      await advert.save();
    } catch (error) {
      throw new Error(error);
    }
  }

  update() {}
  deleteOne() {}
  deleteMany() {}
}

module.exports = new AdvertRepository();
