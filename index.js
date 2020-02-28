const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const keys = require('./config/keys');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

const app = express();

app.use(bodyParser.json())

app.use(cookieParser(keys.cookieKey));
app.use(
  session({
    secret: keys.cookieKey,
    cookie: {
      expires: false
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app)

const PORT = process.env.PORT || 3150;

app.listen(PORT);
