// Purpose logic when user sign up 
const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router()
const userSchema = require('../model/userSchema')  // Import file "user.schema.js"
const bcrypt = require("bcrypt");
var passport = require("passport");
var LocalStrategy = require("passport-local");

// =============Passport================
// Reference: github.com/passport/todos-express-password/blob/master/routes/auth.js
// TODO: 1. Add ensure login to guard protected endpoint

/* Configure password authentication strategy.
 *
 * The `LocalStrategy` authenticates users by verifying a username and password.
 * The strategy parses the username and password from the request and calls the
 * `verify` function.
 *
 * The `verify` function queries the database for the user record and verifies
 * the password by hashing the password supplied by the user and comparing it to
 * the hashed password stored in the database.  If the comparison succeeds, the
 * user is authenticated; otherwise, not.
 */
passport.use(new LocalStrategy(async function verify(username, password, cb) {
  const user = await userSchema.findOne({ username: username });
  if (!user){
    return cb(null, false, { message: "Incorrect username or password." }); 
  }
  const isValid = await bcrypt.compare(password, user.password)
  console.log("isValid", isValid);

  if (!isValid){
    return cb(null, false, { message: "Incorrect username or password." });
  }

  return cb(null, user);

}));

/* Configure session management.
 *
 * When a login session is established, information about the user will be
 * stored in the session.  This information is supplied by the `serializeUser`
 * function, which is yielding the user ID and username.
 *
 * As the user interacts with the app, subsequent requests will be authenticated
 * by verifying the session.  The same user information that was serialized at
 * session establishment will be restored when the session is authenticated by
 * the `deserializeUser` function.
 *
 * Since every request to the app needs the user ID and username, in order to
 * fetch todo records and render the user element in the navigation bar, that
 * information is stored in the session.
 */
passport.serializeUser(function(user, cb) {
  console.log("user in serializeUser", user);
  process.nextTick(function() {
    cb(null, {
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
    });
  });
});

passport.deserializeUser(function(user, cb) {
  console.log("user in deserialized", user);
  process.nextTick(function() {
    return cb(null, user);
  });
});


// =============Passport================

// Middleware that is specific to this rounter
router.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
})

router.use((req, res, next) => {
  console.log("Next middleware: ");
  next();
})
router.use((req, res, next) => {
  console.log("req.baseUrl", req.baseUrl);
  next();
})
// GET request, is requesting data from a specified source
router.get('/', (req, res) => {
  res.send({ status: "Done" })
})

/* POST /signup
 *
 * This route creates a new user account.
 *
 * A desired username and password are submitted to this route via an HTML form,
 * which was rendered by the `GET /signup` route.  The password is hashed and
 * then a new user record is inserted into the database.  If the record is
 * successfully created, the user is logged in.
 */
router.post('/signup', async function(req, res, next) {
  const salt = await bcrypt.genSalt();
  // Hash password
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const userData = {
    ...req.body,
    password: hashedPassword,
    salt: salt,
  };
  //Code here if email is the the same return error
  // create user object and store in DB
  userSchema.insertMany(userData, (err, result) => {
    if (err) {
      next(err);
    } else {
      var user = {
        role: req.body.role,
        email: req.body.email,
      };
      // Login the signed up user
      req.login(user, function (err) {
        if (err) {
          return next(err);
        }
        // res.redirect("/");
        res.send(result);
      });
    }
  });
});

/* POST /login/password
 *
 * This route authenticates the user by verifying a username and password.
 *
 * A username and password are submitted to this route via an HTML form, which
 * was rendered by the `GET /login` route.  The username and password is
 * authenticated using the `local` strategy.  The strategy will parse the
 * username and password from the request and call the `verify` function.
 *
 * Upon successful authentication, a login session will be established.  As the
 * user interacts with the app, by clicking links and submitting forms, the
 * subsequent requests will be authenticated by verifying the session.
 *
 * When authentication fails, the user will be re-prompted to login and shown
 * a message informing them of what went wrong.
 */
router.post('/login', passport.authenticate('local', {
  successReturnToOrRedirect: '/api/users/login-success',
  failureRedirect: '/api/users/login-failure',
  failureMessage: true,
  session: true
}));


/* POST /logout
 *
 * This route logs the user out.
 */
router.post('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.send({"success": true, "message": "log out succesfull"});
  });
});

router.get('/login-success', (req, res, next)=>{
  console.log("here is what i return", { success: true, user: req.user });
  res.send({ success: true, user: req.user });
})

//get loggedin
router.get('/is-logged-in', function(req, res){
  console.log("here is what i return", { success: true, user: req.user });
  console.log(req.user)
  res.send({ success: true, user: req.user });
});


router.get('/login-failure', (req, res, next)=>{
  res.send({"success": false})
})

module.exports = router;
