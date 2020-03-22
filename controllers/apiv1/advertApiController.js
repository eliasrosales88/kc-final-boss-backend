const AdvertManager = require("../../managers/advertManager");
const connectionPromise = require("../../lib/connectAMQP");
const fs = require("fs");
const path = require("path");

const publisher = require("../../queue/publisher");
const queueName = "setImages";

class AdvertApiController {

  async delete(req, res, next) {
    let query;
    const body = req.body;
    try {
      query = await AdvertManager.findByIdAndRemove(body._id);

      res.json({ ok: true, result: query });
    } catch (error) {
      throw new Error(error);
    }
    
  }

  async update(req, res, next) {
    try {
      const body = req.body;
      console.log("BODY UPDATE", body);
      console.log("QUERY UPDATE", req.query);
      console.log("PARAMS UPDATE", req.params);

      body.tags = body.tags.split(",");

      if (req.file) {
        console.log("REQ FILE ------------------");
        console.log(
          "START READING WRITING FILE!!-----------------------------------||"
        );
        //Paste image in public path
        const writeFilePromise = new Promise((resolve, reject) => {
          fs.createReadStream("./uploads/" + req.file.filename).pipe(
            fs
              .createWriteStream(
                path.join(__dirname,
                  "./public/images/adverts/" +
                  req.file.filename +
                  "_" +
                  req.file.originalname
                )
              )
              .on("finish", () => {
                resolve();
              })
          );
        });

        await writeFilePromise;
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

        body.photo = req.file.filename + "_" + req.file.originalname;

        let advert = await AdvertManager.findByIdAndUpdate(body);
        console.log("RESULT ADVERT", advert);
        console.log("ENCOLANDO IMAGEN!!-----------------------------------||");
        // PUBLISHER
        publisher
          .publishIMGPath(queueName, connectionPromise, imagePath)
          .catch(err => {
            console.log("Hubo un error:", err);
          });

        res.json({ ok: true, result: advert });
      } else {
        let advert = await AdvertManager.findByIdAndUpdate(body);
        console.log("RESULT ADVERT", advert);
        res.json({ ok: true, result: advert });
      }

      //--------------------------------------------------
    } catch (error) {
      throw new Error(error);
    }
  }

  async findById(req, res, next) {
    const _id = req.query._id;

    try {
      let advert = await AdvertManager.findById(_id);
      res.json({ ok: true, result: advert });
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
    filters = AdvertManager.getFilters(req, filters);
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
      const body = req.body;
      body.tags = body.tags.split(",");

      if (req.file) {
        console.log("REQ FILE ------------------");
        console.log(
          "START READING WRITING FILE!!-----------------------------------||"
        );
        //Paste image in public path
        const writeFilePromise = new Promise((resolve, reject) => {
          fs.createReadStream(path.join(
            __dirname,
            "../../uploads/" + req.file.filename)).pipe(
            fs
              .createWriteStream(
                 path.join(__dirname, 
                  "/../../public/images/adverts/") +
                  req.file.filename +
                  "_" +
                  req.file.originalname
              )
              .on("finish", () => {
                resolve();
              })
          );
        });
        
        try {
          console.log("BEFORE writeFilePromise");
          await writeFilePromise;
          console.log("AFTER writeFilePromise");
          
        } catch (error) {
          console.log("Error creating temporary image file", error);
          throw error;
        }
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

        body.photo = req.file.filename + "_" + req.file.originalname;

        // Defining  advert to save in DB
        const advertTosave = {
          name: body.name,
          description: body.description,
          price: parseInt(body.price),
          photo: req.file.filename + "_" + req.file.originalname,
          forSale: JSON.parse(body.forSale),
          tags: body.tags,
          owner: body.owner,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        // Save in DB
        await AdvertManager.save(advertTosave);

        // PUBLISHER
        publisher
          .publishIMGPath(queueName, connectionPromise, imagePath)
          .catch(err => {
            console.log("Error publishing image to queue:", err);
          });

        // Send response
        res.json({ success: true, result: advertTosave });
      } else {
        // Defining  advert to save in DB
        const advertTosave = {
          name: body.name,
          description: body.description,
          price: parseInt(body.price),
          photo: req.file.filename + "_" + req.file.originalname,
          forSale: JSON.parse(body.forSale),
          tags: body.tags,
          owner: body.owner,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        // Save in DB
        await AdvertManager.save(advertTosave);
        // Send response
        res.json({ success: true, result: advertTosave });
      }
    } catch (error) {
      console.log("Create advert error", error);
      res.json({ success: false });
    }
  }
}

module.exports = new AdvertApiController();
