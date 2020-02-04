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

const app = express();

// BORRAR
const indexRouter = require("./routes/index");

/***************
 SWAGGER CONFIG
 ***************/
const swaggerDocs = swaggerJsDocs(config.swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

/**
 * @swagger
 * /customers:
 *  get:
 *    description: Get all users
 *    responses:
 *      '200':
 *        description: Success
 */
app.get("/customers", (req, res) => {
  console.log("request");
  res.status(200).send("Customers");
});

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

app.use("/", indexRouter);

/***************
 API CONTROLLERS
 ***************/
const registerApiController = require("./controllers/apiv1/registerApiController");
const loginApiController = require("./controllers/apiv1/loginApiController");

/***************
 API ENDPOINTS
 ***************/
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
  registerApiController.add
);

app.post("/apiv1/authenticate", loginApiController.loginJWT);






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
  res.render("error");
});

module.exports = app;
