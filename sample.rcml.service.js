var express = require('express') ;
var bodyParser = require('body-parser');
var util = require('util') ;
var log4js = require('log4js');
var builder = require('xmlbuilder');

var log = log4js.getLogger();
log.level = 'trace';
var app = express();
app.use(bodyParser());


log.info("Appliocation starting ...") ;
log.info("Application current log level = " + log.level);
log.info("Initiating the DataBase Connection");



var normalizeInput = function(input) {
    var inputBadCharsRegex = /(\s+)|;|\||\*|(|)|"|'|&/g; // black listed char collectin
    return input.replace(inputBadCharsRegex, '') ;
} ;


statusCallback=function(req ,resp){
   log.trace("Call status update request")  ;
   log.trace("req.params ->" + util.inspect(req.params));
   log.trace("req.query ->" + util.inspect(req.query));
   resp.status(200).send();
};

dtmf=function(req ,resp){
   log.trace("DTMF...")  ;
   log.trace("req.params ->" + util.inspect(req.params));
   log.trace("req.query ->" + util.inspect(req.query));
   log.trace("req.body  ->" + util.inspect(req.body));
   resp.status(200).send();
};

generateRCML=function(req, resp){
   log.trace("Got RCML ..")  ;
   log.trace("req.params ->" + util.inspect(req.params));
   log.trace("req.query ->" + util.inspect(req.query));
   var rcml = builder.create('Response').dec('1.0', 'UTF-8');
   rcml.ele('Pause', {'length':'3'}).up();
   rcml = rcml.ele('Gather',{'action':'http://localhost:3215/dtmf', 'method':'POST', 'timeout':'5', 'numDigits':'1'});
   rcml.ele('Say',{'voice':'man', 'languate':'en', 'loop':'1'}, "Hello world").up();

   resp.status(200).send(rcml.end());
}


//Get client key entered during call *Verb Gather RCML*
app.get("/dtmf", dtmf);
app.post("/dtmf", dtmf);

//Get status update from restcomm
app.get("/update", statusCallback);
app.post("/update", statusCallback);

//Give RCML to restcomm
app.get("/rcml", generateRCML);
app.post("/rcml", generateRCML);

//app.prototype.conn = con ;

log.info('Application start listening @ tcp.port = 3215 ...') ;
app.listen("3215") ;
