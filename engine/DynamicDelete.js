
var mysql = require('../dbConfig/mysql');
var oracle = require('../dbConfig/oracle');
var gv = require('./globalVariable');
const oracledb = require('oracledb');
var apiSecurity = require('./apiSecurity');
var globalLog = require('./globalLog');
var gloDBconn = require('./gloDBconn');


module.exports = function (app) {




    app.delete(gv.apiRewrite + '/req', function (req, res, next) {

        if (apiSecurity.authentication(req.headers.user_id, apiSecurity.orgID(req.headers.user_id)) != req.headers.token) {
            req.connection.destroy();
        } else {



            var query = [], parm = [], querySl = 0;

            querySl = 0;
            query[querySl] = gv.dbSyntex["transaction"][gv.DB];
            parm.push([])

            querySl =querySl + 1
            query[querySl] = "select * from " + req.body.container + " where sl=_p_ and org_id=_p_ and branch=_p_";
            parm.push([req.body.delSL, apiSecurity.orgID(req.headers.user_id), apiSecurity.branch(req.headers.user_id)])

            querySl =querySl + 1
            query[querySl] = "delete from " + req.body.container + " where sl=_p_ and org_id=_p_ and branch=_p_";
            parm.push([req.body.delSL, apiSecurity.orgID(req.headers.user_id), apiSecurity.branch(req.headers.user_id)])
    
         

         
    
            gloDBconn.get_info(query, parm, function (result) {
                if (result == "error") {
                    req.connection.destroy();
                } else {

                 

                    
    globalLog.saveLog(result[1][0],"","",req.body.container,apiSecurity.orgID(req.headers.user_id),apiSecurity.branch(req.headers.user_id),req.headers.user_id,'delete','value') 
                    
    
                   res.send('');
    
                }
            })


        /*    var editQuery = "delete from " + req.body.container + " where sl=" + req.body.delSL;



            if (gv.DB == "oracle") {
             
                async function run() {

                    let connection;

                    try {
                        connection = await oracledb.getConnection(oracle);

                        const odl_data = await connection.execute(
                            "select * from "+req.body.container+" where sl='" + req.body.delSL + "'",[], { outFormat: oracledb.OUT_FORMAT_OBJECT }
                        );
                        globalLog.saveLog(odl_data.rows,"","",req.body.container,apiSecurity.orgID(req.headers.user_id),apiSecurity.branch(req.headers.user_id),req.headers.user_id,'delete','value') 

                        const result = await connection.execute(
                            editQuery, [], { outFormat: oracledb.OUT_FORMAT_OBJECT }
                        );
                        const commit = await connection.execute(
                            "commit", [], { outFormat: oracledb.OUT_FORMAT_OBJECT }
                        );
                        res.send("Request Received")

                    } catch (err) { console.error(err); req.connection.destroy(); }

                    finally { if (connection) { try { await connection.close(); } catch (err) { console.error(err); req.connection.destroy(); } } }
                }

                run();
              
            }
            else {
             

                mysql.query( "select * from "+req.body.container+" where sl='" + req.body.delSL + "'", [], function (err, result2, fields) {
                    if (err) {
                        console.log(err);
                       
                    } else {
                        globalLog.saveLog(result2,"","",req.body.container,apiSecurity.orgID(req.headers.user_id),apiSecurity.branch(req.headers.user_id),req.headers.user_id,'delete','value') 
                        
                       
                    }

                });


                mysql.query(editQuery, [], function (err, result, fields) {
                    if (err) {
                        console.log(err);
                        req.connection.destroy();
                    } else {

                        res.send("Request Received")
                    }

                });
               
            }


*/

        }

    });





};