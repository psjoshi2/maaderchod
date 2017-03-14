var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegex1 = /^\finger$/,
      botRegex2 = /^\FINGER$/,
      botRegex3 = /^\finger!!$/,
      botRegex4 = /^\FINGER!!$/,
      botRegex5 = /^\finger!$/,
      botRegex6 = /^\FINGER!$/;

  if(request.text && (botRegex1.test(request.text) || botRegex2.test(request.text) || botRegex3.test(request.text)
                      || botRegex4.test(request.text) || botRegex5.test(request.text) || botRegex6.test(request.text))
  {
    this.res.writeHead(200);
    postMessage();
    this.res.end();
   } 
   else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}

function postMessage() {
  var botResponse, options, body, botReq;

  botResponse = "INSIDE LARRY!!";

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse,
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}


exports.respond = respond;
