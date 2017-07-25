
// IMPORTS -----------------------------------------------------------------------
// =============================================================================

let express = require('express');
let bodyParser = require('body-parser');
let initRestApi = require('./api');

// SETUP SERVER AND API -----------------------------------------------------------------------
// =============================================================================

let app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
let port = process.env.PORT || 8080;
let router = express.Router();
app.use('/api', router);
initRestApi(router);
app.listen(port, () => {
    console.log('Magic happens on port ' + port);
});