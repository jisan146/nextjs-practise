
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

    app.post(gv.apiRewrite + '/RoutineViewSingle', function (req, res, next) {



        var query = [], parm = [], tempQuery, querySl = 0, dynamicQuery = [];

        querySl = 0;
        query[querySl] = gv.dbSyntex["transaction"][gv.DB];
        parm.push([])

        if (req.body.userType == 1) {
            querySl = 1;
            query[querySl] = `select distinct 
            t0.period,t0.day, t4.day_name,t6.employee_name teacher, t5.subject, t1.class, (select section from edu_section where sl=t0.section) 
            section, t3.system_year  academic_session,  t0.CLASS_TIME CLASS_TIME ,t0.room_no,
            (select ''||MEETING_ID||'' from edu_zoom_link where subject=t0.subject) zoom_link
            
            
            from edu_class_routine t0, edu_class t1,  global_year t3, global_day t4, edu_class_subject t5, employee t6, application_users t7
            where t0.class=t1.sl and  t0.academic_session=t3.sl and t0.day=t4.day_sl and t0.subject=t5.sl and t6.user_id=t0.emp_id and t7.org_id=t0.org_id 
            and t7.user_id=_p_ and day=(select day_sl from global_day where lower(day_name)=replace(lower(to_char(to_date(_p_,'dd-mm-yyyy'),'day')),' ',''))
            and t0.EMP_ID=_p_ order by t0.day,t0.period`
            parm.push([req.headers.user_id, req.body.day, req.headers.user_id])

        } else {
            querySl = 1;
            query[querySl] = `select  distinct 
            t0.period,t0.day, t4.day_name,t6.employee_name teacher, t5.subject, t1.class, (select section from edu_section where sl=t0.section) 
            section, t3.system_year  academic_session,   t0.CLASS_TIME CLASS_TIME ,t0.room_no,
            (select ''||MEETING_ID||'' from edu_zoom_link where subject=t0.subject) zoom_link
            
            
            from edu_class_routine t0, edu_class t1,  global_year t3, global_day t4, edu_class_subject t5, employee t6, application_users t7, edu_student t8
            where t0.class=t1.sl and  t0.academic_session=t3.sl and t0.day=t4.day_sl and t0.subject=t5.sl and t6.user_id=t0.emp_id and t7.org_id=t0.org_id 
            and t7.user_id=_p_ and day=(select day_sl from global_day where lower(day_name)=replace(lower(to_char(to_date(_p_,'dd-mm-yyyy'),'day')),' ',''))
            and t8.class=t0.class and t8.section=t0.section and t8.academic_year=t0.academic_session and t7.user_id=t8.user_id
             order by t0.day,t0.period`
            parm.push([req.headers.user_id, req.body.day])
        }

        /*  if(req.body.userType==1)
          {
              querySl = 1;
              query[querySl] = `select 
              t0.sl,t0.period,t0.day, t4.day_name,t6.employee_name teacher, t5.subject, t1.class, (select section from edu_section where sl=t0.section) 
              section, t3.system_year  academic_session,  to_char(TO_TIMESTAMP(t0.CLASS_TIME,'HH24:MI'),'hh:mi AM') CLASS_TIME ,t0.room_no,
              (select ''||MEETING_ID||'' from edu_zoom_link where subject=t0.subject) zoom_link
              
              
              from edu_class_routine t0, edu_class t1,  global_year t3, global_day t4, edu_class_subject t5, employee t6, application_users t7
              where t0.class=t1.sl and  t0.academic_session=t3.sl and t0.day=t4.day_sl and t0.subject=t5.sl and t6.user_id=t0.emp_id and t7.org_id=t0.org_id 
              and t7.user_id=_p_ and day=(select day_sl from global_day where lower(day_name)=replace(lower(to_char(to_date(_p_,'dd-mm-yyyy'),'day')),' ',''))
              and t0.EMP_ID=_p_ order by t0.day,t0.period`
               parm.push([req.headers.user_id, req.body.day, req.headers.user_id])
          }else
          {
              querySl = 1;
              query[querySl] = `select 
              t0.sl,t0.period,t0.day, t4.day_name,t6.employee_name teacher, t5.subject, t1.class, (select section from edu_section where sl=t0.section) 
              section, t3.system_year  academic_session,   to_char(TO_TIMESTAMP(t0.CLASS_TIME,'HH24:MI'),'hh:mi AM') CLASS_TIME ,t0.room_no,
              (select ''||MEETING_ID||'' from edu_zoom_link where subject=t0.subject) zoom_link
              
              
              from edu_class_routine t0, edu_class t1,  global_year t3, global_day t4, edu_class_subject t5, employee t6, application_users t7, edu_student t8
              where t0.class=t1.sl and  t0.academic_session=t3.sl and t0.day=t4.day_sl and t0.subject=t5.sl and t6.user_id=t0.emp_id and t7.org_id=t0.org_id 
              and t7.user_id=_p_ and day=(select day_sl from global_day where lower(day_name)=replace(lower(to_char(to_date(_p_,'dd-mm-yyyy'),'day')),' ',''))
              and t8.class=t0.class and t8.section=t0.section and t8.academic_year=t0.academic_session and t7.user_id=t8.user_id
               order by t0.day,t0.period`
               parm.push([req.headers.user_id, req.body.day])
          }
  */





        gloDBconn.get_info(query, parm, function (result) {
            if (result == "error") {
                req.connection.destroy();
            } else {


                res.send(result[1])
            }
        })


    });
    app.get(gv.apiRewrite + '/RoutineViewDemo', function (req, res, next) {



        var query = [], parm = [], tempQuery, querySl = 0, dynamicQuery = [];

        querySl = 0;
        query[querySl] = gv.dbSyntex["transaction"][gv.DB];
        parm.push([])

        querySl = 1;
        query[querySl] = `select 
        t0.sl,t0.period,t0.day, t4.day_name,t6.employee_name teacher, t5.subject, t1.class, (select section from edu_section where sl=t0.section) 
        section, t3.system_year  academic_session,   CLASS_TIME CLASS_TIME ,t0.room_no
        
        
        from edu_class_routine t0, edu_class t1,  global_year t3, global_day t4, edu_class_subject t5, employee t6
        where t0.class=t1.sl and  t0.academic_session=t3.sl and t0.day=t4.day_sl and t0.subject=t5.sl and t6.user_id=t0.emp_id and t5.class=111611 and nvl(t5.section,'0')=111611 and t5.academic_session=115
         order by t0.day,t0.period`

        parm.push([])
        gloDBconn.get_info(query, parm, function (result) {
            if (result == "error") {
                req.connection.destroy();
            } else {
                res.send(result[1])
            }
        })

    });


    app.post(gv.apiRewrite + '/RoutineView', function (req, res, next) {



        var query = [], parm = [], tempQuery, querySl = 0, dynamicQuery = [];

        querySl = 0;
        query[querySl] = gv.dbSyntex["transaction"][gv.DB];
        parm.push([])

        querySl = 1;
        query[querySl] = `select 
         distinct t0.period,t0.day, t4.day_name,t6.employee_name teacher, t5.subject, t1.class, (select section from edu_section where sl=t0.section) 
        section, t3.system_year  academic_session,   CLASS_TIME CLASS_TIME ,'Room: '||t0.room_no room_no
        
        
        from edu_class_routine t0, edu_class t1,  global_year t3, global_day t4, edu_class_subject t5, employee t6, application_users t7
        where t0.class=t1.sl and  t0.academic_session=t3.sl and t0.day=t4.day_sl and t0.subject=t5.sl and t6.user_id=t0.emp_id and t7.org_id=t0.org_id 
        and t7.user_id=_p_ and t5.class=_p_ and nvl(t5.section,'0')=_p_ and t5.academic_session=_p_ 
         order by t0.day,t0.period`

        parm.push([req.headers.user_id, req.body.class, req.body.section, req.body.session])




        gloDBconn.get_info(query, parm, function (result) {
            if (result == "error") {
                req.connection.destroy();
            } else {



                var routine = [], routineF = []
                var periodMarge = []

                for (var i = 0; i < result[1].length; i++) {
                    periodMarge[String(result[1][i].day) + String(result[1][i].period)] = 0

                }

                for (var j = 0; j < result[1].length; j++) {

                    periodMarge[String(result[1][j].day) + String(result[1][j].period)] = periodMarge[String(result[1][j].day) + String(result[1][j].period)] + 1

                }


                for (var k = 0; k < result[1].length; k++) {

                    routine[k] = {
                        period: result[1][k].period,
                        day: result[1][k].day,
                        day_name: result[1][k].day_name,
                        teacher: result[1][k].teacher,
                        subject: result[1][k].subject,
                        class: result[1][k].class,
                        section: result[1][k].section,
                        academic_session: result[1][k].academic_session,
                        class_time: result[1][k].class_time,
                        room_no: result[1][k].room_no
                    }


                    if (periodMarge[String(result[1][k].day) + String(result[1][k].period)] > 1) {
                        for (l = 1; l < periodMarge[String(result[1][k].day) + String(result[1][k].period)]; l++) {

                            routine[k] = {
                                period: result[1][k].period,
                                day: result[1][k].day,
                                day_name: result[1][k].day_name,
                               
                                class: result[1][k].class,
                                section: result[1][k].section,
                                academic_session: result[1][k].academic_session,
                                class_time: result[1][k].class_time,
                                room_no: result[1][k].room_no
                            }
                            if(result[1][k].teacher!=result[1][k + 1].teacher)
                            {
                                routine[k].teacher=result[1][k].teacher + ' / ' + result[1][k + 1].teacher
                            }else
                            {
                                routine[k].teacher=result[1][k].teacher 
                            }

                            if(result[1][k].subject!=result[1][k + 1].subject)
                            {
                                routine[k].subject=result[1][k].subject + ' / ' + result[1][k + 1].subject
                            }else
                            {
                                routine[k].subject=result[1][k].subject
                            }

                            k = k + 1;

                            routine[k] = {
                                period: 0
                            }



                        }

                    }





                }

                for (m = 0; m < routine.length; m++) {
                    if(routine[m].period!=0)
                    {
                        routineF.push(routine[m])
                    }
                   
                }

              
                res.send(routineF)
            }
        })


    });
    app.post(gv.apiRewrite + '/routineNewSubject', function (req, res, next) {



        var query = [], parm = [], tempQuery, querySl = 0, dynamicQuery = [];

        querySl = 0;
        query[querySl] = gv.dbSyntex["transaction"][gv.DB];
        parm.push([])

        dynamicQuery.push({
            sl: null,
            subject: req.body.subject,
            class: req.body.class,
            section: req.body.section,
            academic_session: req.body.session,
            assign: '1'
        })

        dynamicQuery.push({ tbl: 'edu_class_subject' })

        tempQueryParm = []

        tempQuery = gloDBconn.dbi(dynamicQuery, req.headers, [], tempQueryParm)



        querySl = querySl + 1
        query[querySl] = tempQuery[0].q;
        parm.push(tempQuery[0].p)

        querySl = querySl + 1
        query[querySl] = tempQuery[1].q;
        parm.push(tempQuery[1].p)



        gloDBconn.get_info(query, parm, function (result) {
            if (result == "error") {
                req.connection.destroy();
            } else {


                res.send(result)
            }
        })


    });

    app.post(gv.apiRewrite + '/routineOptionNew', function (req, res, next) {



        var query = [], parm = [], tempQuery, querySl = 0, dynamicQuery = [];

        querySl = 0;
        query[querySl] = gv.dbSyntex["transaction"][gv.DB];
        parm.push([])

        querySl = querySl + 1
        query[querySl] = `select class v,sl r from edu_class t0, application_users t1 where  t0.org_id=t1.org_id and t1.user_id=_p_ order by t0.sl`
        parm.push([req.headers.user_id])

        querySl = querySl + 1
        query[querySl] = `select section v,sl r from edu_section t0, application_users t1 where  t0.org_id=t1.org_id and t1.user_id=_p_ and t0.class=_p_ order by t0.sl`
        parm.push([req.headers.user_id, req.body.class])

        querySl = querySl + 1
        query[querySl] = "select system_year v, sl r from global_year order by 2"
        parm.push([])



        querySl = querySl + 1
        query[querySl] = `select t0.inial||' ID : '||t0.user_id||' Name: '|| t0.employee_name v,t0.user_id r from employee t0, application_users t1 where  t0.org_id=t1.org_id and t1.user_id=_p_ order by t0.sl`
        parm.push([req.headers.user_id])


        querySl = querySl + 1
        query[querySl] = `select subject v,t0.sl r from edu_class_subject t0, application_users t1 where  t0.org_id=t1.org_id and t1.user_id=_p_ and t0.class=_p_ and t0.section=_p_ order by t0.sl`
        parm.push([req.headers.user_id, req.body.class, req.body.section])





        gloDBconn.get_info(query, parm, function (result) {
            if (result == "error") {
                req.connection.destroy();
            } else {


                res.send(result)
            }
        })

    });

    app.post(gv.apiRewrite + '/routineOption', function (req, res, next) {



        var query = [], parm = [], tempQuery, querySl = 0, dynamicQuery = [];

        querySl = 0;
        query[querySl] = gv.dbSyntex["transaction"][gv.DB];
        parm.push([])

        querySl = querySl + 1
        query[querySl] = `select DISTINCT t1.class v, t1.sl r from edu_class_subject t0, edu_class t1, application_users t2
        where t0.academic_session=_p_ and t0.class=t1.sl and t2.org_id=t0.org_id and t2.user_id=_p_ order by 2`
        parm.push([req.body.session, req.headers.user_id])

        querySl = querySl + 1
        query[querySl] = `select DISTINCT t1.section v, t1.sl r from edu_class_subject t0, edu_section t1, application_users t2
        where t0.academic_session=_p_ and t0.section=t1.sl and t2.org_id=t0.org_id and t2.user_id=_p_
        and t0.class=_p_ and t0.ASSIGN=1 order by 2`
        parm.push([req.body.session, req.headers.user_id, req.body.class])

        querySl = querySl + 1
        query[querySl] = "select system_year v, sl r from global_year order by 2"
        parm.push([])



        querySl = querySl + 1
        query[querySl] = `select distinct t1.inial||' ID : '||t0.teacher||' Name: '|| t1.employee_name v, t1.user_id r from edu_class_subject_teacher t0, employee t1 where  assign=1
        and t0.teacher=t1.user_id and t0.class=_p_ and t0.section=_p_ and t0.academic_session=_p_
        `
        parm.push([req.body.class, req.body.section, req.body.session])


        querySl = querySl + 1
        query[querySl] = `select distinct t2.subject_name v, t2.sl r from edu_class_subject_teacher t0, edu_class_subject t1, edu_subject t2 where t1.sl=t0.subject and t2.sl=t1.subject and t0.assign=1  and t0.class=_p_ and t0.section=_p_ and t0.academic_session=_p_`
        parm.push([req.body.class, req.body.section, req.body.session])





        gloDBconn.get_info(query, parm, function (result) {
            if (result == "error") {
                req.connection.destroy();
            } else {


                res.send(result)
            }
        })

    });



    app.post(gv.apiRewrite + '/routineSubmit', function (req, res, next) {








        var query = [], parm = [], tempQuery, querySl = 0, dynamicQuery = [];

        querySl = 0;
        query[querySl] = gv.dbSyntex["transaction"][gv.DB];
        parm.push([])

        for (var i = 0; i < req.body.length; i++) {

            if (req.body[i].day != '0') {
                querySl = querySl + 1
                query[querySl] = 'call teacher_Routine_Entry ( _p_,_p_, _p_, _p_, _p_, _p_, _p_, _p_, _p_, _p_, _p_, _p_ )'
                parm.push([
                    req.body[i].teacher,
                    req.body[i].class,
                    req.body[i].section,
                    req.body[i].session,
                    req.body[i].subject,
                    req.body[i].room,
                    req.body[i].period,
                    req.body[i].day,
                    req.body[i].time,
                    apiSecurity.orgID(req.headers.user_id),
                    apiSecurity.branch(req.headers.user_id),
                    req.headers.user_id
                ])
            }






        }




        gloDBconn.get_info(query, parm, function (result) {
            if (result == "error") {
                req.connection.destroy();
            } else {

                res.send('')

            }
        })







    });











};