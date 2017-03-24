/**
 * Created by nitesh on 3/24/17.
 */

var express = require('express');
var bodyParser = require('body-parser');
var googleAuth = require('./auth/google-auth');
var google = require('googleapis');
var plus = google.plus('v1');
var app = express();
var http = require('http').Server(app);
var port = 8214;
const Assistant = require('actions-on-google').ApiAiAssistant;
app.use(bodyParser.json());

app.post('/api/receiver', function(req, res) {
    const assistant = new Assistant({request: req, response: res});
    console.log(req.body);
    console.log('User Token', assistant.getUser().access_token);
    getUserEmail(assistant.getUser().access_token);
    res.json({
        speech: "Barack Hussein Obama II is the 44th and current President of the United States."
    });
});

function getUserEmail(accessToken) {
    googleAuth.client.setCredentials({
        access_token: accessToken
    });
    plus.people.get({
        userId: 'me',
        auth: googleAuth.client
    }, function (err, user) {
        console.log('Error', err);
        console.log('Response', user.id);
    });
}

http.listen(port, function(){
    console.log('listening on *:' + port);
});


//app.use('/harmony/cloudapi', require('./harmony-cloud/index'));