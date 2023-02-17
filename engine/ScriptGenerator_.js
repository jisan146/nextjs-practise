
var mysql = require('.././dbConfig/mysql');
var oracle = require('.././dbConfig/oracle');
const oracledb = require('oracledb');
var globalVariable = require('./globalVariable');
var md5 = require('md5');
var sha512 = require('js-sha512');
const fs = require('fs');
var apiSecurity = require('./apiSecurity');

module.exports = function (app) {



    app.post(globalVariable.apiRewrite + '/ScriptGenarator', function (req, res, next) {



        if (apiSecurity.authentication(req.headers.user_id, req.headers.org_id) != req.headers.token) {
            req.connection.destroy();
        } else {

            var ddlMysql,
                ddlOracle,
                dataTypeMysql,
                dataTypeOracle,
                mysql_uiInfo = "",
                oracle_uiInfo = "",
                multiQuery = [],
                multiQueryindex = 0,
                selectSLgen = "null",
                selectSL = 0,
                selectSLtmp = 0,
                menuPages = "",
                data_Required = "",
                ddlMysql = 'create table ' + req.body.tblPfx + req.body.tblName + '\n(\n sl double NOT NULL ,\n',
                ddlOracle = 'create table ' + req.body.tblPfx + req.body.tblName + '( sl number NOT NULL ENABLE,',
                slGen,
                accessControl = "";

            slGen = "insert into sl_generator select (select max(sl)+1 from sl_generator),'" + req.body.tblPfx + req.body.tblName + "','sl','',0,'" + req.headers.org_id + "','" + req.headers.org_id + "','" + req.headers.user_id + "',now() ";

            accessControl = "insert into menu_access_control select (select concat(u.org_id,sl_generator + 1)  from sl_generator where TABLE_NAME='menu_access_control' and COL_NAME='sl')sl,access_,(select max(sl) from menu_pages where dml_by='" + req.headers.user_id + "')page_id,0,org_id,branch,user_id,now(),1,1,1,1,1 from users u where user_id=" + req.headers.user_id + ";update sl_generator set sl_generator=sl_generator+1 where TABLE_NAME='menu_access_control' and COL_NAME='sl';"

            mysql_uiInfo = mysql_uiInfo + "\ninsert into ui_info values (\n null,\n'" + req.body.tblPfx + req.body.tblName + "'," +
                "\n'sl',"
                + "\n'sl',"
                + "\n'hidden',"
                + "\nnull,"
                + "\nnull,"
                + "\n'0',"
                + "\n'1',"
                + "\n'" + (6) + "',"
                + "\n null,"
                + "\n null,"
                + "\n'" + req.headers.org_id + "',"
                + "\n'" + apiSecurity.branch(req.headers.user_id) + "',"
                + "\n'" + req.headers.user_id + "',"
                + "\n NOW(),null,null,null,'','',1,12,'');";
            oracle_uiInfo = "insert into ui_info values ( (select nvl(max(sl),0)+1 from ui_info),'" + req.body.tblPfx + req.body.tblName + "'," +
                "\n'sl',"
                + "\n'sl',"
                + "\n'hidden',"
                + "\nnull,"
                + "\nnull,"
                + "\n'0',"
                + "\n'1',"
                + "\n'" + (6) + "',"
                + "\n null,"
                + "\n null,"
                + "\n'" + req.headers.org_id + "',"
                + "\n'" + apiSecurity.branch(req.headers.user_id) + "',"
                + "\n'" + req.headers.user_id + "',"
                + " current_timestamp,null,null,null,'','',1,12,'')";
            multiQueryindex = multiQueryindex + 1;
            multiQuery[multiQueryindex] = { q: oracle_uiInfo }
            for (i = 2; i <= req.body.colNo; i++) {

                if (req.body['dataType' + i] == 'i') {
                    dataTypeMysql = 'double'
                    dataTypeOracle = 'number'

                } else if (req.body['dataType' + i] == 'lt') {
                    dataTypeMysql = 'text'
                    dataTypeOracle = 'clob'

                } else if (req.body['dataType' + i] == 't') {
                    dataTypeMysql = 'text'
                    dataTypeOracle = 'VARCHAR2(4000)'

                } else if (req.body['dataType' + i] == 'f') {
                    dataTypeOracle = 'VARCHAR2(4000)'

                } else if (req.body['dataType' + i] == 'd') {
                    dataTypeMysql = 'date'
                    dataTypeOracle = 'date'

                } else if (req.body['dataType' + i] == 'dbl') {
                    dataTypeMysql = 'double'
                    dataTypeOracle = 'number'

                }
                ddlMysql = ddlMysql + ' ' + req.body['colName' + i] + ' ' + dataTypeMysql + ',';
                ddlOracle = ddlOracle + ' ' + req.body['colName' + i] + ' ' + dataTypeOracle + ',';

                /* ui_info tbl data*/

                if (req.body['inputType' + i].replace('_r', '') == 'select') {
                    selectSL = selectSLtmp;
                    selectSL = (selectSL + 1)
                    selectSLgen = "s" + selectSL;
                } else {
                    selectSLtmp = selectSL;
                    selectSLgen = "null"
                }

                if (req.body['inputType' + i].indexOf('_r') > 0) {
                    data_Required = 'y'
                } else {
                    data_Required = 'null'
                }
                mysql_uiInfo = mysql_uiInfo + "\ninsert into ui_info values (\n null,\n'" + req.body.tblPfx + req.body.tblName + "'," +
                    "\n'" + req.body['colName' + i] + "',"
                    + "\n'" + req.body['inputLabel' + i] + "',"
                    + "\n'" + req.body['inputType' + i].replace('_r', '') + "',"
                    + "\n'" + selectSLgen + "',"
                    + "\n'" + data_Required + "',"
                    + "\n'" + (i - 1) + "',"
                    + "\n'" + (i - 1) + "',"
                    + "\n'" + (6) + "',"
                    + "\n null,"
                    + "\n null,"
                    + "\n'" + req.headers.org_id + "',"
                    + "\n'" + apiSecurity.branch(req.headers.user_id) + "',"
                    + "\n'" + req.headers.user_id + "',"
                    + "\n NOW(),null,null,null,'','',1,12,'');"



                oracle_uiInfo = "insert into ui_info values ( (select nvl(max(sl),0)+1 from ui_info),'" + req.body.tblPfx + req.body.tblName + "'," +
                    "'" + req.body['colName' + i] + "',"
                    + "'" + req.body['inputLabel' + i] + "',"
                    + "'" + req.body['inputType' + i].replace('_r', '') + "',"
                    + "'" + selectSLgen + "',"
                    + "'" + data_Required + "',"
                    + "'" + (i - 1) + "',"
                    + "'" + (i - 1) + "',"
                    + "'" + (6) + "',"
                    + " null,"
                    + " null,"
                    + "'" + req.headers.org_id + "',"
                    + "'" + apiSecurity.branch(req.headers.user_id) + "',"
                    + "'" + req.headers.user_id + "',"
                    + " current_timestamp,null,null,null,'','',1,12,'')";

                multiQueryindex = multiQueryindex + 1;
                multiQuery[multiQueryindex] = { q: oracle_uiInfo }


                /* ui_info tbl data*/
            }

            /* menu_pages tbl data*/

            menuPages =
                "'" + req.body.subMenu + "',"
                + "'/ui',"
                + "'far fa-circle nav-icon',"
                + "'" + req.body.selectMenu + "',"
                + "'select * from ui_info where table_name=''" + req.body.tblPfx + req.body.tblName + "'' order by view_sl',"
                + "\n'" + req.headers.org_id + "',"
                + "\n'" + apiSecurity.branch(req.headers.user_id) + "',"
                + "\n'" + req.headers.user_id + "',"
                + "\n NOW(),"
                + "'select * from " + req.body.tblPfx + req.body.tblName + "','/noReq','/req',1,'select * from " + req.body.tblPfx + req.body.tblName + " where sl=',' ',' ')";


            /* menu_pages tbl data*/

            ddlMysql = ddlMysql + '\n org_id double NOT NULL, \n branch double NOT NULL,\n dml_by double NOT NULL,\n dml_time timestamp NOT NULL, ';
            ddlMysql = ddlMysql + '\n PRIMARY KEY (sl)\n);'

            ddlOracle = ddlOracle + ' org_id number NOT NULL ENABLE,  branch number NOT NULL ENABLE, dml_by number NOT NULL ENABLE, dml_time timestamp NOT NULL ENABLE, ';
            ddlOracle = ddlOracle + ' CONSTRAINT "' + req.body.tblPfx + req.body.tblName + '_sl_pk" PRIMARY KEY (sl))'



            /* mysql db*/
            var mysql_menuPages = "INSERT INTO menu_pages ( page, link, icon, menu,  ui_query,org_id, branch, dml_by, dml_time,report_query,business_logic_before_submit,submit,menu_enable,update_query,select_option_query,default_value) VALUES (" + menuPages + ";";


            mysql.query(ddlMysql, [], function (err, result, fields) {
                if (err) {
                    console.log(err);
                    //res.send('fail');
                } else {

                    mysql.query(mysql_uiInfo + mysql_menuPages + "update menu_pages set query_id=lower(md5(sl));" + slGen + ";" + accessControl, [], function (err, result, fields) {
                        if (err) {
                            console.log(err);
                        } else {
                            //"GRANT ALL PRIVILEGES ON tiscon.test_supplier  TO 'nahid'@'%';"
                            //GRANT EXECUTE ON PROCEDURE product_sales TO  'nahid'@'%';
                            if (req.headers.user_id != "1000") {

                                var privilege = "GRANT ALL PRIVILEGES ON " + req.body.tblPfx + req.body.tblName + "  TO 'dev_" + req.headers.user_id + "'@'%';"

                                mysql.query(privilege, [], function (err, result, fields) {
                                    if (err) {
                                        console.log(err);

                                    } else {

                                    }

                                });
                            }

                        }

                    });

                }

            });

            /* mysql db*/

            /* oracle db*/


            var oracle_menuPages = "INSERT INTO menu_pages ( sl,page, link, icon, menu,  ui_query,org_id, branch, dml_by, dml_time,report_query,business_logic_before_submit,submit,menu_enable,update_query,select_option_query) VALUES ((select nvl(max(sl),0)+1 from menu_pages,default_value)," + menuPages


            multiQuery[0] = { q: ddlOracle }


            multiQueryindex = multiQueryindex + 1;
            multiQuery[multiQueryindex] = { q: oracle_menuPages.replace("NOW()", "current_timestamp") }
            multiQueryindex = multiQueryindex + 1;
            multiQuery[multiQueryindex] = { q: "update menu_pages set query_id=lower( DBMS_OBFUSCATION_TOOLKIT.md5 (input => UTL_RAW.cast_to_raw(sl)))" }

            multiQueryindex = multiQueryindex + 1;
            multiQuery[multiQueryindex] = { q: slGen.replace("now()", "current_timestamp") + " from dual" }

            

            
            multiQueryindex = multiQueryindex + 1;
            multiQuery[multiQueryindex] = { q: "insert into menu_access_control select (select concat(u.org_id,sl_generator + 1)  from sl_generator where TABLE_NAME='menu_access_control' and COL_NAME='sl')sl,access_,(select max(sl) from menu_pages where dml_by='" + req.headers.user_id + "')page_id,0,org_id,branch,user_id,current_timestamp,1,1,1,1,1 from users u where user_id=" + req.headers.user_id  }

            multiQueryindex = multiQueryindex + 1;
            multiQuery[multiQueryindex] = { q: "update sl_generator set sl_generator=sl_generator+1 where TABLE_NAME='menu_access_control' and COL_NAME='sl'"  }




            async function runddl() {
                let connection;

                try {
                    for (var i = 0; i < 1; i++) {
                        connection = await oracledb.getConnection(oracle);
                        const result = await connection.execute(
                            multiQuery[i].q, [], { outFormat: oracledb.OUT_FORMAT_OBJECT }
                        );

                        const result1 = await connection.execute(
                            "commit", [], { outFormat: oracledb.OUT_FORMAT_OBJECT }
                        );

                    }
                    rundml();

                } catch (err) { console.error(err); }
                finally { if (connection) { try { await connection.close(); } catch (err) { console.error(err); } } }
            }
            async function rundml() {
               
                let connection;
                try {
                    for (var i = 1; i < multiQuery.length; i++) {

                        connection = await oracledb.getConnection(oracle);
                        const result = await connection.execute(
                            multiQuery[i].q, [], { outFormat: oracledb.OUT_FORMAT_OBJECT }
                        );

                        const result1 = await connection.execute(
                            "commit", [], { outFormat: oracledb.OUT_FORMAT_OBJECT }
                        );

                    }


                } catch (err) { console.error(err); }
                finally { if (connection) { try { await connection.close(); } catch (err) { console.error(err); } } }
            }
            runddl();


            /* oracle db*/

            res.send('Generate');

        }

    });

    app.post(globalVariable.apiRewrite + '/ScriptGenaratorFail', function (req, res, next) {
        /*  mysql.query("delete from menu_pages where page='" + req.body.subMenu + "' and sl=(select max(sl) FROM menu_pages where dml_by='" + req.headers.user_id + "') and dml_by='" + req.headers.user_id + "'", [], function (err, result, fields) { if (err) { console.log(err); } else { } });
  
          mysql.query("delete from ui_info where table_name='" + req.body.tblPfx + req.body.tblName + "' and  dml_by='" + req.headers.user_id + "'", [], function (err, result, fields) { if (err) { console.log(err); } else { } });
  
          mysql.query("delete from sl_generator where table_name='" + req.body.tblPfx + req.body.tblName + "'", [], function (err, result, fields) { if (err) { console.log(err); } else { } });
  
          mysql.query("drop table " + req.body.tblPfx + req.body.tblName, [], function (err, result, fields) {
              if (err) { console.log(err); } else {
  
              }
          });
  */
        res.send('drop')

    })

 






};