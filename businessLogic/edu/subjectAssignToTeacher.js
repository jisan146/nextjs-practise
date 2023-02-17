
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

    app.post(gv.apiRewrite + '/subjectAssignToTeacher', function (req, res, next) {

 
        var query = [], parm = [], tempQuery, querySl = 0, dynamicQuery = [];

        querySl = 0;
        query[querySl] = gv.dbSyntex["transaction"][gv.DB];
        parm.push([])

        querySl = querySl + 1
        query[querySl] = "call subject_Assign_To_Teacher (_p_,_p_,_p_,_p_,_p_,_p_,_p_)"
        parm.push([
            req.body[0].teacher,
            req.body[0].class,
            req.body[0].section,
            req.body[0].academic_session,
            req.headers.user_id,
            apiSecurity.orgID(req.headers.user_id),
            apiSecurity.branch(req.headers.user_id)
        ])

       console.log(req.body)

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