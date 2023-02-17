
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

    app.post(gv.apiRewrite + '/stdPromotion', function (req, res, next) {

 
        var query = [], parm = [], tempQuery, querySl = 0, dynamicQuery = [];

        querySl = 0;
        query[querySl] = gv.dbSyntex["transaction"][gv.DB];
        parm.push([])

        querySl = querySl + 1
        query[querySl] = "update edu_student set class=_p_, section=_p_, academic_year=_p_ where class=_p_ and section=_p_ and academic_year=_p_ and org_id=_p_ and branch=_p_"
        parm.push([
            
            req.body[0].p_class,
            req.body[0].p_section,
            req.body[0].p_session,
            req.body[0].cur__class,
            req.body[0].cur_section,
            req.body[0].cur_session,
            apiSecurity.orgID(req.headers.user_id),
            apiSecurity.branch(req.headers.user_id)
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

    });





};