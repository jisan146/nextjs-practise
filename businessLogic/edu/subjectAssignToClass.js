
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

    app.post(gv.apiRewrite + '/subjectAssignToClass', function (req, res, next) {

        //console.log(req.body)
        //console.log(req.headers)
        /*
        V_CLASS number, 
V_SECTION number,
V_ACADEMIC_SESSION number,
V_DML_BY number,
v_org_id number,
v_branch number
        */
        var query = [], parm = [], tempQuery, querySl = 0, dynamicQuery = [];

        querySl = 0;
        query[querySl] = gv.dbSyntex["transaction"][gv.DB];
        parm.push([])

        querySl = querySl + 1
        query[querySl] = "call subject_Assign_To_Class (_p_,_p_,_p_,_p_,_p_,_p_)"
        parm.push([
            req.body[0].class,
            req.body[0].section,
            req.body[0].academic_session,
            req.headers.user_id,
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