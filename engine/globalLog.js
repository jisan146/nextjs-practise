var mysql = require('../dbConfig/mysql');
var oracle = require('../dbConfig/oracle');
const oracledb = require('oracledb');
var gv = require('./globalVariable');
var gloDBconn = require('./gloDBconn');
var apiSecurity = require('./apiSecurity');



module.exports = {

    saveLog(APPLICATION_LOG, SCRIPT, API, TABLE_NAME, ORG_ID, BRANCH, DML_BY, OPERATION, SCRIPT_TYPE) {


        var query = [], parm = [], querySl = 0;

            querySl = 0;
            query[querySl] = gv.dbSyntex["transaction"][gv.DB];
            parm.push([])

        

            querySl =querySl + 1
            query[querySl] = " update application_sl_generator set sl_generator=sl_generator+1  where lower(table_name)='application_log' and  lower(col_name)='sl' and org_id=_p_ and branch=_p_";

            parm.push([apiSecurity.orgID(DML_BY),apiSecurity.branch(DML_BY)])

            querySl =querySl + 1
            query[querySl] = "insert into application_log(SL,APPLICATION_LOG,SCRIPT,API,TABLE_NAME,ORG_ID,BRANCH,DML_BY,DML_TIME,OPERATION,SCRIPT_TYPE) values ((select concat(concat(" +ORG_ID + "," + BRANCH + "),sl_generator) sl from application_sl_generator where TABLE_NAME='application_log' and COL_NAME='sl' and org_id="+ORG_ID+" and branch="+BRANCH+"),_p_,_p_,_p_,_p_,_p_,_p_,_p_,current_timestamp,_p_,_p_)";

            parm.push([JSON.stringify(APPLICATION_LOG), SCRIPT, API, TABLE_NAME, ORG_ID, BRANCH, DML_BY, OPERATION, SCRIPT_TYPE])

          

          
    
         

         
    
            gloDBconn.get_info(query, parm, function (result) {
                if (result == "error") {
                   
                } else {

                }})

     /*   var sql = [], parm = [];
        parm[0] = []
        sql[0] = ""; 
        
        sql[1] = "update application_sl_generator set sl_generator=sl_generator+1 where TABLE_NAME='application_log' and COL_NAME='sl' and org_id="+ORG_ID+" and branch="+BRANCH+"";
        parm[1] = []


        sql[2] = "insert into application_log(SL,APPLICATION_LOG,SCRIPT,API,TABLE_NAME,ORG_ID,BRANCH,DML_BY,DML_TIME,OPERATION,SCRIPT_TYPE) values ((select concat(concat(" +ORG_ID + "," + BRANCH + "),sl_generator) sl from application_sl_generator where TABLE_NAME='application_log' and COL_NAME='sl' and org_id="+ORG_ID+" and branch="+BRANCH+"),_p_,_p_,_p_,_p_,_p_,_p_,_p_,current_timestamp,_p_,_p_)";
        parm[2] = [JSON.stringify(APPLICATION_LOG), SCRIPT, API, TABLE_NAME, ORG_ID, BRANCH, DML_BY, OPERATION, SCRIPT_TYPE]

      console.log(parm[2])
        if (gv.DB == "oracle") { 
            async function run() {

                for (var l = 1; l <= parm[1].length; l++) {
                   
                    sql[1] = sql[1].replace('_p_', ":p" + l)

                }
          
                let connection;

                try {
                    connection = await oracledb.getConnection(oracle);
                    for (var i = 1; i < sql.length; i++) {
                        const result = await connection.execute(
                            sql[i], parm[i], { outFormat: oracledb.OUT_FORMAT_OBJECT }
                        );
                    }

                    const commit = await connection.execute(
                        "commit", [], { outFormat: oracledb.OUT_FORMAT_OBJECT }
                    );


                } catch (err) { console.error(err); }

                finally { if (connection) { try { await connection.close(); } catch (err) { console.error(err); } } }
            }

            run();

        }
        else {

            var mysqlQuery = "START TRANSACTION; ", mysqlParm = [];
            for (var l = 1; l <= parm[1].length; l++) {
             
                sql[1] = sql[1].replace('_p_', "?" )
               

            }
           
            
            for (var l = 1; l < sql.length; l++) {
                mysqlQuery=mysqlQuery+sql[l]+";"

            }
            mysqlQuery=mysqlQuery+" commit "+";"
          

            

       
         mysql.query(mysqlQuery, parm[1], function (err, result, fields) {
            if (err) {
                console.log(err);
               
            } else {
               
            }

        });
      
        }*/

    }

};

