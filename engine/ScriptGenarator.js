
var mysql = require('../dbConfig/mysql');
var oracle = require('../dbConfig/oracle');
const oracledb = require('oracledb');
var globalVariable = require('./globalVariable');
var md5 = require('md5');
var sha512 = require('js-sha512');
const fs = require('fs');
var apiSecurity = require('./apiSecurity');

module.exports = function (app) {



  var body, headers, sql = [], sqlArrayIndex = 0;

  sql[0] = '';
  app.post(globalVariable.apiRewrite + '/ScriptGenarator', function (req, res, next) {

    if (apiSecurity.authentication(req.headers.user_id, apiSecurity.orgID(req.headers.user_id)) != req.headers.token) {
      req.connection.destroy();
    } else {
      body = req.body;
      headers = req.headers;

      /*********** Start Mysql DB Script*/
      function mysqlSql() {


        sql = []
        sqlArrayIndex = 0
        ddlScriptGenarator(globalVariable.supportedDB[1])

        mysql.query(sql[1], [], function (err, result, fields) {
          if (err) {
            console.log(err);

          } else {

            var dml = "START TRANSACTION; "
            for (var i = 2; i < sql.length; i++) {
              dml = dml + sql[i] + ";"
              if (req.headers.user_id != "1000") {
                var privilege = "GRANT select,insert,update,delete,alter ON " + req.body.tblPfx + req.body.tblName + "  TO 'dev_" + req.headers.user_id + "'@'%';"
                dml = dml + privilege
              }

            }
            // console.log(result)

            mysql.query(dml, [], function (err, result1, fields) {
              if (err) {
                console.log(err);
                mysql.query("rollback;", [], function (err, result2, fields) { if (err) { } else { } });
              } else {
                application_patch_update('mysql', apiSecurity.orgID(headers.user_id), apiSecurity.branch(headers.user_id), headers.user_id)
                //console.log(result1)
              }

            });

          }

        });
      }
      /*********** End Mysql DB Script*/

      /*********** Start Oracle DB Script*/
      sql = []
      sqlArrayIndex = 0
      ddlScriptGenarator(globalVariable.supportedDB[0])
      runddl();
      async function runddl() {

        let connection;
        try {

          connection = await oracledb.getConnection(oracle);

          const result = await connection.execute(
            sql[1], [], { outFormat: oracledb.OUT_FORMAT_OBJECT }
          );
          if (req.headers.user_id != "1000") {
            const result_grant = await connection.execute(
              "grant select,insert,update,delete,alter on " + body.tblPfx + body.tblName + " to dev_" + req.headers.user_id, [], { outFormat: oracledb.OUT_FORMAT_OBJECT }
            );
          }


          // console.log(result)
          runDml();

        } catch (err) { console.error(err); }
        finally { if (connection) { try { await connection.close(); } catch (err) { console.error(err); } } }
      }


      async function runDml() {
        let connection;
        try {

          connection = await oracledb.getConnection(oracle);
          for (var i = 2; i < sql.length; i++) {
            const result = await connection.execute(
              sql[i], [], { outFormat: oracledb.OUT_FORMAT_OBJECT }

            );

            // console.log(result)

          }
          application_patch_update('oracle', apiSecurity.orgID(headers.user_id), apiSecurity.branch(headers.user_id), headers.user_id)

          mysqlSql()

        } catch (err) { console.error(err); }
        finally { if (connection) { try { await connection.close(); } catch (err) { console.error(err); } } }
      }

      /*********** End Oracle DB Script*/




      res.send('')


    }
  })

  async function application_patch_update(
    DB_ENGINE,
    ORG_ID,
    BRANCH,
    DML_BY
  ) {

    let connection;
    try {
      connection = await oracledb.getConnection(oracle);
      for (var i = 1; i < sql.length; i++) {

        const result1 = await connection.execute(
          "update application_sl_generator set sl_generator=sl_generator+1 where TABLE_NAME='application_patch_update' and COL_NAME='sl' and org_id=1 and branch=1", [], { outFormat: oracledb.OUT_FORMAT_OBJECT }
        );
        const result4 = await connection.execute(
          "update application_sl_generator set sl_generator=sl_generator+1 where TABLE_NAME='application_patch_update_execute' and COL_NAME='sl' and org_id=1 and branch=1", [], { outFormat: oracledb.OUT_FORMAT_OBJECT }
        );

        const result = await connection.execute(
          "insert into application_patch_update (SL,SCRIPT,DB_ENGINE,ORG_ID,BRANCH,DML_BY,DML_TIME)values((select  concat(concat(1,1),sl_generator )  from application_sl_generator where TABLE_NAME='application_patch_update' and COL_NAME='sl' and org_id=1 and branch=1),:SCRIPT,:DB_ENGINE,:ORG_ID,:BRANCH,:DML_BY,current_timestamp)", [sql[i],
          DB_ENGINE,
          ORG_ID,
          BRANCH,
          DML_BY], { outFormat: oracledb.OUT_FORMAT_OBJECT }
        );

        const result3 = await connection.execute(
          "insert into application_patch_update_execute (SL,SCRIPT_SL,STATUS,DML_TIME)values((select concat(concat(1,1),sl_generator ) from application_sl_generator where TABLE_NAME='application_patch_update_execute' and COL_NAME='sl' and org_id=1 and branch=1),(select sl_generator  from application_sl_generator where TABLE_NAME='application_patch_update' and COL_NAME='sl' and org_id=1 and branch=1),'execute',current_timestamp)", [], { outFormat: oracledb.OUT_FORMAT_OBJECT }
        );
        



      }

      const result2 = await connection.execute(
        "commit", [], { outFormat: oracledb.OUT_FORMAT_OBJECT }
      );

    } catch (err) { console.error(err); }
    finally { if (connection) { try { await connection.close(); } catch (err) { console.error(err); } } }
  }


  function ddlScriptGenarator(dbEngine) {
    var ddl = '', isNull = '', slGenarator = '', ui_info = [], ui_info_sl = [], data_Required = '', menuPages = '', queryID = '', accessControl = '', accessControl_sl = '', menuPages_sl = '', default_value = '';
    ui_info[0] = '';
    ddl = `create table ` + body.tblPfx + body.tblName;
    ddl = ddl + `\n` + `(`;


    for (i = 1; i <= body.colNo; i++) {
      if (body['inputType' + i].indexOf('_r') > 0) {
        isNull = 'NOT NULL';
        if (i == 1) {
          data_Required = 'NULL'
          //default_value = "'0'"
          default_value = 'NULL'
        } else {
          data_Required = "'y'"
          default_value = 'NULL'
        }

        /* if(body['colName' + i]=='sl')
         {
           default_value = "'0'"
         }*/

      } else {
        isNull = 'NULL';
        data_Required = 'NULL'
      }




      ddl = ddl + `\n ` + body['colName' + i] + ' ' + globalVariable.dbSyntex[body['dataType' + i]][dbEngine] + ' ' + isNull + ',';

      ui_info[i] = "insert into application_ui_info values (\n (select  concat(concat(1,1),sl_generator+1 )  from application_sl_generator where TABLE_NAME='application_ui_info' and COL_NAME='sl' and org_id=1 and branch=1),\n'" + body.tblPfx + body.tblName + "'," +
        "\n'" + body['colName' + i] + "',"
        + "\n'" + body['inputLabel' + i] + "',"
        + "\n'" + body['inputType' + i].replace('_r', '') + "',"
        + "\n" + "NULL" + ","
        + "\n" + data_Required + ","
        + "\n'" + (i - 1) + "',"
        + "\n'" + (i) + "',"
        + "\n'" + (6) + "',"
        + "\n NULL,"
        + "\n NULL,"
        + "\n'" + apiSecurity.orgID(headers.user_id) + "',"
        + "\n'" + apiSecurity.branch(headers.user_id) + "',"
        + "\n'" + headers.user_id + "',"
        + "\n " + globalVariable.dbSyntex['time'][dbEngine] + ",NULL,NULL,NULL," + default_value + ",'',1,12,'')";

      ui_info_sl[i] = "update application_sl_generator set sl_generator=sl_generator+1 where TABLE_NAME='application_ui_info' and COL_NAME='sl' and org_id=1 and branch=1";


    }
    ddl = ddl + `\n ` + 'org_id' + ' ' + globalVariable.dbSyntex['dbl'][dbEngine] + ' NOT NULL,';
    ddl = ddl + `\n ` + 'branch' + ' ' + globalVariable.dbSyntex['dbl'][dbEngine] + ' NOT NULL,';
    ddl = ddl + `\n ` + 'dml_by' + ' ' + globalVariable.dbSyntex['dbl'][dbEngine] + ' NOT NULL,';
    ddl = ddl + `\n ` + 'dml_time' + ' ' + globalVariable.dbSyntex['d'][dbEngine] + ' NOT NULL,';
    ddl = ddl + `\n ` + `PRIMARY KEY (` + body['colName' + 1] + `)`;
    ddl = ddl + `\n` + `)`


    slGenarator = "insert into application_sl_generator select (select max(sl)+1 from application_sl_generator),'" + body.tblPfx + body.tblName + "','sl','',0,'" + apiSecurity.orgID(headers.user_id) + "','" + apiSecurity.branch(headers.user_id) + "','" + headers.user_id + "'," + globalVariable.dbSyntex['time'][dbEngine] + ",null from dual";


    menuPages = "INSERT INTO application_menu_pages (sl, page, link, icon, menu,  ui_query,org_id, branch, dml_by, dml_time,report_query,business_logic_before_submit,submit,menu_enable,update_query,select_option_query) VALUES (";

    menuPages = menuPages +
      "(select  concat(concat(1,1),sl_generator+1 )  from application_sl_generator where TABLE_NAME='application_menu_pages' and COL_NAME='sl' and org_id=1 and branch=1),"
      + "'" + body.subMenu + "',"
      + "'/ui',"
      + "'far fa-circle nav-icon',"
      + "'" + body.selectMenu + "',"
      + "'select * from application_ui_info where table_name=''" + body.tblPfx + body.tblName + "'' order by view_sl',"
      + "\n'" + apiSecurity.orgID(headers.user_id) + "',"
      + "\n'" + apiSecurity.branch(headers.user_id) + "',"
      + "\n'" + headers.user_id + "',"
      + "\n " + globalVariable.dbSyntex['time'][dbEngine] + ","
      + "'select * from " + body.tblPfx + body.tblName + "','/noReq','/req',1,'select * from " + body.tblPfx + body.tblName + " where sl=',' ')";

    menuPages_sl = "update application_sl_generator set sl_generator=sl_generator+1 where TABLE_NAME='application_menu_pages' and COL_NAME='sl' and org_id=1 and branch=1"

    queryID = "update application_menu_pages set query_id=lower(md5(sl))";

    accessControl = "insert into application_menu_access_control select (select  concat(concat(1,1),sl_generator+1 )   from application_sl_generator where TABLE_NAME='application_menu_access_control' and COL_NAME='sl' and org_id=1 and branch=1)sl,access_,(select sl_generator   from application_sl_generator where TABLE_NAME='application_menu_pages' and COL_NAME='sl' and org_id=1 and branch=1)page_id,0,org_id,branch,user_id," + globalVariable.dbSyntex['time'][dbEngine] + ",1,1,1,1,1,0 from application_users u where user_id=" + headers.user_id + ""
    accessControl_sl = "update application_sl_generator set sl_generator=sl_generator+1 where TABLE_NAME='application_menu_access_control' and COL_NAME='sl'"

    sqlArrayIndex = sqlArrayIndex + 1
    sql[sqlArrayIndex] = ddl.replace(/\r?\n|\r/g, " ");
    sqlArrayIndex = sqlArrayIndex + 1
    sql[sqlArrayIndex] = slGenarator.replace(/\r?\n|\r/g, " ")
    sqlArrayIndex = 2

    for (var i = 1; i < ui_info.length; i++) {
      sqlArrayIndex = sqlArrayIndex + 1
      sql[sqlArrayIndex] = ui_info[i].replace(/\r?\n|\r/g, " ");
      sqlArrayIndex = sqlArrayIndex + 1
      sql[sqlArrayIndex] = ui_info_sl[i].replace(/\r?\n|\r/g, " ")
    }

    sqlArrayIndex = sqlArrayIndex + 1
    sql[sqlArrayIndex] = menuPages.replace(/\r?\n|\r/g, " ")

    sqlArrayIndex = sqlArrayIndex + 1
    sql[sqlArrayIndex] = menuPages_sl.replace(/\r?\n|\r/g, " ")

    sqlArrayIndex = sqlArrayIndex + 1
    sql[sqlArrayIndex] = queryID.replace(/\r?\n|\r/g, " ")

    sqlArrayIndex = sqlArrayIndex + 1
    sql[sqlArrayIndex] = accessControl.replace(/\r?\n|\r/g, " ")

    sqlArrayIndex = sqlArrayIndex + 1
    sql[sqlArrayIndex] = accessControl_sl.replace(/\r?\n|\r/g, " ")

    sqlArrayIndex = sqlArrayIndex + 1
    sql[sqlArrayIndex] = "commit"

  }




};