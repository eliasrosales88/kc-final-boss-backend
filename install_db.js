'use strict';

const mongoose = require('mongoose');
const readLine = require('readline');
const async = require('async');

const db = require('./lib/connectMongoose');

// Cargamos las definiciones de todos nuestros modelos
const Advert = require('./models/Advert');
const User = require('./models/User');

db.once('open', async function () {
  try {
    const answer = await askUser('Are you sure you want to empty DB? (no) ');
    if (answer.toLowerCase() === 'yes') {
      
      // Inicializar nuestros modelos
      await initAdverts();
      await initUsers();
      
    } else {
      console.log('DB install aborted!');
    }
    return process.exit(0);
  } catch(err) {
    console.log('Error!', err);
    return process.exit(1);
  }
});

function askUser(question) {
  return new Promise((resolve, reject) => {
    const rl = readLine.createInterface({
      input: process.stdin, output: process.stdout
    });
    rl.question(question, answer => {
      rl.close();
      resolve(answer);
    });
  });
}

async function initAdverts() {

  await Advert.deleteMany({});
  console.log('Adverts borrados.');

  // Cargar adverts.json
  const file = './adverts.json';

  console.log('Cargando ' + file + '...');
  const numLoaded = await Advert.loadJson(file);
  console.log(`Se han cargado ${numLoaded} adverts.`);

  return numLoaded;

}

async function initUsers() {
  await User.deleteMany();
  await User.insertMany([
    {
      username: 'admin',
      email: 'admin@example.com',
      password: await User.hashPassword('e12345678')
    },
    {
      username: 'eard',
      email: 'eard@example.com',
      password: await User.hashPassword('e12345678')
    }
  ]);

}
