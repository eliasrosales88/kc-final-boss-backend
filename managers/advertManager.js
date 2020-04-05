"use strict";
const AdvertRepository = require("../repositories/advertRepository");
const configAdverts = require("../config").adverts;
const path = require("path");
require("dotenv").config();

class AdvertManager {

  async findByIdAndRemove(id){
    let query;
    try {
      query = await AdvertRepository.findByIdAndRemove(id);
      return query;
    } catch (error) {
      throw new Error(error);
    }
  }
  async findByIdAndUpdate(body) {
    console.log("body",body );
    let advert;
    try {
      advert = await AdvertRepository.findByIdAndUpdate(body._id, body);
      const route = configAdverts.imagesURLBasePath;
      if (advert && advert.photo) {
        advert.photo = advert.photo ? process.env.API_BASE + route + advert.photo : null
        
      }
      return advert;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findById(id) {
    let advert;
    try {
      advert = await AdvertRepository.findById(id);
      const route = configAdverts.imagesURLBasePath;
      advert.photo = advert.photo ? process.env.API_BASE + route + advert.photo : null
      return advert;
    } catch (error) {
      throw error;
    }
  }
  async findOne(query) {
    let advert;
    try {
      advert = await AdvertRepository.findOne(query);
      return advert;
    } catch (error) {
      throw error;
    }
  }

  async find(filters, startRow, numRows, sortField, includeTotal, cb) {
    let adverts;
    try {
      adverts = await AdvertRepository.find(
        filters,
        startRow,
        numRows,
        sortField,
        includeTotal,
        cb
      );
      // poner route base a imagenes
      const route = configAdverts.imagesURLBasePath;
      adverts.rows.forEach(
        r => (r.photo = r.photo ? process.env.API_BASE + route + r.photo : null)
      );
      return adverts;
    } catch (error) {
      throw new Error(error);
    }
  }

  async save(advertTosave) {
    try {
      await AdvertRepository.save(advertTosave);
    } catch (error) {
      throw error;
    }
  }

  getFilters(req, filters) {

    if (typeof req.query.owner !== "undefined") {
      filters.owner = req.query.owner;
      filters.owner = filters.owner;
    }

    if (typeof req.query.tags !== "undefined") {
      filters.tags = req.query.tags;
      filters.tags.$all = filters.tags;
    }

    if (typeof req.query.forSale !== "undefined") {
      filters.forSale = req.query.forSale;
    }

    if (typeof req.query.price !== "undefined" && req.query.price !== "-") {
      if (req.query.price.indexOf("-") !== -1) {
        filters.price = {};
        let range = req.query.price.split("-");
        if (range[0] !== "") {
          filters.price.$gte = range[0];
        }

        if (range[1] !== "") {
          filters.price.$lte = range[1];
        }
      } else {
        filters.price = req.query.price;
      }
    }

    if (typeof req.query.name !== "undefined") {
      filters.name = new RegExp(req.query.name, "i");
    }

    return filters;
  }
}

module.exports = new AdvertManager();
