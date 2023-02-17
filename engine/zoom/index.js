require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const crypto = require('crypto')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 4000
var fs = require('fs');
var path = require('path');
var privateKey = fs.readFileSync('D:/project/cto/serverSide/engine/sslKey/ssl/private.key', 'utf8');
var certificate = fs.readFileSync('D:/project/cto/serverSide/engine/sslKey/ssl/certificate.crt', 'utf8');
var credentials = {
  key: privateKey,
  cert: certificate
};

app.use(bodyParser.json(), cors())
app.options('*', cors());

app.post('/', (req, res) => {

 
  console.log(  "VtKSy8ivSZSBpYrMRP1Xyw" )

  const timestamp = new Date().getTime() - 30000
  const msg = Buffer.from( "VtKSy8ivSZSBpYrMRP1Xyw" + req.body.meetingNumber + timestamp + req.body.role).toString('base64')
  const hash = crypto.createHmac('sha256', "LmeMUsE2ci0PXfa6Hv9XWx1S3JDULSXZN99n").update(msg).digest('base64')
  const signature = Buffer.from(`${ "VtKSy8ivSZSBpYrMRP1Xyw"}.${req.body.meetingNumber}.${timestamp}.${req.body.role}.${hash}`).toString('base64')

  res.json({
    signature: signature
  })
})
var https = require('https').Server(credentials, app);
https.listen(port, () => {

  console.log('Server Listening on ' + port);

})
//app.listen(port, () => console.log(`Zoom Web Meeting SDK Sample Signature Node.js on port ${port}!`))
