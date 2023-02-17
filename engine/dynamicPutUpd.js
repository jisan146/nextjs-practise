var mysql = require('../dbConfig/mysql');
var oracle = require('../dbConfig/oracle');
var gv = require('./globalVariable');
var globalLog = require('./globalLog');
const oracledb = require('oracledb');
var apiSecurity = require('./apiSecurity');
var gloDBconn = require('./gloDBconn');
var uuid = require('uuid');
const fs = require('fs');

module.exports = function (app) { 

    const path = require('path');
    let rootLoc = path.join(__dirname, '../');


    app.put(gv.apiRewrite + '/reqUpd', function (req, res, next) {

        if (apiSecurity.authentication(req.headers.user_id, apiSecurity.orgID(req.headers.user_id)) != req.headers.token) {
            req.connection.destroy();
        } else {


            var chkParm = [], chkQuery = [];

            chkQuery[0] = "select col_name from application_ui_info where table_name=_p_ and input_type='date'";
            chkParm.push([req.body[1].tbl])
            // var dbCol = Object.keys(req.body[0]), insCol = "", colData = "", MysqlQuery, OracleQuery, slGen = "";

            gloDBconn.get_info(chkQuery, chkParm, function (dateCol) {
                if (dateCol == "error") {
                    req.connection.destroy();
                } else {



                    var chkDateCol = []
                    for (var i = 0; i < dateCol[0].length; i++) {
                        chkDateCol[i] = dateCol[0][i].col_name
                    }

                    var dbCol = Object.keys(req.body[0]), query = "", colData = "";


                    var query = [], parm = [], tempQuery, querySl = 0, dynamicQuery = [], dataInsParmSL = 0;

                    querySl = 0;
                    query[querySl] = gv.dbSyntex["transaction"][gv.DB];
                    parm.push([])

                    querySl = querySl + 1
                    query[querySl] = "select * from " + req.body[1].tbl + " where sl=_p_ and org_id=_p_ and branch=_p_";
                    parm.push([req.body[0].sl, apiSecurity.orgID(req.headers.user_id), apiSecurity.branch(req.headers.user_id)])

                    querySl = querySl + 1
                    query[querySl] = "update " + req.body[1].tbl + " set "
                    parm.push([])


                    for (var i = 0; i < dbCol.length - 1; i++) {

                        if (chkDateCol.indexOf(dbCol[i]) >= 0) {


                            query[querySl] = query[querySl] + dbCol[i] + " = " + gv.toDate(req.body[0][dbCol[i]]) + ","


                        } else {

                            if (dbCol[i] == req.body[2].file) {

                                if (req.body[0][dbCol[i]].length > 0) {
                                    fileSave()
                                    query[querySl] = query[querySl] + dbCol[i] + " = _p_,"
                                    dataInsParmSL = dataInsParmSL + 1
                                    parm[querySl][dataInsParmSL] = fileName;
                                }
                            } else {
                                query[querySl] = query[querySl] + dbCol[i] + " = _p_,"
                                dataInsParmSL = dataInsParmSL + 1
                                parm[querySl][dataInsParmSL] = req.body[0][dbCol[i]];
                            }




                        }



                    }


                    if (chkDateCol.indexOf(dbCol[i]) >= 0) {




                        query[querySl] = query[querySl] + dbCol[dbCol.length - 1] + " = " + gv.toDate(req.body[0][dbCol[dbCol.length - 1]]) + ""


                    } else {

                        if (dbCol[dbCol.length - 1] == req.body[2].file) {

                            if (req.body[0][dbCol[dbCol.length - 1]].length > 0) {
                                fileSave()
                                query[querySl] = query[querySl] + dbCol[dbCol.length - 1] + " = _p_"
                                dataInsParmSL = dataInsParmSL + 1
                                parm[querySl][dataInsParmSL] = fileName;
                            }
                        } else {
                            query[querySl] = query[querySl] + dbCol[dbCol.length - 1] + " = _p_"
                            dataInsParmSL = dataInsParmSL + 1
                            parm[querySl][dataInsParmSL] = req.body[0][dbCol[dbCol.length - 1]];
                        }


                    }



                    query[querySl] = query[querySl] + ", dml_by='" + req.headers.user_id + "', dml_time=current_timestamp where sl=_p_"
                    dataInsParmSL = dataInsParmSL + 1
                    parm[querySl][dataInsParmSL] = req.body[0].sl;
                    parm[querySl].splice(0, 1);

                    querySl = querySl + 1
                    query[querySl] = "select * from " + req.body[1].tbl + " where sl=_p_ and org_id=_p_ and branch=_p_";
                    parm.push([req.body[0].sl, apiSecurity.orgID(req.headers.user_id), apiSecurity.branch(req.headers.user_id)])


                    gloDBconn.get_info(query, parm, function (result) {
                        if (result == "error") {
                            req.connection.destroy();
                        } else {


                            globalLog.saveLog(result[1][0], "", "", req.body[1].tbl, apiSecurity.orgID(req.headers.user_id), apiSecurity.branch(req.headers.user_id), req.headers.user_id, 'update', 'old value')

                            globalLog.saveLog(result[3][0], "", "", req.body[1].tbl, apiSecurity.orgID(req.headers.user_id), apiSecurity.branch(req.headers.user_id), req.headers.user_id, 'update', 'new value')

                            res.send('')
                        }
                    })
                }
            })



            var fileName = ''
            function fileSave() {
                try {
                    let base64String = req.body[0][req.body[2].file];
                    let base64Image = base64String
                        .split(';base64,')
                        .pop();
                    var ext = req.body[3].fileEXT.substr(req.body[3].fileEXT.lastIndexOf('.') + 1);

                    fileName = uuid.v1() + '.' + ext



                    if (!fs.existsSync(rootLoc + '/userFiles/orgAssets/' + apiSecurity.orgID(req.headers.user_id) + '/')) {
                        fs.mkdirSync(rootLoc + '/userFiles/orgAssets/' + apiSecurity.orgID(req.headers.user_id) + '/', { recursive: true });
                    }

                    fs.writeFile(rootLoc + '/userFiles/orgAssets/' + apiSecurity.orgID(req.headers.user_id) + "/" + fileName, base64Image, {
                        encoding: 'base64'
                    }, function (err) { });
                } catch (ex) { console.log(ex) }
            }
            /*******/



        }
    });
};