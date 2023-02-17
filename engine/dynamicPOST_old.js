
var mysql = require('../dbConfig/mysql');
var oracle = require('../dbConfig/oracle');
var gv = require('./globalVariable');
const oracledb = require('oracledb');
var apiSecurity = require('./apiSecurity');
const fs = require('fs');
var uuid = require('uuid');
var gloDBconn = require('./gloDBconn');
var globalLog = require('./globalLog');


module.exports = function (app) {

    const path = require('path');
    let rootLoc = path.join(__dirname, '../');


    app.post(gv.apiRewrite + '/req', function (req, res, next) {

        if (apiSecurity.authentication(req.headers.user_id, apiSecurity.orgID(req.headers.user_id)) != req.headers.token) {
            req.connection.destroy();
        } else {


            var chkParm = [], chkQuery = [];

           
           
            chkQuery[0] = "select col_name from application_ui_info where table_name=_p_ and input_type='date'";
            chkParm.push([req.body[1].tbl])
            var dbCol = Object.keys(req.body[0]), insCol = "", colData = "", MysqlQuery, OracleQuery, slGen = "";

            gloDBconn.get_info(chkQuery, chkParm, function (dateCol) {
                if (dateCol == "error") {
                    req.connection.destroy();
                } else {

                   

                    var chkDateCol=[]
                    for(var i=0;i<dateCol[0].length;i++)
                    {
                        chkDateCol[i]=dateCol[0][i].col_name
                    }
                  
                  
                    var query = [], parm = [], tempQuery, querySl = 0, dynamicQuery = [], dataInsParmSL = 0;

                    querySl = 0;
                    query[querySl] = gv.dbSyntex["transaction"][gv.DB];
                    parm.push([])

                    querySl = querySl + 1
                    query[querySl] = " update application_sl_generator set sl_generator=sl_generator+1  where lower(table_name)='" + req.body[1].tbl + "' and lower(col_name)='" + dbCol[0] + "'  and org_id='" + apiSecurity.orgID(req.headers.user_id) + "' and branch='" + apiSecurity.branch(req.headers.user_id) + "'";
                    parm.push([])
                    parm.push([])


                    for (var i = 0; i < dbCol.length - 1; i++) {
                        insCol = insCol + "" + dbCol[i] + ","


                        if (i == 0) {

                            colData = colData + "(select concat(concat('" + apiSecurity.orgID(req.headers.user_id) + "','" + apiSecurity.branch(req.headers.user_id) + "'),sl_generator ) sl from application_sl_generator where lower(table_name)='" + req.body[1].tbl + "' and lower(col_name)='" + dbCol[i] + "' and org_id='" + apiSecurity.orgID(req.headers.user_id) + "' and branch='" + apiSecurity.branch(req.headers.user_id) + "'),";



                        }
                        else {


                            if (dbCol[i] == req.body[2].file) {
                           
                               if(req.body[0][dbCol[i]].length>0)
                               {
                                fileSave()
                                colData = colData + "_p_,"
                                dataInsParmSL = dataInsParmSL + 1
                                parm[2][dataInsParmSL] = fileName;
                                
                               }else
                               {
                              
                                colData = colData + "_p_,"
                                dataInsParmSL = dataInsParmSL + 1
                                parm[2][dataInsParmSL] = '';
                               }
                               

                            }
                            else {

                             

                                if (req.body[0][dbCol[i]] == '' || req.body[0][dbCol[i]] == null) {
                                    colData = colData + "_p_,"
                                    dataInsParmSL = dataInsParmSL + 1
                                    parm[2][dataInsParmSL] = null;


                                } else {

                                    if(chkDateCol.indexOf(dbCol[i])>=0)
                                    {
                                        colData = colData +gv.toDate(req.body[0][dbCol[i]])+","
                                        
                                    }else
                                    {
                                        colData = colData + "_p_,"
                                        dataInsParmSL = dataInsParmSL + 1
                                        parm[2][dataInsParmSL] = req.body[0][dbCol[i]];
                                    }
                                   
                                }

                            }

                        }
                    }



                    insCol = insCol + "" + dbCol[dbCol.length - 1] + ","
                    insCol = insCol + "" + "org_id" + ","
                    insCol = insCol + "" + "branch" + ","
                    insCol = insCol + "" + "dml_by" + ","
                    if (dbCol[dbCol.length - 1] == req.body[2].file) {

                        if(req.body[0][dbCol[dbCol.length - 1]].length>0)
                        {
                            fileSave()
                            colData = colData + "_p_,"
                            
                            dataInsParmSL = dataInsParmSL + 1
                            parm[2][dataInsParmSL] =  fileName;
                          
                        }else
                        {
                           
                            colData = colData + "_p_,"
                            
                            dataInsParmSL = dataInsParmSL + 1
                            parm[2][dataInsParmSL] =  '';
                        }


                       

                    }
                    else {
                        if (req.body[0][dbCol[i]] == '' || req.body[0][dbCol[i]] == null) {
                            colData = colData + "_p_,"


                            dataInsParmSL = dataInsParmSL + 1
                            parm[2][dataInsParmSL] = null;


                        } else {

                            if(chkDateCol.indexOf(dbCol[dbCol.length - 1])>=0)
                            {
                                colData = colData +gv.toDate(req.body[0][dbCol[dbCol.length - 1]])+","
                            }
                            else
                            {
                                colData = colData + "_p_,"
                                dataInsParmSL = dataInsParmSL + 1
                                parm[2][dataInsParmSL] = req.body[0][dbCol[dbCol.length - 1]];
                            }

                           
                        }

                    }

                    colData = colData + "_p_,"

                    dataInsParmSL = dataInsParmSL + 1
                    parm[2][dataInsParmSL] = apiSecurity.orgID(req.headers.user_id);

                    colData = colData + "_p_,"
                    dataInsParmSL = dataInsParmSL + 1
                    parm[2][dataInsParmSL] = apiSecurity.branch(req.headers.user_id);

                    colData = colData + "_p_,"
                    dataInsParmSL = dataInsParmSL + 1
                    parm[2][dataInsParmSL] = req.headers.user_id;


                    insCol = insCol + "" + "dml_time" + ""
                    colData = colData + gv.dbSyntex['time'][gv.DB]





                    querySl = querySl + 1
                    query[querySl] = "insert into " + req.body[1].tbl + " (" + insCol + ") values" + " (" + colData + ")";



                    parm[2].splice(0, 1);

                    querySl = querySl + 1
                    query[querySl] = " select concat(concat('" + apiSecurity.orgID(req.headers.user_id) + "','" + apiSecurity.branch(req.headers.user_id) + "'),sl_generator ) sl from application_sl_generator where lower(table_name)='" + req.body[1].tbl + "' and lower(col_name)='sl' and org_id='" + apiSecurity.orgID(req.headers.user_id) + "' and branch='" + apiSecurity.branch(req.headers.user_id) + "'";
                    parm.push([])

                  
                   
                
                    gloDBconn.get_info(query, parm, function (result) {
                        if (result == "error") {
                            req.connection.destroy();
                        } else {

                          
                            globalLog.saveLog(result[3][0],"","", req.body[1].tbl,apiSecurity.orgID(req.headers.user_id),apiSecurity.branch(req.headers.user_id),req.headers.user_id,'insert','value') 
                            res.send('')
                        }
                    })

                }
            })

        }
        /***/
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


    });





};