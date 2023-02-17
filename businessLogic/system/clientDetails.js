
var mysql = require('../../dbConfig/mysql');
var oracle = require('../../dbConfig/oracle');
var gv = require('../../engine/globalVariable');
var md5 = require('md5');
var sha512 = require('js-sha512');
const fs = require('fs');
const oracledb = require('oracledb');
const { query } = require('express');
var gloDBconn = require('../../engine/gloDBconn');
var apiSecurity = require('../../engine/apiSecurity');

module.exports = function (app) {

    app.post(gv.apiRewrite + '/clientDetails', function (req, res, next) {

        if (apiSecurity.authentication(req.headers.user_id, apiSecurity.orgID(req.headers.user_id)) != req.headers.token) {
            req.connection.destroy();
        } else {

           
            var query = [], parm = [], tempQuery, querySl = 0, dynamicQuery = [];

            querySl = 0;
            query[querySl] = gv.dbSyntex["transaction"][gv.DB];
            parm.push([])

            querySl = querySl + 1
            query[querySl] = "update application_sl_generator set sl_generator=sl_generator+1 where table_name='application_client_details' and org_id=1 and branch=1 and col_name='sl'";
            parm.push([])

            querySl = querySl + 1
            query[querySl] = "insert into application_client_details(SL,NAME,ADDRESS_LINE_1,ADDRESS_LINE_2,CONTACT,LOGO,ORG_ID,BRANCH,DML_BY,DML_TIME) values ((select sl_generator  from application_sl_generator where table_name='application_client_details' and org_id=1 and branch=1 and col_name='sl'),_p_,_p_,_p_,_p_,_p_,_p_,_p_,_p_,current_timestamp)";
            parm.push([
                req.body[0].name,
                req.body[0].address_line_1,
                req.body[0].address_line_2,
                req.body[0].contact,
                ' ',
                apiSecurity.orgID(req.headers.user_id),
                apiSecurity.branch(req.headers.user_id),
                req.headers.user_id
                
            ])

              gloDBconn.get_info(query, parm, function (result) {
                  if (result == "error") {
                      req.connection.destroy();
                  } else {
      
                      var _exeBefore = []
                      _exeBefore[0] = 'noReq'
                      res.send(_exeBefore)
                  }
              })
        }
    });





};