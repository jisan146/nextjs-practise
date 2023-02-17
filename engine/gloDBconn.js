
var mysql = require('../dbConfig/mysql');
var oracle = require('../dbConfig/oracle');
var gv = require('./globalVariable');
var md5 = require('md5');
var sha512 = require('js-sha512');
const fs = require('fs');
const oracledb = require('oracledb');
var apiSecurity = require('./apiSecurity');
module.exports = {

    get_info(query, parm, callback) {

        var dbQuery = query



        for (var q = 0; q < query.length; q++) {
            for (var p = 0; p < parm[q].length; p++) {
                dbQuery[q] = dbQuery[q].replace('_p_', gv.dbParmGen(p))
            }
        }



        if (gv.DB == "oracle") {
            var multiResult = [];

            async function run() {
                let connection;
                try {
                    connection = await oracledb.getConnection(oracle);

                    for (var i = 0; i < dbQuery.length; i++) {
                        const result = await connection.execute(dbQuery[i], parm[i], { outFormat: oracledb.OUT_FORMAT_OBJECT });
                        // console.log(dbQuery[i]+";")
                        //console.log(parm[i])
                        multiResult.push(oracleQueryObjctToLower(result.rows))
                    }
                    const result1 = await connection.execute("commit", [], { outFormat: oracledb.OUT_FORMAT_OBJECT });

                    return callback(multiResult)
                }
                catch (err) { console.error(err); return callback('error') }
                finally { if (connection) { try { await connection.close(); } catch (err) { console.error(err); return callback('error') } } }
            }
            run();

            function oracleQueryObjctToLower(result) {


                /* json object key to lower start */
                try {
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

                } catch { return {} }

            }


        } else if (gv.DB == "mysql") {
            var mysqlQuery = "", mysqlParm = []
            for (var i = 0; i < dbQuery.length; i++) {
                mysqlQuery = mysqlQuery + dbQuery[i] + ";";

                for (var p = 0; p < parm[i].length; p++) {
                    mysqlParm.push(parm[i][p])

                }

            }

            mysql.query(mysqlQuery + "commit;", mysqlParm, function (err, results) {
                if (err) {
                    return callback('error')
                    throw err;

                }
                return callback(results);
            })
        }




    },
    dbi(body_, headers_, dbcol_n, q) {
        var dbCol = Object.keys(body_[0]), defQuery = "insert into " + body_[1].tbl + " (", defQueryData = "", defQueryParm = [], cusQueNo = 0;

        for (var i = 0; i <= dbCol.length - 1; i++) {

            if (dbcol_n.indexOf(dbCol[i]) < 0) {

                defQuery = defQuery + dbCol[i] + ","
                if (i > 0) {

                    if (gv.dbi(body_[0][dbCol[i]]) != '_sql_') {
                        defQueryParm.push(gv.dbi(body_[0][dbCol[i]]))
                        defQueryData = defQueryData + "_p_,"
                    } else {
                        defQueryData = defQueryData + " " + q[cusQueNo] + ","
                        cusQueNo = cusQueNo + 1
                    }

                } else if (i == 0) {
                    defQueryData = defQueryData + "(select concat(concat(" + apiSecurity.orgID(headers_.user_id) + "," +  apiSecurity.branch(headers_.user_id) + "),sl_generator) sl FROM application_sl_generator WHERE lower(table_name) = '" + body_[1].tbl + "' AND lower(col_name) = '" + dbCol[i] + "' AND org_id = '" + apiSecurity.orgID(headers_.user_id) + "' AND branch = '" +  apiSecurity.branch(headers_.user_id) + "'),"
                }
            }

        }

        defQuery = defQuery + "org_id,branch,dml_by,dml_time) values (" + defQueryData + "_p_,_p_,_p_," + gv.dbSyntex["time"][gv.DB] + ")"
        defQueryParm.push(apiSecurity.orgID(headers_.user_id))
        defQueryParm.push( apiSecurity.branch(headers_.user_id))
        defQueryParm.push(headers_.user_id)




        var tempQuery = []

        tempQuery.push({ q: "update application_sl_generator set sl_generator=sl_generator+1  where lower(table_name)='" + body_[1].tbl + "' and  lower(col_name)='sl' and org_id='" + apiSecurity.orgID(headers_.user_id) + "' and branch='" +  apiSecurity.branch(headers_.user_id) + "'", p: [] });

        tempQuery.push({ q: defQuery, p: defQueryParm });







        return tempQuery;
        // console.log(defQuery);
        //console.log(defQueryParm);
    }




};