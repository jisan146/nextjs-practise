
var mysql = require('.././dbConfig/mysql');
var oracle = require('.././dbConfig/oracle');
var gv = require('./globalVariable');
var md5 = require('md5');
var sha512 = require('js-sha512');
const fs = require('fs');
const oracledb = require('oracledb');
var gloDBconn = require('./gloDBconn');

module.exports = function (app) {

    const path = require('path');
    let rootLoc = path.join(__dirname, '../');

    
    app.post(gv.apiRewrite + '/login', function (req, res, next) {

console.log(req.body)

        var query = [], parm = [], tempQuery, querySl = 0, dynamicQuery = [], token = "";

        querySl = 0;
        query[querySl] = gv.dbSyntex["transaction"][gv.DB];
        parm.push([])

      /*  querySl = querySl + 1
        query[querySl] = "SELECT user_id,org_id,branch,landing_page,user_mode FROM application_users where user_id=_p_ and password_=passwd(_p_)"
        parm.push([req.body.user_id, req.body.password])*/

        querySl = querySl + 1
        query[querySl] = `SELECT user_id,landing_page,org_id,branch,user_mode,user_type, case user_type 
        when 1 then (select employee_name from employee where user_id=tu.user_id) 
        when 2 then (select name from edu_student where user_id=tu.user_id) 
        end name,
        (select name from application_client_details where sl=tu.org_id) client_name,
        case user_type 
        when 1 then (select 'Designation : '||t2.designation|| ' Department : '|| t1.department from employee t0, department t1, designation t2 where t0.department=t1.sl and t0.designation=t2.sl
         and user_id=tu.user_id) 
        when 2 then (select 'Class : '||t1.class||' | Section : '||t2.section||' | Session : '||t3.system_year from edu_student t0, edu_class t1, edu_section t2, global_year t3
        where t0.class=t1.sl and t0.section=t2.sl and t0.academic_year=t3.sl and t0.user_id=tu.user_id) 
        end info FROM application_users tu where BILL_STATUS=1 and (user_id=_p_ or ORG_USER_ID_FIZAR=_p_ ) and password_=passwd(_p_)`
        parm.push([req.body.user_id,req.body.user_id, req.body.password])
 
        querySl = querySl + 1
        query[querySl] = "update  application_users  set NOTIFICATION_API=replace(_p_,'/mobile/','') where BILL_STATUS=1 and  (user_id=_p_ or ORG_USER_ID_FIZAR=_p_ ) and password_=passwd(_p_) and instr(_p_,'/mobile/')>0"
        parm.push([req.body.notificationAPI,req.body.user_id,req.body.user_id, req.body.password,req.body.notificationAPI])

        gloDBconn.get_info(query, parm, function (result) {
            if (result == "error") {
                req.connection.destroy();
            } else {

                token = tokenGenerator(String(result[1][0].org_id) + "/" + String(result[1][0].user_id), result[1][0].user_id, req.body.password,result[1][0].org_id,result[1][0].branch);

                res.send([{ user_id: result[1][0].user_id,  landing_page: result[1][0].landing_page, token: token, user_mode: result[1][0].user_mode, name:result[1][0].name, info:result[1][0].info,user_type:result[1][0].user_type, client_name:result[1][0].client_name }])

            }
        })







    });

    app.post(gv.apiRewrite + '/passwdChg', function (req, res, next) {

        var query = [], parm = [], tempQuery, querySl = 0, dynamicQuery = [], token = "";

        querySl = 0;
        query[querySl] = gv.dbSyntex["transaction"][gv.DB];
        parm.push([])

        querySl = querySl + 1
        query[querySl] = "SELECT user_id,org_id,branch,landing_page,user_mode FROM application_users where user_id=_p_ and password_=passwd(_p_)"
        parm.push([req.headers.user_id, req.body.cp])

        querySl = querySl + 1
        query[querySl] = "update application_users set password_=passwd(_p_) where user_id=_p_"
        parm.push([req.body.cfp, req.headers.user_id])



        gloDBconn.get_info(query, parm, function (result) {
            if (result == "error") {
                req.connection.destroy();
            } else {

                if (result[1].length == 1) {
                    res.send('ok')
                } else {
                    req.connection.destroy();
                }

            }
        })

    });

    

    app.post(gv.apiRewrite + '/notificationApiToken', function (req, res, next) {

        var query = [], parm = [], tempQuery, querySl = 0, dynamicQuery = [], token = "";

        querySl = 0;
        query[querySl] = gv.dbSyntex["transaction"][gv.DB];
        parm.push([])

      

        querySl = querySl + 1
        query[querySl] = "update application_users set NOTIFICATION_API=_p_ where user_id=_p_"
        parm.push([req.body.notificationAPI, req.body.user_id])



        gloDBconn.get_info(query, parm, function (result) {
            if (result == "error") {
                req.connection.destroy();
            } else {

                res.send('ok')


            }
        })

    });

    app.post(gv.apiRewrite + '/beforeLogin', function (req, res, next) {

     
 
        var query = [], parm = [], tempQuery, querySl = 0, dynamicQuery = [];

        querySl = 0;
        query[querySl] = gv.dbSyntex["transaction"][gv.DB];
        parm.push([])

        

        querySl = querySl + 1
        query[querySl] = "call user_id_gen()"
        parm.push([])

        querySl = querySl + 1
        query[querySl] = "call org_application_sl_generator_auto()"
        parm.push([])

        querySl = querySl + 1
        query[querySl] = "call assignment_assign()"
        parm.push([])

        querySl = querySl + 1
        query[querySl] = "call EDU_NOTICE_SEEN_GEN()"
        parm.push([])

        


        

     

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

    function tokenGenerator(path, user_id, password, orgID, branch) {
       

        if (!fs.existsSync(rootLoc + '/userFiles/token/' + path)) {
            fs.mkdirSync(rootLoc + '/userFiles/token/' + path, { recursive: true });
        }

        if (!fs.existsSync(rootLoc + '/userFiles/token/'+'/6049668462a66a8d78fc7e1ce56b8bb8')) {
            fs.mkdirSync(rootLoc + '/userFiles/token/'+'/6049668462a66a8d78fc7e1ce56b8bb8');
        }

        fs.writeFileSync(rootLoc + '/userFiles/token/' + path + "/" + md5(sha512(String(user_id))), sha512(String(user_id + password)));
        fs.writeFileSync(rootLoc + '/userFiles/token/6049668462a66a8d78fc7e1ce56b8bb8/' + user_id, '{"orgID":"'+orgID+'", "branch":"'+branch+'"}');
        return fs.readFileSync(rootLoc + '/userFiles/token/' + path + "/" + md5(sha512(String(user_id))), 'utf8');
    }



  
    app.get(gv.apiRewrite + '/userFiles/:orgID/:fileName', (req, res) => {
        
       
        res.sendFile(rootLoc+'userFiles'+'/'+'orgAssets/'+req.params.orgID+'/'+req.params.fileName)

    });



};