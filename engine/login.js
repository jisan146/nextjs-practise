
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



        var query = [], parm = [], querySl = 0, token = "";

        querySl = 0;
        query[querySl] = gv.dbSyntex["transaction"][gv.DB];
        parm.push([])

        querySl = querySl + 1
        query[querySl] = "update application_users set TOKEN_DESKTOP=passwd(_p_||passwd(_p_)) where user_id=_p_ and password_=passwd(_p_)";
        parm.push([req.body.userID, req.body.password, req.body.userID, req.body.password])

        querySl = querySl + 1
        query[querySl] = "select ORG_ID, BRANCH, TOKEN_DESKTOP from application_users where user_id=_p_ and password_=passwd(_p_)";
        parm.push([req.body.userID, req.body.password])


        querySl = querySl = querySl + 1

        query[querySl] = "select count(t1.sl) item ,t1.sl menu_sl,t1.menu from application_menu t1, application_menu_pages t2 where t1.sl=t2.menu group by t1.sl,t1.menu";
        parm.push([])
        querySl = querySl = querySl + 1

        query[querySl] = "select t2.sl page_sl,t2.page,t2.link,t1.sl menu_sl,t1.menu,t1.left_icon icon from application_menu t1, application_menu_pages t2 where t1.sl=t2.menu";
        parm.push([])

        gloDBconn.get_info(query, parm, function (result) {
            if (result == "error") {
                req.connection.destroy();
            } else {

                token = tokenGenerator(String(result[2][0].token_desktop), req.body.password, String(result[2][0].org_id), result[2][0].branch);

                var newResult = []
                newResult.push(result[3])
                newResult.push(result[4])
                newResult.push([{
                    login: "1",
                    user_id: result[2][0].token_desktop,
                    token: token,
                }])





                res.send(newResult)

            }
        })






    });

    function tokenGenerator(user_id, password, orgID, branch) {

        if (!fs.existsSync(rootLoc + '/userFiles/token')) {
            fs.mkdirSync(rootLoc + '/userFiles/token', { recursive: true });
        }

        fs.writeFileSync(rootLoc + '/userFiles/token/' + md5(sha512(String(user_id))), sha512(String(user_id + password)));

        return fs.readFileSync(rootLoc + '/userFiles/token/' + md5(sha512(String(user_id))), 'utf8');
    }

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






    app.get(gv.apiRewrite + '/userFiles/:orgID/:fileName', (req, res) => {


        res.sendFile(rootLoc + 'userFiles' + '/' + 'orgAssets/' + req.params.orgID + '/' + req.params.fileName)

    });



};