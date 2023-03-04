require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var passport = require("passport");
var session = require("express-session");
var cookieParser = require("cookie-parser");

require("dotenv").config();
var SQLiteStore = require("connect-sqlite3")(session);

// Import routes for database
const users = require("./routes/userRoutes.js")
const restaurants = require("./routes/restaurantRoutes.js")
const orders = require("./routes/orderRoutes.js")
const products = require("./routes/productRoutes.js")
//express app (can set any 'app')
const app = express();

//Middleware
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.locals.pluralize = require("pluralize");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Define that we user passport
app.use(passport.initialize());
app.use(
  session({
    secret: "keyboard cat",
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    store: new SQLiteStore({ db: "sessions.db", dir: "." }),
  })
);

app.use(passport.authenticate("session"));
app.use(function (req, res, next) {
  var msgs = req.session.messages || [];
  res.locals.messages = msgs;
  res.locals.hasMessages = !!msgs.length;
  req.session.messages = [];
  next();
});

app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});




// APIs Routes
const router = express.Router();
app.use("/", router);

//Creating an api routes
router.route("/").get((req, res) => {
  res.send({ message: "YOUR EXPRESS BACKEND IS CONNECTED TO RESTAURANT APP" });
});

// Get all router from file "userRoutes.js" 
app.use("/api/users", users);
// Get all router from file "restaurantRoutes.js" 
app.use("/api/restaurants", restaurants);
// Get all router from file "orderRoutes.js" 
app.use("/api/orders", orders);
// Get all router from file "productRoutes.js" 
app.use("/api/products", products);




// Create and set PORT for app to listen (See /backend/.env)
const PORT = process.env.PORT || 8080;
// Conection for mongo DB
const uri = process.env.ATLAS_URI;

// Connect to MongoDB through Mongoose using the above uri
mongoose.connect(uri)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on ${PORT}`);
    });
  })
  .catch((error) => { console.log(error) })


const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB db conection success");
})
