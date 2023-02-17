
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

    app.post(gv.apiRewrite + '/eduClientList', function (req, res, next) {

        var query = [], parm = [], tempQuery, querySl = 0, dynamicQuery = [];

        querySl = 0;
        query[querySl] = gv.dbSyntex["transaction"][gv.DB];
        parm.push([])

        querySl = querySl + 1
        query[querySl] = `select * from application_client_details where sl in (2,3,118,119,1112,1113,1114,1115,1116,1117)`
        parm.push([])






        gloDBconn.get_info(query, parm, function (result) {
            if (result == "error") {
                req.connection.destroy();
            } else {


                res.send(result)
            }
        })

    });

    app.post(gv.apiRewrite + '/eduClientDetails', function (req, res, next) {

        var query = [], parm = [], tempQuery, querySl = 0, dynamicQuery = [];



        querySl = 0
        query[querySl] = `
        select t0.name,t0.student_phone,t1.atd_status from edu_student t0, edu_attendance t1 where t0.class=_p_ and t0.section=_p_
        and t1.std_id=t0.user_id and
        to_char(t1.atd_time,'dd-mon-rr')=to_char(sysdate,'dd-mon-rr')
                `
        parm.push([req.body.class,req.body.section])






        gloDBconn.get_info(query, parm, function (result) {
            if (result == "error") {
                req.connection.destroy();
            } else {


                res.send(result)
            }
        })

    });

    app.post(gv.apiRewrite + '/eduClientAtdSummary', function (req, res, next) {



        var query = [], parm = [], tempQuery, querySl = 0, dynamicQuery = [];

        querySl = 0;
        query[querySl] = gv.dbSyntex["transaction"][gv.DB];
        parm.push([])

        querySl = querySl + 1
        query[querySl] = `select (select count(*) ts from edu_student WHERE
        org_id =_p_ )ts,
        
       (select count(*) from edu_attendance where  to_char(edu_attendance.atd_time,'dd-mon-rr')=to_char(sysdate,'dd-mon-rr') 
and edu_attendance.atd_status=1 AND org_id=_p_) tp,
        
      (select count(*) ts from edu_student WHERE
        org_id =_p_ )-(select count(*) from edu_attendance where  to_char(edu_attendance.atd_time,'dd-mon-rr')=to_char(sysdate,'dd-mon-rr') 
and edu_attendance.atd_status=1 and org_id=_p_) ta
        
        from dual`
        parm.push([
            req.body.org_id,
            req.body.org_id,
            req.body.org_id,
            req.body.org_id

        ])

        querySl = querySl + 1
        query[querySl] = `select t0.class class_,t0.section section_, t2.class,t3.section,count(*)ts,
        (select count(*) from edu_attendance where  to_char(edu_attendance.atd_time,'dd-mon-rr')=to_char(sysdate,'dd-mon-rr') 
       and edu_attendance.atd_status=1 and edu_attendance.class=t0.class and edu_attendance.section=t0.section and org_id=_p_) tp,
       count(*)- (select count(*) from edu_attendance where  to_char(edu_attendance.atd_time,'dd-mon-rr')=to_char(sysdate,'dd-mon-rr') 
       and edu_attendance.atd_status=1 and edu_attendance.class=t0.class and edu_attendance.section=t0.section ) ta
       
       from edu_student t0,  edu_class t2, edu_section t3
       where t0.org_id=_p_  and t2.sl=t0.class and t3.sl=t0.section 
       group by t2.class,t3.section,t0.class,t0.section
       order by t2.class,t3.section`
        parm.push([
            req.body.org_id,
            req.body.org_id

        ])








        gloDBconn.get_info(query, parm, function (result) {
            if (result == "error") {
                req.connection.destroy();
            } else {


                res.send(result)
            }
        })

    });


    app.post(gv.apiRewrite + '/eduClientHomeWorkSummary', function (req, res, next) {



 

        var query = [], parm = [], tempQuery, querySl = 0, dynamicQuery = [];

        querySl = 0;
        query[querySl] = gv.dbSyntex["transaction"][gv.DB];
        parm.push([])

        querySl = querySl + 1
        query[querySl] = `select (select count(*) ts from edu_student WHERE
        org_id =_p_ )ts,
        
       (select count(*) from edu_assignment_assign where  to_char(dml_time,'dd-mon-rr')=to_char(sysdate,'dd-mon-rr') 
and status=1 and org_id=_p_) tp,
        
      (select count(*) ts from edu_student WHERE
         org_id=_p_ )-  (select count(*) from edu_assignment_assign where  to_char(dml_time,'dd-mon-rr')=to_char(sysdate,'dd-mon-rr') 
and status=1 and org_id=_p_) ta
        
        from dual`
        parm.push([
            req.body.org_id,
            req.body.org_id,
            req.body.org_id,
            req.body.org_id

        ])

        querySl = querySl + 1
        query[querySl] = `select t0.sl section_, t1.sl class_,
        t1.class,t0.section,
        (select count(*) from edu_class_subject where class=t0.class and section=t0.sl) total_subject,
        (select count(distinct subject) from edu_assignment where class=t0.class and section=t0.sl and
        to_char(dml_time,'dd-mon-rr')=to_char(sysdate,'dd-mon-rr') ) total_assignment,
        (select count(*) from edu_student where class=t0.class and section=t0.sl) total_student,
        (select count(*) from edu_assignment_assign where edu_assignment_assign.status=1 and  STD_ID 
        in (select user_id  from edu_student where class=t0.class and section=t0.sl)) total_student_submit
        
        
        from edu_section t0,edu_class t1 where t0.org_id=_p_ and t1.sl=t0.class
        order by t1.class_sl,t0.section_sl`
        parm.push([  req.body.org_id])








        gloDBconn.get_info(query, parm, function (result) {
            if (result == "error") {
                req.connection.destroy();
            } else {


                res.send(result)
            }
        })

    });


    app.post(gv.apiRewrite + '/eduClientHomeWorkDetails', function (req, res, next) {

        var query = [], parm = [], tempQuery, querySl = 0, dynamicQuery = [];



        querySl = 0
        query[querySl] = `
        select (select subject from edu_class_subject where sl =(select subject from edu_assignment where sl=t1.ASSIGNMENT))subject, t0.name,t0.student_phone,t1.status from edu_student t0, edu_assignment_assign t1 where t0.class=_p_ and t0.section=_p_
        and t1.std_id=t0.user_id 
                `
        parm.push([req.body.class, req.body.section])






        gloDBconn.get_info(query, parm, function (result) {
            if (result == "error") {
                req.connection.destroy();
            } else {


                res.send(result)
            }
        })

    });

};