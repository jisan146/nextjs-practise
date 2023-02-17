
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

    app.post(gv.apiRewrite + '/accStdInfo', function (req, res, next) {

     

        var query = [], parm = [], tempQuery, querySl = 0, dynamicQuery = [];

        querySl = 0;
        query[querySl] = gv.dbSyntex["transaction"][gv.DB];
        parm.push([])

        querySl = querySl + 1
        query[querySl] = `select t0.name,t2.class,t3.section, t4.system_year academic_session,nvl(to_char(t0.roll),'-')roll,
        t6.sub_sector,t5.amount,t5.sub_sector sub_sector_val from edu_student t0,
                application_users t1, edu_class t2, edu_section t3, global_year t4, edu_class_fees t5,accounts_principal_sub_sector t6
                where 
                t1.org_id=t0.org_id and 
                t1.user_id=_p_ and
                t0.user_id=(select user_id from application_users where user_id=_p_ or ORG_USER_ID_FIZAR=_p_) and
                t2.sl=t0.class and
                t3.sl=t0.section and
                t4.sl=t0.academic_year and
                t5.class=t0.class and 
                t5.academic_session= t0.academic_year and
                t6.sl=t5.sub_sector`

        console.log(req.headers.user_id)
        parm.push([
            req.headers.user_id,
            req.body.id,
            req.body.id
        ])

        querySl = querySl + 1
        query[querySl] = `select 
        t2.sector base_fees,
        t3.sub_sector sub_fees,
        t0.fees_amount,
        t0.paid_amount,
        t0.fees_amount-
        t0.paid_amount due
        from 
            edu_std_fees_collection t0, edu_class_fees t1, accounts_principal_sector t2, accounts_principal_sub_sector t3, edu_student t4
        where
            t0.fess_sub_sector=t1.sub_sector and
            t2.sl=t3.principal_sector and
            t3.sl=t0.fess_sub_sector and
            t4.class=t1.class and
            t0.std_id=t4.user_id and
            t0.std_id=_p_`

        
        parm.push([
           
            req.body.id
        ])

     

        gloDBconn.get_info(query, parm, function (result) {
            if (result == "error") {
                req.connection.destroy();
            } else {

             
               res.send(result)
            }
        })

    });

    app.post(gv.apiRewrite + '/accStdInvoice', function (req, res, next) {

     

        var query = [], parm = [], tempQuery, querySl = 0, dynamicQuery = [];

        querySl = 0;
        query[querySl] = gv.dbSyntex["transaction"][gv.DB];
        parm.push([])

        querySl = querySl + 1
        query[querySl] = `call  edu_std_fess_collection(_p_,_p_ ,_p_ ,_p_,_p_,_p_)`

        
        parm.push([
            
            req.body.id,
            req.body.fees,
            req.body.paid,
            req.headers.user_id,
            apiSecurity.orgID(req.headers.user_id),
            apiSecurity.branch(req.headers.user_id)
        ])

  

        gloDBconn.get_info(query, parm, function (result) {
            if (result == "error") {
                req.connection.destroy();
            } else {

             
               res.send('ok')
            }
        })

    });





};