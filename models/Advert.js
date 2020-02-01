'use strict';

const mongoose = require('mongoose');
const fs = require('fs');

const advertSchema = mongoose.Schema({
  name: { type: String, index: true },
  description: { type: String, index: true },
  price: { type: Number, index: true },
  forSale: { type: Boolean, index: true },
  photo: { type: String, index: true },
  tags: { type: [String], index: true },
  owner: { type: String, index: true }
});

/**
 * carga un json de adverts
 */
advertSchema.statics.loadJson = async function (file) {
  
  // Using a callback function with async/await
  const data = await new Promise((resolve, reject) => {
    // Encodings: https://nodejs.org/api/buffer.html
    fs.readFile(file, { encoding: 'utf8' }, (err, data) => {
      return err ? reject(err) : resolve(data);
    });
  });

  console.log(file + ' leido.');

  if (!data) {
    throw new Error(file + ' está vacio!');
  }

  const adverts = JSON.parse(data).adverts;

  console.log("ADVERTS",adverts);
  
  const numAdverts = adverts.length;

  for (var i = 0; i < adverts.length; i++) {
    await (new Advert(adverts[i])).save();
  }

  return numAdverts;

};





var Advert = mongoose.model('Advert', advertSchema);

module.exports = Advert;