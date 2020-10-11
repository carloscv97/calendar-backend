
const express          = require('express');
var cors               = require('cors')
const { dbConnection } = require('./database/config');
require('dotenv').config();

/**
 *  Create Express Server
 */
const app = express();

/**
 *  Mongo Data Base
 */
dbConnection();

/**
 *  CORS Security Cap
 */
app.use( cors() );

/**
 *  Public Directory
 */
app.use( express.static('public') );

/**
 *  Read and parse of body
 */
app.use( express.json() );

/**
 *  Routes Path
 */
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

/**
 *  Listen Requests
 */
app.listen( process.env.PORT, () => {
   console.log(`Server running on port: ${ process.env.PORT }`);
});
