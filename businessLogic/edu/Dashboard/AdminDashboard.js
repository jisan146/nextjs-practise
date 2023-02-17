
var mysql = require('../../../dbConfig/mysql');
var oracle = require('../../../dbConfig/oracle');
var gv = require('../../../engine/globalVariable');
var md5 = require('md5');
var sha512 = require('js-sha512');
const fs = require('fs');
const oracledb = require('oracledb');
const { query } = require('express');
var gloDBconn = require('../../../engine/gloDBconn');
var apiSecurity = require('../../../engine/apiSecurity');


module.exports = function (app) {

    app.post(gv.apiRewrite + '/totalAcademyStd', function (req, res, next) {

        var query = [], parm = [], tempQuery, querySl = 0, dynamicQuery = [];

        querySl = 0;
        query[querySl] = gv.dbSyntex["transaction"][gv.DB];
        parm.push([])

        querySl = querySl + 1
        query[querySl] = `select count(*) total_std,t1.name,t1.sl,t1.name||' ('||count(*)||')' tt,t1.sl||' ('||count(*)||')' 
        ttsl ,
        (select count(*) from edu_attendance where org_id=t1.sl and to_char(edu_attendance.atd_time,'dd-mon-rr')=to_char(sysdate,'dd-mon-rr') 
        and edu_attendance.atd_status=1) tp,
        count(*) -(select count(*) from edu_attendance where org_id=t1.sl and to_char(edu_attendance.atd_time,'dd-mon-rr')=to_char(sysdate,'dd-mon-rr') 
        and edu_attendance.atd_status=1) ta
        
        from edu_student t0, application_client_details t1 where t0.org_id=t1.sl and 
                t1.sl in (2,3,118,119,1112,1113,1114,1115,1116,1117)  group by t1.sl,t1.name
                order by t1.sl`
        parm.push([])


        querySl = querySl + 1
        query[querySl] = `select (select count(*) ts from edu_student WHERE
        org_id in (2,3,118,119,1112,1113,1114,1115,1116,1117) )ts,
        
        (select count(*) tm from edu_student WHERE
        org_id in (2,3,118,119,1112,1113,1114,1115,1116,1117) and nvl(gender,'2')=2)tm,
        
        (select count(*) tf from edu_student WHERE
        org_id in (2,3,118,119,1112,1113,1114,1115,1116,1117) and nvl(gender,'2')=1)tf
        
        from dual`
        parm.push([])

        querySl = querySl + 1
        query[querySl] = `select (select count(*) ts from edu_student WHERE
        org_id in (2,3,118,119,1112,1113,1114,1115,1116,1117) )ts,
        
       (select count(*) from edu_attendance where  to_char(edu_attendance.atd_time,'dd-mon-rr')=to_char(sysdate,'dd-mon-rr') 
and edu_attendance.atd_status=1) tp,
        
      (select count(*) ts from edu_student WHERE
        org_id in (2,3,118,119,1112,1113,1114,1115,1116,1117) )-(select count(*) from edu_attendance where  to_char(edu_attendance.atd_time,'dd-mon-rr')=to_char(sysdate,'dd-mon-rr') 
and edu_attendance.atd_status=1) ta
        
        from dual`
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