
var mysql = require('../dbConfig/mysql');
var oracle = require('../dbConfig/oracle');
const oracledb = require('oracledb');
var globalVariable = require('./globalVariable');
var md5 = require('md5');
var sha512 = require('js-sha512');
const fs = require('fs');
var apiSecurity = require('./apiSecurity');

module.exports = function (app) {

  //

  mysql.query("SELECT distinct lower(table_name)table_name FROM information_schema.`COLUMNS` where TABLE_SCHEMA='tiscon' order by 1", [], function (err, result, fields) {
    if (err) {
      console.log(err);

    } else {

      for (var k = 0; k < result.length; k++) {

       // dbMigrate(result[k].table_name) //pos_product_purchase

     //  console.log("Total: "+(result.length-1)+" Curent: "+k+"          "+result[k].table_name)
      }
    }

  });

  //dbMigrate("virtual_row")

  async function dbMigrate(tbl_name) {
    var tblName = tbl_name;
    var tblData = "insert into " + tblName + " values (", tblCol = [];
    mysql.query("SELECT lower(table_name)table_name,lower(column_name)column_name,lower(data_type)data_type,lower(is_nullable)is_nullable FROM information_schema.`COLUMNS` where TABLE_SCHEMA='tiscon' and table_name='" + tblName + "' order by ordinal_position;", [], function (err, result, fields) {
      if (err) {
        console.log(err);

      } else {


        var ddl = "", dmlCol = ""
        ddl = ddl + "\n"
        ddl = ddl + "create table " + result[0].table_name
        ddl = ddl + "\n"
        ddl = ddl + "(       "
        for (var i = 0; i < result.length; i++) {
          tblCol.push(result[i].column_name)
          if (i == result.length - 1) {
            if (result[i].data_type == "date" || result[i].data_type == "timestamp") {
              dmlCol = dmlCol + "\n"
              dmlCol = dmlCol + "DATE_FORMAT(ifnull(" + result[i].column_name + ",now()),'%Y-%m-%d %H:%i:%S')dml_time" + i
            } else {
              dmlCol = dmlCol + "\n"
              dmlCol = dmlCol + "ifnull(" + result[i].column_name + ",'') " + result[i].column_name
            }

          } else {
            if (result[i].data_type == "date" || result[i].data_type == "timestamp") {
              dmlCol = dmlCol + "\n"
              dmlCol = dmlCol + "DATE_FORMAT(ifnull(" + result[i].column_name + ",now()),'%Y-%m-%d %H:%i:%S')dml_time" + i + ","
            } else {
              dmlCol = dmlCol + "\n"
              dmlCol = dmlCol + "ifnull(" + result[i].column_name + ",'') " + result[i].column_name + ","
            }
          }
          var _null = "";

          if (result[i].is_nullable == "yes") {
            _null = " NULL "
          } else {
            _null = " NOT NULL ENABLE"
          }

          if (result[i].data_type == "double") {

            ddl = ddl + "\n"
            ddl = ddl + result[i].column_name + " number " + _null + " ,"
            if (i != (result.length - 1)) {
              tblData = tblData + `'0',`
            } else {
              tblData = tblData + `'0'`
            }

          } else if (result[i].data_type == "text") {

            ddl = ddl + "\n"
            ddl = ddl + result[i].column_name + " VARCHAR2(2500) " + _null + " ,"
            if (i != (result.length - 1)) {
              tblData = tblData + `'0',`
            } else {
              tblData = tblData + `'0'`
            }
          }
          else if (result[i].data_type == "timestamp") {

            ddl = ddl + "\n"
            ddl = ddl + result[i].column_name + " TIMESTAMP " + _null + " ,"
            if (i != (result.length - 1)) {
              tblData = tblData + `current_timestamp,`
            } else {
              tblData = tblData + `current_timestamp`
            }
          }
          else if (result[i].data_type == "date") {

            ddl = ddl + "\n"
            ddl = ddl + result[i].column_name + " TIMESTAMP " + _null + " ,"
            if (i != (result.length - 1)) {
              tblData = tblData + `current_timestamp,`
            } else {
              tblData = tblData + `current_timestamp`
            }
          }
          else if (result[i].data_type == "int") {

            ddl = ddl + "\n"
            ddl = ddl + result[i].column_name + " number " + _null + " ,"
            if (i != (result.length - 1)) {
              tblData = tblData + `'0',`
            } else {
              tblData = tblData + `'0'`
            }
          }
          else if (result[i].data_type == "decimal") {

            ddl = ddl + "\n"
            ddl = ddl + result[i].column_name + " number " + _null + " ,"
            if (i != (result.length - 1)) {
              tblData = tblData + `'0',`
            } else {
              tblData = tblData + `'0'`
            }
          }
          else if (result[i].data_type == "varchar") {

            ddl = ddl + "\n"
            ddl = ddl + result[i].column_name + " VARCHAR2(2500) " + _null + " ,"
            if (i != (result.length - 1)) {
              tblData = tblData + `'0',`
            } else {
              tblData = tblData + `'0'`
            }
          }
          else if (result[i].data_type == "mediumtext") {

            ddl = ddl + "\n"
            ddl = ddl + result[i].column_name + " VARCHAR2(2500) " + _null + " ,"
            if (i != (result.length - 1)) {
              tblData = tblData + `'0',`
            } else {
              tblData = tblData + `'0'`
            }
          }



        }

        tblData = tblData + `)`

        ddl = ddl + "\n"
        ddl = ddl + 'PRIMARY KEY (sl)'
        ddl = ddl + "\n"
        ddl = ddl + ")       "

        /*  console.log("##########")
          console.log("                 ")
          console.log(ddl)
          console.log("                 ")
          console.log("##########")*/


        var executeScript = [];
        executeScript[0] = "drop table " + tblName;
        executeScript[1] = ddl


        async function exeScript() {

          connection = await oracledb.getConnection(oracle);
          for (var i = 0; i < executeScript.length; i++) {
            
            try {
              // console.log( executeScript[i])
              const result = await connection.execute(
                executeScript[i], [], { outFormat: oracledb.OUT_FORMAT_OBJECT }
              );
            } catch (err) { console.log(executeScript[i]) }

            if (i == 1) {
              runORAdml(dmlCol, ddl)
            }
          }
          //  finally { if (connection) { try { await connection.close(); } catch (err) { console.error(err); } } }

          // runORAdml(dmlCol, ddl)
        }
        exeScript()
        //  runORAddl(ddl, dmlCol);

      }

    });

    async function runORAddl(ddl, dmlCol) {

      /* try {

           connection = await oracledb.getConnection(oracle);
           const result = await connection.execute(
               ddl, [], { outFormat: oracledb.OUT_FORMAT_OBJECT }
           );
       } catch (err) { console.error(err); }
       finally { if (connection) { try { await connection.close(); } catch (err) { console.error(err); } } }*/

    }

    async function runORAdml(dmlCol, ddl) {



      mysql.query("SELECT " + dmlCol + " FROM " + tblName, [], function (err, result, fields) {
        if (err) {
          console.log(err);

        } else {
          var dmlScript = []



          var insCode = "", insData = "";
          for (var k = 0; k < result.length; k++) {
            var dbCol = Object.keys(result[k])
            insCode = insCode + "\n"
            insCode = insCode + " insert into " + tblName + " values ("
            insData = insData + "\n" + tblData + "\nupdate " + tblName + " set sl = " + "q'[" + result[k][dbCol[0]] + "]'" + " where sl=0;"
            dmlScript.push(tblData)
            dmlScript.push("update " + tblName + " set sl = " + "q'[" + result[k][dbCol[0]] + "]'" + " where sl=0")
            for (var i = 0; i < dbCol.length - 1; i++) {

              if (dbCol[i].indexOf('dml_time') >= 0) {
                insCode = insCode + " TO_TIMESTAMP('" + result[k][dbCol[i]] + "','YYYY-MM-DD HH24:MI:SS')" + ","
                insData = insData + "\n" + " update " + tblName + " set " + tblCol[i] + " = " + " TO_TIMESTAMP('" + result[k][dbCol[i]] + "','YYYY-MM-DD HH24:MI:SS')" + " where sl=" + result[k][dbCol[0]] + ";"
                dmlScript.push(" update " + tblName + " set " + tblCol[i] + " = " + " TO_TIMESTAMP('" + result[k][dbCol[i]] + "','YYYY-MM-DD HH24:MI:SS')" + " where sl=" + result[k][dbCol[0]])
              } else {
                insCode = insCode + "q'[" + result[k][dbCol[i]] + "]'" + ","
                insData = insData + "\n" + " update " + tblName + " set " + tblCol[i] + " = " + "q'[" + result[k][dbCol[i]] + "]'" + " where sl=" + result[k][dbCol[0]] + ";"

                dmlScript.push(" update " + tblName + " set " + tblCol[i] + " = " + "q'[" + result[k][dbCol[i]] + "]'" + " where sl=" + result[k][dbCol[0]])
              }

            }
            if (dbCol[i].indexOf('dml_time') >= 0) {
              insCode = insCode + " TO_TIMESTAMP('" + result[k][dbCol[i]] + "','YYYY-MM-DD HH24:MI:SS')" + ");"
              insData = insData + "\n" + " update " + tblName + " set " + tblCol[i] + " = " + " TO_TIMESTAMP('" + result[k][dbCol[i]] + "','YYYY-MM-DD HH24:MI:SS')" + " where sl=" + result[k][dbCol[0]] + ";"

              dmlScript.push(" update " + tblName + " set " + tblCol[i] + " = " + " TO_TIMESTAMP('" + result[k][dbCol[i]] + "','YYYY-MM-DD HH24:MI:SS')" + " where sl=" + result[k][dbCol[0]])

            } else {
              insCode = insCode + "q'[" + result[k][dbCol[i]] + "]'" + ");"
              insData = insData + "\n" + " update " + tblName + " set " + tblCol[i] + " = " + "q'[" + result[k][dbCol[i]] + "]'" + " where sl=" + result[k][dbCol[0]] + ";"

              dmlScript.push(" update " + tblName + " set " + tblCol[i] + " = " + "q'[" + result[k][dbCol[i]] + "]'" + " where sl=" + result[k][dbCol[0]])
            }

            //console.log(insData)

          }

          // console.log(ddl)
          // fs.appendFileSync(__dirname + '/sqlScript/oracle/dml.sql', '' + insCode);
          //  fs.writeFileSync(__dirname + '/sqlScript/oracle/temp.sql', "drop table " + tblName + ";\n" + ddl + ";\n" + insCode);
          // tblData
          /*  for (var i = 0; i < dmlScript.length; i++) {
              console.log(dmlScript[i])
             
            }*/
          async function exeScript1() {
          console.log(dmlScript.length)
            connection1 = await oracledb.getConnection(oracle);
            try {

              for (var i = 0; i < dmlScript.length; i++) {
              
                if(i==dmlScript.length-1)
                {
                 // console.log( "L: "+(dmlScript.length-1)+ " C:"+i)
                  console.log(tblName)
                }
               
                const result = await connection1.execute(
                  dmlScript[i], [], { outFormat: oracledb.OUT_FORMAT_OBJECT }
                );

              }
              const result1 = await connection1.execute(
                "commit", [], { outFormat: oracledb.OUT_FORMAT_OBJECT }
              );
            


            } catch (err) { console.error(err);console.log( dmlScript[i]) }
           // finally { if (connection1) { try { await connection1.close(); } catch (err) { console.error(err); } } }

          }
          exeScript1()
          fs.writeFileSync(__dirname + '/sqlScript/oracle/temp.sql', "drop table " + tblName + ";\n" + ddl + ";\n" + insData + "\n commit;");





        }
      })
    }

  }
















};