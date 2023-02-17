
var mysql = require('../dbConfig/mysql');
var oracle = require('../dbConfig/oracle');
var globalVariable = require('./globalVariable');
const oracledb = require('oracledb');
var apiSecurity = require('./apiSecurity');


module.exports = function (app) {




    app.put(globalVariable.apiRewrite + '/req', function (req, res, next) {

        if (apiSecurity.authentication(req.headers.user_id, apiSecurity.orgID(req.headers.user_id)) != req.headers.token) {
            req.connection.destroy();
        } else {


            var editQuery  = "SELECT update_query FROM application_menu_pages where query_id='" + req.body[2].query_id+ "'";

          

            if (globalVariable.DB == "oracle") {
                /*** Oracle DB Start*/
                async function run() {

                    let connection;
                   
                    try {
                        connection = await oracledb.getConnection(oracle);
                        const result = await connection.execute(
                            editQuery, [], { outFormat: oracledb.OUT_FORMAT_OBJECT }
                        );
                      
                        const exeEditQuery = await connection.execute(
                            result.rows[0].UPDATE_QUERY+"'"+req.body[2].sl+"'", [], { outFormat: oracledb.OUT_FORMAT_OBJECT }
                        );
                        
                        
                        res.send(OracleMultiQueryResultCombine(exeEditQuery.rows))

                    } catch (err) { console.error(err); req.connection.destroy()}

                    finally { if (connection) { try { await connection.close(); } catch (err) { console.error(err);req.connection.destroy() } } }
                }

                run();

                function OracleMultiQueryResultCombine(result) { 


                    /* json object key to lower start */
    
                    var fianlResult = [];
                    for (var i = 0; i < result.length; i++) {
                        var dbObj = result[i]
                        function mapLower(obj, mapFunc) {
                            return Object.keys(obj).reduce(function (result, key) {
                                result[mapFunc(key)] = obj[key]
                                return result;
                            }, {})
                        }
                        var newObj = mapLower(dbObj, function (field) {
                            return field.toLowerCase();
                        })
                        var resObj = []
                        resObj.push(newObj)
                        fianlResult.push(resObj[0])
    
                        /* json object key to lower end */
                    }
    
                    return fianlResult;
                }

                /*** Oracle DB END */
            }
            else {
                /*** MySQL DB Start*/
                mysql.query(editQuery, [], function (err, result, fields) {
                    if (err) {
                        console.log(err);
                        req.connection.destroy();
                    } else {
                       
                        MysqlMultiQueryExec(result[0].update_query+"'"+req.body[2].sl+"'")

                       
                    }

                });
                /*** MySQL DB END*/
            }

            function MysqlMultiQueryExec(result) {

                mysql.query(result, function (err, result, fields) {
                    if (err) {
                        console.log(err); req.connection.destroy();
                    } else {

                        res.send(result)
                    }

                });


            }



        }

    });





};