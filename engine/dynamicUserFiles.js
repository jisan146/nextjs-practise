var globalVariable = require('./globalVariable');


module.exports = function (app) {
    app.get(globalVariable.apiRewrite + '/userFiles/:org_id/:user_id/:fName', (req, res) => {

            res.sendFile(__dirname + '/userFiles/files/'+req.params.org_id+'/'+ req.params.user_id+'/'+ req.params.fName)

        

    });
}