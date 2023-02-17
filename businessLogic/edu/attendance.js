
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

    app.post(gv.apiRewrite + '/stdAtd', function (req, res, next) {



        var query = [], parm = [], tempQuery, querySl = 0, dynamicQuery = [];

        querySl = 0;
        query[querySl] = gv.dbSyntex["transaction"][gv.DB];
        parm.push([])

        querySl = querySl + 1
        query[querySl] = "call std_attendance (_p_,_p_,_p_,_p_,_p_,_p_,_p_)"


        parm.push([
            req.body[0].class,
            req.body[0].section,
            req.body[0].academic_year,
            req.body[0].atd_time,
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

    app.post(gv.apiRewrite + '/makeStdAtd', function (req, res, next) {



        var query = [], parm = [], tempQuery, querySl = 0, dynamicQuery = [];

        querySl = 0;
        query[querySl] = gv.dbSyntex["transaction"][gv.DB];
        parm.push([])

        querySl = querySl + 1
        query[querySl] = "update edu_attendance set atd_status=_p_ where sl=_p_"


        parm.push([req.body.atdStd, req.body.sl])



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


    app.post(gv.apiRewrite + '/sendNotice', function (req, res, next) {

        var query = [], parm = [], tempQuery, querySl = 0, dynamicQuery = [];

        querySl = 0;
        query[querySl] = gv.dbSyntex["transaction"][gv.DB];
        parm.push([])

        dynamicQuery.push({
            sl: null,
            notice: req.body.notice,
            class: req.body.class,
            section: req.body.section,
            academic_session: req.body.session,
            sms_enable: req.body.sms
        })

        dynamicQuery.push({ tbl: 'edu_notice' })
        tempQueryParm = []

        tempQuery = gloDBconn.dbi(dynamicQuery, req.headers, [], tempQueryParm)

        querySl = querySl + 1
        query[querySl] = tempQuery[0].q;
        parm.push(tempQuery[0].p)

        querySl = querySl + 1
        query[querySl] = tempQuery[1].q;
        parm.push(tempQuery[1].p)

        querySl = querySl + 1
        query[querySl] = "select student_phone,(SELECT NOTIFICATION_API FROM application_users tu where  (user_id=t0.user_id or ORG_USER_ID_FIZAR=t0.user_id ))NOTIFICATION_API from edu_student t0 where  class=_p_ and section=_p_ and academic_year=_p_";
        parm.push([req.body.class, req.body.section, req.body.session])
      

        gloDBconn.get_info(query, parm, function (result) {
            if (result == "error") {
                req.connection.destroy();
            } else {
                var registration_ids = [];
                for (var i = 0; i < result[3].length; i++) {
                   

                    registration_ids.push(result[3][i].notification_api)



                }
                const axios1 = require('axios');

                const params = {
                    registration_ids: registration_ids,
                    notification: {
                        title: "Notification",
                        body: req.body.notice,
                        sound: "default"
                    }
                }


                axios1.post('https://fcm.googleapis.com/fcm/send', params,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": ['key', 'AAAA4q5g4zE:APA91bEf2WcR_qxXDPREy-7rCWMOZB__l-PLbvw8Ux8SqfnKp43SNjD-Mh5X2aMtie0x1RLBj7RwVTv8Z0Zina0npmXe9rM4MebNc1Ales5vV27WaHTJ6ra3p_GxxbxAUWYyn6z90QZW'].join('=')
                        }
                    }).then(response => {
                      //  console.log(response.data);

                    })


                if (req.body.sms == 1) {
                    var phoneList = result[3][0].student_phone
                    for (var i = 1; i < result[3].length - 1; i++) {
                        phoneList = phoneList + ',' + result[3][i].student_phone

                    }
                    phoneList = phoneList + ',' + result[3][result[3].length - 1].student_phone

                    const axios = require('axios');

                    const greenwebsms = new URLSearchParams();
                    greenwebsms.append('token', '353443d209fc545ddb4617531db9c292');
                    greenwebsms.append('to', phoneList);
                    greenwebsms.append('message', req.body.notice);
                    axios.post('http://api.greenweb.com.bd/api.php', greenwebsms).then(response => {
                      //  console.log(response.data);
                        res.send('ok')
                    });


                } else {

                    res.send(result[0])
                }

            }
        })




    })

    app.post(gv.apiRewrite + '/NoticeOption', function (req, res, next) {



        var query = [], parm = [], tempQuery, querySl = 0, dynamicQuery = [];

        querySl = 0;
        query[querySl] = gv.dbSyntex["transaction"][gv.DB];
        parm.push([])

        querySl = querySl + 1
        query[querySl] = "select distinct t0.class v, t0.sl r from  edu_class t0,application_users t1 where t0.org_id=t1.org_id and t1.user_id=_p_"
        parm.push([req.headers.user_id])

        querySl = querySl + 1
        query[querySl] = "select section v, sl r from edu_section where class=_p_"
        parm.push([req.body.class])

        querySl = querySl + 1
        query[querySl] = "select distinct t0.system_year v , t0.sl r from global_year t0, edu_student t1 where t0.sl=t1.academic_year and class=_p_ and section=_p_"
        parm.push([req.body.class, req.body.section])

        querySl = querySl + 1
        query[querySl] = `select distinct t1.subject v, t0.subject r from edu_class_routine t0,edu_class_subject t1 where emp_id=_p_ and t1.sl=t0.subject and t1.class=_p_ and t1.section=_p_
        and t1.academic_session=_p_ and t1.assign=1 order by 2`
        parm.push([req.headers.user_id, req.body.class, req.body.section, req.body.session])



        gloDBconn.get_info(query, parm, function (result) {
            if (result == "error") {
                req.connection.destroy();
            } else {


                res.send(result)
            }
        })

    });
    app.post(gv.apiRewrite + '/mobileAtdOption', function (req, res, next) {



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



        gloDBconn.get_info(query, parm, function (result) {
            if (result == "error") {
                req.connection.destroy();
            } else {


                res.send(result)
            }
        })

    });


    app.post(gv.apiRewrite + '/mobileAtdPreProcess', function (req, res, next) {


        var query = [], parm = [], tempQuery, querySl = 0, dynamicQuery = [];

        querySl = 0;
        query[querySl] = gv.dbSyntex["transaction"][gv.DB];
        parm.push([])

        querySl = querySl + 1
        query[querySl] = "call std_attendance (_p_,_p_,_p_,_p_,_p_,_p_,_p_,_p_)"




        parm.push([
            req.body.class,
            req.body.section,
            req.body.session,
            req.body.date,
            req.headers.user_id,
            apiSecurity.orgID(req.headers.user_id),
            apiSecurity.branch(req.headers.user_id),
            req.body.subject,
        ])

        querySl = querySl + 1
        query[querySl] = `select 
        t0.sl,
        t1.student_phone ,
        t1.roll,
        case t1.gender when 2 then '/static/media/profile.5faf09a7.png' else '/static/media/profile3.a4c6ae64.jpg' end gender,
        t0.std_id, 
        t1.name,
        t2.class class_,
        t3.section ,
        t4.system_year academic_session,
        t0.atd_status ,
        to_char(t0.atd_time,'dd-MON-rr') attendance_date 
    from 
        edu_attendance t0,
        edu_student t1,
        edu_class t2,
        edu_section t3,
        global_year t4,
        application_users t5
        
    where
        t0.std_id=t1.user_id and t2.sl=t1.class and t3.sl=t1.section and t4.sl=t1.academic_year and t5.org_id=t0.org_id and t5.user_id=_p_ and to_char(t0.atd_time,'yyyy-mm-dd')=_p_ and t1.class=_p_ and t1.section=_p_ and t1.academic_year=_p_ and t0.subject=_p_ order by t1.roll,t0.std_id`


        parm.push([req.headers.user_id, req.body.date, req.body.class, req.body.section, req.body.session, req.body.subject])



        gloDBconn.get_info(query, parm, function (result) {
            if (result == "error") {
                req.connection.destroy();
            } else {


                res.send(result)
            }
        })

    });


    app.post(gv.apiRewrite + '/mobileAtdSingle', function (req, res, next) {


        var query = [], parm = [], tempQuery, querySl = 0, dynamicQuery = [];

        querySl = 0;
        query[querySl] = gv.dbSyntex["transaction"][gv.DB];
        parm.push([])


        querySl = querySl + 1
        query[querySl] = `select 
        t0.sl,
        t1.student_phone ,
        t1.roll,
        case t1.gender when 2 then '/static/media/profile.5faf09a7.png' else '/static/media/profile3.a4c6ae64.jpg' end gender,
        t0.std_id, 
        t1.name,
        t2.class class_,
        t3.section ,
        t4.system_year academic_session,
        t0.atd_status ,
        to_char(t0.atd_time,'dd-MON-rr') attendance_date 
    from 
        edu_attendance t0,
        edu_student t1,
        edu_class t2,
        edu_section t3,
        global_year t4,
        application_users t5
        
    where
        t0.std_id=t1.user_id and t2.sl=t1.class and t3.sl=t1.section and t4.sl=t1.academic_year and t5.org_id=t0.org_id and t5.user_id=_p_ and to_char(t0.atd_time,'yyyy-mm-dd')=_p_  and t1.class=_p_ and t1.section=_p_ and t1.academic_year=_p_ and t0.subject=_p_
        
        order by t0.sl OFFSET _p_ ROWS FETCH NEXT 1 ROWS ONLY`


        parm.push([req.headers.user_id, req.body.date, req.body.class, req.body.section, req.body.session, req.body.subject, req.body.stdSL])





        gloDBconn.get_info(query, parm, function (result) {
            if (result == "error") {
                req.connection.destroy();
            } else {


                res.send(result)
            }
        })

    });





};