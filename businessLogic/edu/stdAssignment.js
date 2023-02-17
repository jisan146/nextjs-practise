
var mysql = require('../../dbConfig/mysql');
var oracle = require('../../dbConfig/oracle');
var gv = require('../../engine/globalVariable');
var md5 = require('md5');
var sha512 = require('js-sha512');
const fs = require('fs');
var uuid = require('uuid');
const oracledb = require('oracledb');
const { query } = require('express');
var gloDBconn = require('../../engine/gloDBconn');
var apiSecurity = require('../../engine/apiSecurity');

module.exports = function (app) {

    const path = require('path');
    let rootLoc = path.join(__dirname, '../../');

    app.post(gv.apiRewrite + '/stdAssignmentSubmit', function (req, res, next) {
        fileSave();

        var query = [], parm = [], tempQuery, querySl = 0, dynamicQuery = [];

        querySl = 0;
        query[querySl] = gv.dbSyntex["transaction"][gv.DB];
        parm.push([])

          querySl = querySl + 1
          query[querySl] = `update edu_assignment_assign set status=1, ASSIGNMENT_ATTACHMENT=_p_ where sl=_p_`
          parm.push([fileName, req.body.assSL])


       // console.log(req.body)


        gloDBconn.get_info(query, parm, function (result) {
            if (result == "error") {
                req.connection.destroy();
            } else {


                res.send(result)
            }
        })

        var fileName = ''
        function fileSave() {
            try {
                let base64String = req.body.file;

                let base64Image = base64String
                    .split(';base64,')
                    .pop();
                var ext = req.body.fileEXT.substr(req.body.fileEXT.lastIndexOf('.') + 1);

                fileName = uuid.v1() + '.' + ext





                if (!fs.existsSync(rootLoc + '/userFiles/orgAssets/' + apiSecurity.orgID(req.headers.user_id) + '/')) {
                    fs.mkdirSync(rootLoc + '/userFiles/orgAssets/' + apiSecurity.orgID(req.headers.user_id) + '/', { recursive: true });
                }



                fs.writeFile(rootLoc + '/userFiles/orgAssets/' + apiSecurity.orgID(req.headers.user_id) + "/" + fileName, base64Image, {
                    encoding: 'base64'
                }, function (err) { });
            } catch (ex) { console.log(ex) }
        }

    });

    app.post(gv.apiRewrite + '/stdAssignmentListSingle', function (req, res, next) {


        var query = [], parm = [], tempQuery, querySl = 0, dynamicQuery = [];

        querySl = 0;
        query[querySl] = gv.dbSyntex["transaction"][gv.DB];
        parm.push([])

        querySl = querySl + 1
        query[querySl] = `select t0.sl,

        t1.sl home_work_code,
        t1.topic,
        t3.employee_name,
        t2.subject subject,
        EXTRACT(day FROM t1.due_date-t1.dml_time)
         days_left,
        to_char(t1.dml_time,'dd-MON-rr') create_date ,
        to_char(t1.due_date,'dd-MON-rr') due_date ,
        t1.details home_work,
         case when t1.assignment_attachment is null then '' else t1.assignment_attachment end
        home_work_metarial, 
        
        
        t0.details your_answer,
         case when length(nvl(t0.assignment_attachment,' '))<3  then '' else html_file(t0.assignment_attachment,t0.org_id) end
        assignment_attachment,
        case nvl(t0.status,0) when null then 'Pending' when 0 then 'Pending' when 1 then 'Submit' end status,
        t0.marks,t0.remarks teacher_comment 
        from edu_assignment_assign t0, edu_assignment t1, edu_class_subject t2, employee t3
        where t1.dml_by=t3.user_id and t0.assignment=t1.sl and t1.subject=t2.sl and t0.std_id=_p_ and t0.sl=_p_ order by sl desc`
        parm.push([req.headers.user_id, req.body.assSL])



        gloDBconn.get_info(query, parm, function (result) {
            if (result == "error") {
                req.connection.destroy();
            } else {


                res.send(result)
            }
        })

    });

    app.post(gv.apiRewrite + '/stdAssignmentList', function (req, res, next) {


        var query = [], parm = [], tempQuery, querySl = 0, dynamicQuery = [];

        querySl = 0;
        query[querySl] = gv.dbSyntex["transaction"][gv.DB];
        parm.push([])

        querySl = querySl + 1
        query[querySl] = `select t0.sl,

        t1.sl home_work_code,
        t1.topic,
        t3.employee_name,
        t2.subject subject,
        EXTRACT(day FROM t1.due_date-t1.dml_time)
         days_left,
        to_char(t1.dml_time,'dd-MON-rr') create_date ,
        to_char(t1.due_date,'dd-MON-rr') due_date ,
        t1.details home_work,
         case when length(nvl(t1.assignment_attachment,' '))<3  then '' else html_file(t1.assignment_attachment,t0.org_id) end
        home_work_metarial, 
        
        
        t0.details your_answer,
         case when length(nvl(t0.assignment_attachment,' '))<3  then '' else html_file(t0.assignment_attachment,t0.org_id) end
        assignment_attachment,
        case nvl(t0.status,0) when null then 'Pending' when 0 then 'Pending' when 1 then 'Submit' end status,
        t0.marks,t0.remarks teacher_comment 
        from edu_assignment_assign t0, edu_assignment t1, edu_class_subject t2, employee t3
        where t1.dml_by=t3.user_id and t0.assignment=t1.sl and t1.subject=t2.sl and t0.std_id=_p_ order by sl desc`
        parm.push([req.headers.user_id])



        gloDBconn.get_info(query, parm, function (result) {
            if (result == "error") {
                req.connection.destroy();
            } else {


                res.send(result)
            }
        })

    });





};