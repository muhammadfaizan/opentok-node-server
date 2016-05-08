"use strict";

// Dependencies
let express = require('express'),
  OpenTok = require('opentok'),
  config = require('./config/config');
// Verify that the API Key and API Secret are defined
let apiKey = config.get("tokbox.API_KEY"),
    apiSecret = config.get("tokbox.API_SECRET");
if (!apiKey || !apiSecret) {
    console.log('You must specify API_KEY and API_SECRET environment variables');
    process.exit(1);
}

// Initialize the express app
let app = express();
app.use(express.static(__dirname + '/public'));

// Initialize OpenTok
var opentok = new OpenTok(apiKey, apiSecret);

// Create a session and store it in the express app
opentok.createSession(function(err, session) {
    if (err) throw err;
    app.set('sessionId', session.sessionId);
    // We will wait on starting the app until this is done
    init();
});

app.get('/', function(req, res) {
    var sessionId = app.get('sessionId'),
    // generate a fresh token for this client
        token = opentok.generateToken(sessionId);

    res.render('index.ejs', {
        apiKey: apiKey,
        sessionId: sessionId,
        token: token
    });
});

// var appEnv = cfenv.getAppEnv();
// Start the express app
function init() {
    app.listen(process.env.VCAP_APP_PORT  || /* appEnv.port || */config.get('server.port'), function() {
        console.log('You\'re app is now ready at ' /*appEnv.url*/);
    });
}
