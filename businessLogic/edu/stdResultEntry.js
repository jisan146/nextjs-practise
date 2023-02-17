
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

    app.post(gv.apiRewrite + '/stdResultEntryForm', function (req, res, next) {



        var query = [], parm = [], tempQuery, querySl = 0, dynamicQuery = [];

        querySl = 0;
        query[querySl] = gv.dbSyntex["transaction"][gv.DB];
        parm.push([])



      
        querySl = querySl + 1
        query[querySl] = "call edu_exam_mark_entry (_p_,_p_,_p_,_p_,_p_,_p_,_p_,_p_,_p_,_p_)"

        parm.push([
            req.body.class,
            req.body.section,
            req.body.session,
            req.body.examName,
            req.body.examType,
            req.body.subject,
            req.body.ExamMark,
            apiSecurity.orgID(req.headers.user_id),
            apiSecurity.branch(req.headers.user_id),
            req.headers.user_id,
        ])


        querySl = querySl + 1
        query[querySl] = `select 
        (select nvl(ORG_USER_ID_FIZAR,user_id) from application_users where user_id=t1.user_id) user_id,
        t0.std_id,
        t1.name,
        t1.roll,
        t0.exam_mark, t0.obtain_mark
       from edu_exam_result t0,edu_student t1 where 
        t1.user_id=t0.std_id and  t1.class=_p_ and t1.section=_p_ and t1.academic_year=_p_ and t0.subject=_p_
        
            order by t1.roll,t1.user_id        
       
       
       `

        parm.push([
            req.body.class,
            req.body.section,
            req.body.session,
            req.body.subject,
        ])
        gloDBconn.get_info(query, parm, function (result) {
            if (result == "error") {
                req.connection.destroy();
            } else {


                res.send(result[2])
            }
        })

    });

    app.post(gv.apiRewrite + '/stdResultEntry', function (req, res, next) {

       
      
        var query = [], parm = [], tempQuery, querySl = 0, dynamicQuery = [];

        querySl = 0;
        query[querySl] = gv.dbSyntex["transaction"][gv.DB];
        parm.push([])

        for (var i = 0; i < req.body.AllResult.length; i++) {
            

            var dbCol = Object.keys(req.body.AllResult[i])
          

            querySl = querySl + 1
            query[querySl] = "update edu_exam_result set "+dbCol[1]+"=_p_ where std_id=_p_ and  CLASS=_p_ and SECTION=_p_ and ACADEMIC_SESSION=_p_ and SUBJECT=_p_ and EXAM_NO=_p_ and EXAM_TYPE=_p_";
            
            parm.push([
                
                req.body.AllResult[i][dbCol[1]] ,
                req.body.AllResult[i].stdID,
                req.body.class,
                req.body.section,
                req.body.session,
                req.body.subject,
                req.body.examName,
                req.body.examType
            ])
        }

        gloDBconn.get_info(query, parm, function (result) {
            if (result == "error") {
                req.connection.destroy();
            } else {

                res.send('')
            }
        })

       

        /*    
    
            querySl = querySl + 1
            query[querySl] = "call edu_exam_mark_entry (_p_,_p_,_p_,_p_,_p_,_p_,_p_,_p_,_p_,_p_)"
    
            parm.push([
                req.body[0].class,
                req.body[0].section,
                req.body[0].academic_session,
                req.body[0].exam_no,
                req.body[0].exam_type,
                req.body[0].subject,
                req.body[0].exam_mark,
                apiSecurity.orgID(req.headers.user_id),
                apiSecurity.branch(req.headers.user_id),
                req.headers.user_id,
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
    */
    });

    app.post(gv.apiRewrite + '/resultEntryOption', function (req, res, next) {



        var query = [], parm = [], tempQuery, querySl = 0, dynamicQuery = [];

        querySl = 0;
        query[querySl] = gv.dbSyntex["transaction"][gv.DB];
        parm.push([])

        querySl = querySl + 1
        query[querySl] = "select distinct t1.class v, t0.class r from edu_class_routine t0, edu_class t1 where emp_id=_p_ and t0.class=t1.sl order by 2"
        parm.push([req.headers.user_id])

        querySl = querySl + 1
        query[querySl] = "select distinct t1.section v, t0.section r from edu_class_routine t0, edu_section t1 where emp_id=_p_ and t0.section=t1.sl and t1.class=_p_ order by 2"
        parm.push([req.headers.user_id, req.body.class])

        querySl = querySl + 1
        query[querySl] = "select distinct t1.system_year v, t0.academic_session r from edu_class_routine t0, global_year t1 where emp_id=_p_ and t0.academic_session=t1.sl order by 2"
        parm.push([req.headers.user_id])

        querySl = querySl + 1
        query[querySl] = `select distinct t1.subject v, t0.subject r from edu_class_routine t0,edu_class_subject t1 where emp_id=_p_ and t1.sl=t0.subject and t1.class=_p_ and t1.section=_p_
        and t1.academic_session=_p_ and t1.assign=1 order by 2`
        parm.push([req.headers.user_id, req.body.class, req.body.section, req.body.session])

        querySl = querySl + 1
        query[querySl] = `select exam_name v,sl r from edu_exam where class=_p_ and section=_p_ and academic_session=_p_ and exam_type=_p_ 
        and org_id=(select org_id from application_users where user_id=_p_) and branch=(select branch from application_users where user_id=_p_) order by exam_sl`
        parm.push([req.body.class, req.body.section, req.body.session, req.body.examType,req.headers.user_id,req.headers.user_id])



        gloDBconn.get_info(query, parm, function (result) {
            if (result == "error") {
                req.connection.destroy();
            } else {


                res.send(result)
            }
        })

    });





};