var mysql = require('../dbConfig/mysql');
var oracle = require('../dbConfig/oracle');
var globalVariable = require('./globalVariable');
const oracledb = require('oracledb');
var apiSecurity = require('./apiSecurity');
const fs = require('fs');
var uuid = require('uuid');


module.exports = function (app) {
    app.put(globalVariable.apiRewrite + '/dynamicTabularData', function (req, res, next) {
        var tabularData = req.body[0].data, queryBatch = [], queryBatchparm = [], parm = [];

        for (var i = 0; i < tabularData.length; i++) {
            var dbCol = Object.keys(tabularData[i])
            for (var j = 0; j < dbCol.length; j++) {
                if (dbCol[j] != "sl" && j == 0) {
                    var query = " update " + req.body[1].tbl + " set " + dbCol[j] + "= _p_ , dml_by='"+req.headers.user_id+"' , dml_time=current_timestamp where sl=_p_"

                    queryBatchparm.push(tabularData[i][dbCol[j]])
                    queryBatchparm.push(tabularData[i][dbCol[j + 1]])


                    if (globalVariable.DB == "oracle") {


                        for (var l = 1; l <= queryBatchparm.length; l++) {
                            query = query.replace('_p_', ":p" + l)

                        }
                        parm.push(queryBatchparm)
                        queryBatchparm = []
                        queryBatch.push(query)

                    } else {
                        for (var l = 1; l <= queryBatchparm.length; l++) {
                            query = query.replace('_p_', "?")

                        }
                        parm.push(queryBatchparm)
                        queryBatchparm = []
                        queryBatch.push(query)
                    }


                } else { break; }

            }

        }



        if (globalVariable.DB == "oracle") {



            async function run() {
                let connection;
                connection = await oracledb.getConnection(oracle);
                try {
                    for (var o = 0; o < queryBatch.length; o++) {

                        const result = await connection.execute(
                            queryBatch[o], parm[o], { outFormat: oracledb.OUT_FORMAT_OBJECT }
                        );
                    }

                    const commit = await connection.execute(
                        "commit", [], { outFormat: oracledb.OUT_FORMAT_OBJECT }
                    );

                    res.send("Request Received")
                } catch (err) { console.error(err); req.connection.destroy(); }
                finally { if (connection) { try { await connection.close(); } catch (err) { console.error(err); req.connection.destroy(); } } }
            }
            run();


        } else {
            var mysqlQuery = "START TRANSACTION; ", mysqlParm = [];
            for (var m = 0; m < queryBatch.length; m++) {
                mysqlQuery = mysqlQuery + " " + queryBatch[m] + "; "


                for (var n = 0; n < parm[m].length; n++) {
                    mysqlParm.push(parm[m][n])

                }
            }

            mysqlQuery = mysqlQuery + " commit;"

            // var  sql = mysql.format(mysqlQuery, mysqlParm);
            //console.log(sql);

            mysql.query(mysqlQuery, mysqlParm, function (err, result, fields) {
                if (err) {
                    console.log(err);
                    req.connection.destroy();
                } else {

                    res.send("Request Received")
                }

            });

        }



    })
};