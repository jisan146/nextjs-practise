
/************Start  Basic Configuration *********************/
const express = require('express')
const app = express()

const os = require("os"); // Comes with node.js
var osName = os.type()

if (osName.toLowerCase().indexOf('dows') >= 0) {
  app.listen(2022);
} else {
  app.listen(2000);
}



app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
const bytenode = require('bytenode');
const fetch = require('node-fetch');
/************End  Basic Configuration *********************/

/********** Start System Engine  ***********/
allApi = require('./engine/engineApi')(app);
allApi = require('./server_business_api')(app);
//allApi = require('./engine/zoom/index');
/********** Stop System Engine  ***********/




var globalVariable = require('./engine/globalVariable');


app.post(globalVariable.apiRewrite + '/notification', function (req, res, next) { res.send('<h1>hello</h1>') })








app.get(globalVariable.apiRewrite + '/test/:uid/:pass', function (req, res, next) {
  // res.send('<h1>hello</h1>')

  if (req.params.uid == '100') {
    res.send('{"name":"John", "age":30, "car":null}')
  } else {
    res.send('uid not match')
  }



})







