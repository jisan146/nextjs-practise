module.exports = function (app) {
/********** Start System Engine  ***********/
const bytenode = require('bytenode');
const bodyparser = require('body-parser')
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,user_id,token,QueryID");
    next();
  });

allApi = require('./login')(app);
allApi = require('./ScriptGenarator')(app);
allApi = require('./scriptMigrate')(app);
allApi = require('./dynamicUI')(app);
allApi = require('./Dynamic')(app);
allApi = require('./dynamicTableQuery')(app);
allApi = require('./dynamicPUT')(app);
allApi = require('./accessControl')(app);
allApi = require('./DynamicDelete')(app);
allApi = require('./dynamicPutUpd')(app);
allApi = require('./dynamicUserFiles')(app);
allApi = require('./dynamicTabularDataPut')(app);
allApi = require('./globalApi')(app);
allApi = require('.././dbConfig/oracleConnTest')(app);
/********** Stop System Engine  ***********/
};