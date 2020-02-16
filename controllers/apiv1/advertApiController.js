const AdvertManager = require("../../managers/advertManager");
// const connectionPromise = require("../../lib/connectAMQP");

class AdvertApiController {

  getList(req, res, next) {
    const start = parseInt(req.query.start) || 0;
    const limit = parseInt(req.query.limit) || 1000; // nuestro api devuelve max 1000 registros
    const sort = req.query.sort || '_id';
    const includeTotal = req.query.includeTotal === 'true';
    const filters = {};
    if (typeof req.query.tag !== 'undefined') {
      filters.tags = req.query.tag;
    }
  
    if (typeof req.query.forSale !== 'undefined') {
      filters.forSale = req.query.forSale;
    }
  
    if (typeof req.query.price !== 'undefined' && req.query.price !== '-') {
      if (req.query.price.indexOf('-') !== -1) {
        filters.price = {};
        let range = req.query.price.split('-');
        if (range[0] !== '') {
          filters.price.$gte = range[0];
        }
  
        if (range[1] !== '') {
          filters.price.$lte = range[1];
        }
      } else {
        filters.price = req.query.price;
      }
    }
  
    if (typeof req.query.name !== 'undefined') {
      filters.name = new RegExp('^' + req.query.name, 'i');
    }
  
    AdvertManager.find(filters, start, limit, sort, includeTotal, function (err, adverts) {
      if (err) return next(err);
      res.json({ ok: true, result: adverts });
    });
    
  }





  async create(req, res, next) {
    console.log("fffff");
    
    try {
      // console.log("aaaaaa");
      const data = req.body;
      // console.log("DATA",data);
      
      // console.log("bbbkbb");
      const advertTosave = {
        name: data.name,
        description: data.description,
        price: parseInt(data.price),
        photo: req.file.originalname,
        forSale: JSON.parse(data.forSale),
        tags: [data.tags],
        owner: data.owner
      }
      // console.log("advertTosave", advertTosave);
      
        await AdvertManager.save(advertTosave);
  
  
      // //copiamos el archivo a la carpeta definitiva de fotos
      // fs.createReadStream('./uploads/' + req.file.filename)
      //   .pipe(fs.createWriteStream('./public/images/anuncios/' + req.file.filename + "_" + req.file.originalname));
            
      //   //borramos el archivo temporal creado
      //   const imageTmp = path.join(__dirname, '../../uploads/' + req.file.filename);
      
      // fs.unlink(imageTmp, (err) => {
      //   if (err) throw err;
      //   console.log(req.file.filename + ' was deleted');
      // });
  
      // const imagePath = path.join(__dirname, '../../public/images/anuncios/' + req.file.filename + "_" + req.file.originalname);
      // console.log('imagePath',imagePath);
  
      // //enviamos la tarea a la cola
      // main().catch(err => { console.log("Hubo un error:", err) });
  
      // async function main() {
  
      //   // conectamos al servidor AMQP
      //   const conn = await connectionPromise;
  
      //   // conectar a un canal
      //   const channel = await conn.createChannel()  // con esto voy a hablar con las colas
  
      //   // asegurar que la cola existe
      //   await channel.assertQueue(queueName, {
      //     durable: true // la cola sobrevive a reinicios del broker
      //   });
  
  
      //   let sendAgain = true;
  
      //   try {
      //     // mandar un mensaje
      //     const image = {
      //       path: imagePath
      //     };
  

      //       await new Promise(resolve => channel.on("drain", () => { resolve }))
  
      //     }
  
      //     sendAgain = channel.sendToQueue(queueName, Buffer.from(JSON.stringify(image)), {
      //       persistent: true // el mensaje sobrevive a reinicios del broker (rabbitmq es el broker).
      //     });
  
      //     console.log(`La ruta ${image.path} se ha enviado ${sendAgain}`);
  
      //   } catch (error) {
      //     console.log(error);
      //     process.exit(1);
      //   }
      // }
  
      // respondemos
      console.log("hey");
      
      res.json({ success: true, result: advertTosave });
    } catch (error) {
      res.json({ success: false });
    }
  }

}

module.exports = new AdvertApiController();