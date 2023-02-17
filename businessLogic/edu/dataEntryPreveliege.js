
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
    app.post(gv.apiRewrite + '/dataEntryPreveliegeSub', function (req, res, next) {

      
        var query = [], parm = [], tempQuery, querySl = 0, dynamicQuery = [];

        querySl = 0;
        query[querySl] = gv.dbSyntex["transaction"][gv.DB];
        parm.push([])



        if (req.body.uid == 1000) {
            querySl = querySl + 1
            query[querySl] = "update application_users set ACCESS_=_p_, ORG_ID=_p_, BRANCH=_p_ where USER_ID=_p_"
            parm.push([
                req.body.access,
                req.body.org_id,
                req.body.branch_id,
                req.body.uid
            ])
        } else {
            querySl = querySl + 1
            query[querySl] = "update application_users set  ORG_ID=_p_, BRANCH=_p_ where USER_ID=_p_"
            parm.push([
               
                req.body.org_id,
                req.body.branch_id,
                req.body.uid
            ])

        }

        querySl = querySl + 1
        query[querySl] = "select (select name from application_client_details where sl=t0.org_id)name,branch_ branch from application_client_branch t0 where org_id=_p_ and branch=_p_"
        parm.push([
           
            req.body.org_id,
            req.body.branch_id,
           
        ])

        gloDBconn.get_info(query, parm, function (result) {
            if (result == "error") {
                req.connection.destroy();
            } else {


                res.send(result)
            }
        })

    });

    app.post(gv.apiRewrite + '/dataEntryPreveliege', function (req, res, next) {


        var query = [], parm = [], tempQuery, querySl = 0, dynamicQuery = [];

        querySl = 0;
        query[querySl] = gv.dbSyntex["transaction"][gv.DB];
        parm.push([])

        querySl = querySl + 1
        query[querySl] = "select name v, sl r from application_client_details order by sl"
        parm.push([])

        querySl = querySl + 1
        query[querySl] = "select branch_ v, sl r from application_client_branch  where org_id=_p_ order by sl"
        parm.push([req.body.org_id_s])

        querySl = querySl + 1
        query[querySl] = "select group_name v,sl r from application_menu_access_group order by sl"
        parm.push([])


        gloDBconn.get_info(query, parm, function (result) {
            if (result == "error") {
                req.connection.destroy();
            } else {


                res.send(result)
            }
        })

    });





};