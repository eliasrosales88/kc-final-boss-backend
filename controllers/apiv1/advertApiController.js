const AdvertManager = require("../../managers/advertManager");
const connectionPromise = require("../../lib/connectAMQP");
const fs = require("fs");
const path = require("path");

const publisher = require("../../queue/publisher");
const queueName = "setImages";

class AdvertApiController {

  async findOne(req, res, next) {
    const _id = req.query._id;
    
    try {
      let advert = await AdvertManager.findById(_id);
      res.json({ok: true, result: advert})
    } catch (error) {
      throw new Error(error);
    }
    
  }

  async getList(req, res, next) {
    const skip = parseInt(req.query.skip) || 0;
    const limit = parseInt(req.query.limit) || 1000; // nuestro api devuelve max 1000 registros
    const sort = req.query.sort || "_id";
    const includeTotal = req.query.includeTotal === "true";
    let filters = {};
    console.log(req.query);
    filters = AdvertManager.getFilters(req, filters)
    console.log("Filters", filters);
    

    try {
      let adverts = await AdvertManager.find(
        filters,
        skip,
        limit,
        sort,
        includeTotal
      );
      console.log(adverts);

      res.json({ ok: true, result: adverts });
    } catch (error) {
      throw new Error(error);
    }
  }

  async create(req, res, next) {
    try {
      const data = req.body;
      //Paste image in public path
      fs.createReadStream("./uploads/" + req.file.filename).pipe(
        fs.createWriteStream(
          "./public/images/adverts/" +
            req.file.filename +
            "_" +
            req.file.originalname
        )
      );

      //Deleting temporal file location
      const imageTmp = path.join(
        __dirname,
        "../../uploads/" + req.file.filename
      );
      fs.unlinkSync(imageTmp);
      console.log(req.file.filename + " was deleted");

      // Setting img public path
      const imagePath = path.join(
        __dirname,
        "../../public/images/adverts/" +
          req.file.filename +
          "_" +
          req.file.originalname
      );

      // Defining  advert to save in DB
      const advertTosave = {
        name: data.name,
        description: data.description,
        price: parseInt(data.price),
        photo: req.file.filename + "_" + req.file.originalname,
        forSale: JSON.parse(data.forSale),
        tags: [data.tags],
        owner: data.owner,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // Save in DB
      await AdvertManager.save(advertTosave);

      // PUBLISHER
      publisher.publishIMGPath(queueName, connectionPromise, imagePath).catch(err => {
        console.log("Hubo un error:", err);
      });

      // Send response
      res.json({ success: true, result: advertTosave });
    } catch (error) {
      res.json({ success: false });
    }
  }
}

module.exports = new AdvertApiController();
