const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const swaggerJsDocs = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const { check } = require("express-validator");
const connectDb = require("./lib/dbConnection");
const config = require("./config");
const cors = require("cors");
const multer = require("multer");
const app = express();

const upload = multer({ dest: 'uploads/' });
app.use(cors());


/***************
 SWAGGER CONFIG
 ***************/
const swaggerDocs = swaggerJsDocs(config.swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

/***************
 MONGODB CONNECTION
 ***************/
connectDb();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));




/***************
 JWT AUTH
 ***************/
const jwtAuth = require("./lib/jwtAuth");


/***************
 API CONTROLLERS
 ***************/
const registerApiController = require("./controllers/apiv1/registerApiController");
const loginApiController = require("./controllers/apiv1/loginApiController");
const advertApiController = require("./controllers/apiv1/advertApiController");
const userApiController = require("./controllers/apiv1/userApiController");

/***************
 API ENDPOINTS
 ***************/
/**
 * @swagger
 * /apiv1/register:
 *  post:
 *    tags: [register]
 *    description: Register user
 *    requestBody:
 *         description: A JSON object containing registration information
 *         required: true
 *         content:
 *            application/json:
 *             schema:      # Request body contents
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *                 password:
 *                   type: string
 *             example:
 *               username: test111
 *               email: test@test.com
 *               password: e12345696 
 *    responses:
 *      '200':
 *        description: OK
 *        content:
 *         application/json:
 *          schema:      # Request body contents
 *            type: object
 *            properties:
 *              success:
 *                type: boolean
 *              message :
 *                type: string
 *              data :
 *                type: object
 *      '400':
 *        description: Bad request.
 *      '401':
 *        description: Unauthorized
 *        content:
 *         application/json:
 *          schema:      # Request body contents
 *            type: object
 *            properties:
 *              success: 
 *                type: boolean
 *              error:
 *                type: string
 *      '404':
 *        description: User not found
 *        content:
 *         application/json:
 *          schema:      # Request body contents
 *            type: object
 *            properties:
 *              success:
 *                type: boolean
 *              error:
 *                type: string
 *      '5XX':
 *        description: Unexpected error.
 */
app.post(
  "/apiv1/register",
  [
    check("username")
      .isLength({ min: 5 })
      .withMessage("Must be at least 5 characters long"),
    check("email")
      .isEmail()
      .withMessage("You need a valid email"),
    check("password")
      .isLength({ min: 8 })
      .withMessage("Must be at least 8 characters long")
  ],
  registerApiController.create,
  loginApiController.loginJWT
);

/**
 * @swagger
 * /apiv1/authenticate:
 *  post:
 *    summary: Login user
 *    tags: [authenticate]
 *    description: Login user
 *    requestBody:
 *      description: A JSON object containing user information
 *      required: true
 *      content:
 *         application/json:
 *          schema:      # Request body contents
 *            type: object
 *            properties:
 *              username:
 *                type: string
 *              password:
 *                type: string
 *          example:
 *            username: test111
 *            password: e12345696 
 *    responses:
 *      '200':
 *        description: OK
 *        content:
 *         application/json:
 *          schema:      # Request body contents
 *            type: object
 *            properties:
 *              success:
 *                type: boolean
 *              token :
 *                type: string
 *      '400':
 *        description: Bad request.
 *      '401':
 *        description: Unauthorized
 *        content:
 *         application/json:
 *          schema:      # Request body contents
 *            type: object
 *            properties:
 *              success: 
 *                type: boolean
 *              error:
 *                type: string
 *      '404':
 *        description: User not found
 *        content:
 *         application/json:
 *          schema:      # Request body contents
 *            type: object
 *            properties:
 *              success:
 *                type: boolean
 *              error:
 *                type: string
 *      '5XX':
 *        description: Unexpected error.
 */
app.post("/apiv1/authenticate", loginApiController.loginJWT);
app.get("/apiv1/adverts", advertApiController.getList);
app.get("/apiv1/advert", advertApiController.findById);
app.get("/apiv1/user", userApiController.findOne);
app.get("/apiv1/userAdvert", advertApiController.getList);
app.get("/apiv1/account", jwtAuth(), advertApiController.getList);
app.get("/apiv1/account/advert", jwtAuth(), advertApiController.findById);
app.post("/apiv1/account/advert", [jwtAuth(), upload.single('photo')],  advertApiController.create);
app.patch("/apiv1/account/advert", [jwtAuth(), upload.single('photo')], advertApiController.update);
app.delete("/apiv1/account/advert", jwtAuth(), advertApiController.delete);

app.patch("/apiv1/account/user", jwtAuth(), userApiController.update);
app.get("/apiv1/account/user", jwtAuth(), userApiController.findOne);
app.delete("/apiv1/account/user", jwtAuth(), userApiController.delete);




/***************
 ERRORS
 ***************/
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({error: err});
});

module.exports = app;
