
var mysql = require('../dbConfig/mysql');
var oracle = require('../dbConfig/oracle');
var globalVariable = require('./globalVariable');
const oracledb = require('oracledb');
var apiSecurity = require('./apiSecurity');
var gloDBconn = require('./gloDBconn');

module.exports = function (app) {



    app.post(globalVariable.apiRewrite + '/accessControl', function (req, res, next) {


        if (apiSecurity.authentication(req.body.uid, apiSecurity.orgID(req.body.uid)) != req.headers.token) {
            req.connection.destroy();
        } else {

            var query = [], parm = [], tempQuery, querySl = 0, dynamicQuery = [];


    
            querySl = 0
            query[querySl] = "select m.sl,m.menu,m.left_icon,m.right_icon,m.viewsl,p.page,p.icon,p.link,p.query_id from application_menu_access_group g, application_menu_access_control c, application_menu_pages p,application_menu m, application_users u where g.sl=c.group_id and p.sl=c.page_id and m.sl=p.menu and u.access_=g.sl and c.enable=1 and u.user_id=_p_ and p.menu_enable=1 order by m.viewsl,p.sl"
    
            parm.push([req.body.uid])

            querySl = 1
            query[querySl] = `select   user_type, user_id, 
            case user_type 
            when 1 then (select employee_name from employee where user_id=tu.user_id) 
            when 2 then (select name from edu_student where user_id=tu.user_id) 
            end name,
            case user_type 
            when 1 then (select 'Designation : '||t2.designation|| ' Department : '|| t1.department from employee t0, department t1, designation t2 where t0.department=t1.sl and t0.designation=t2.sl
             and user_id=tu.user_id) 
            when 2 then (select 'Class : '||t1.class||' | Section : '||t2.section||' | Session : '||t3.system_year from edu_student t0, edu_class t1, edu_section t2, global_year t3
            where t0.class=t1.sl and t0.section=t2.sl and t0.academic_year=t3.sl and t0.user_id=tu.user_id) 
            end info from application_users tu where user_id=_p_ `
    
            parm.push([req.body.uid])
    
         
    
            gloDBconn.get_info(query, parm, function (result) {
                if (result == "error") {
                    req.connection.destroy();
                } else {
    
                
                 res.send(result)
                }
            })
            /*
            query = "select m.sl,m.menu,m.left_icon,m.right_icon,m.viewsl,p.page,p.icon,p.link,p.query_id from application_menu_access_group g, application_menu_access_control c, application_menu_pages p,application_menu m, application_users u where g.sl=c.group_id and p.sl=c.page_id and m.sl=p.menu and u.access_=g.sl and c.enable=1 and u.user_id=" + req.headers.user_id + " and p.menu_enable=1 order by m.viewsl,p.sl"
            parm = [];
 
            if (globalVariable.DB == "oracle") {
              
                async function run() {

                    let connection;

                    try {
                        connection = await oracledb.getConnection(oracle);
                        const result = await connection.execute(
                            query, [], { outFormat: oracledb.OUT_FORMAT_OBJECT }
                        );
                        OracleMultiQueryResultCombine(result.rows)

                        console.log(OracleMultiQueryResultCombine(result.rows))

                        res.send(OracleMultiQueryResultCombine(result.rows))

                    } catch (err) { console.error(err); }

                    finally { if (connection) { try { await connection.close(); } catch (err) { console.error(err); } } }
                }

                run();
              
            }
            else {
              
                mysql.query(query, parm, function (err, result, fields) {
                    if (err) {
                        console.log(err);
                        req.connection.destroy();
                    } else {
                        res.send(result)
                    }

                });
                
            }








            function OracleMultiQueryResultCombine(result) {


               

                var fianlResult = [];
                for (var i = 0; i < result.length; i++) {
                    var dbObj = result[i]
                    function mapLower(obj, mapFunc) {
                        return Object.keys(obj).reduce(function (result, key) {
                            result[mapFunc(key)] = obj[key]
                            return result;
                        }, {})
                    }
                    var newObj = mapLower(dbObj, function (field) {
                        return field.toLowerCase();
                    })
                    var resObj = []
                    resObj.push(newObj)
                    fianlResult.push(resObj[0])

                   
                }

                return fianlResult;
            }*/
        }

    });



    app.post(globalVariable.apiRewrite + '/pageMenu', function (req, res, next) {
        if (globalVariable.runMode == '_dev_' && req.headers.user_id != '1000') {
            tblName = 'application_menu_dev_' + req.headers.user_id
        } else {
            tblName = 'application_menu'
        }

        if (apiSecurity.authentication(req.headers.user_id, apiSecurity.orgID(req.headers.user_id)) != req.headers.token) {
            req.connection.destroy();
        } else {
            query = "select menu,sl from application_menu"
            parm = [];

            if (globalVariable.DB == "oracle") {
             
                async function run() {

                    let connection;

                    try {
                        connection = await oracledb.getConnection(oracle);
                        const result = await connection.execute(
                            query, [], { outFormat: oracledb.OUT_FORMAT_OBJECT }
                        );
                        OracleMultiQueryResultCombine(result.rows)

                        res.send(OracleMultiQueryResultCombine(result.rows))

                    } catch (err) { console.error(err); }

                    finally { if (connection) { try { await connection.close(); } catch (err) { console.error(err); } } }
                }

                run();
             
            }
            else {
            
                mysql.query(query, parm, function (err, result, fields) {
                    if (err) {
                        console.log(err);
                        req.connection.destroy();
                    } else {
                        res.send(result)
                    }

                });
              
            }








            function OracleMultiQueryResultCombine(result) {


                /* json object key to lower start */

                var fianlResult = [];
                for (var i = 0; i < result.length; i++) {
                    var dbObj = result[i]
                    function mapLower(obj, mapFunc) {
                        return Object.keys(obj).reduce(function (result, key) {
                            result[mapFunc(key)] = obj[key]
                            return result;
                        }, {})
                    }
                    var newObj = mapLower(dbObj, function (field) {
                        return field.toLowerCase();
                    })
                    var resObj = []
                    resObj.push(newObj)
                    fianlResult.push(resObj[0])

                    /* json object key to lower end */
                }

                return fianlResult;
            }
        }

    });



    app.post(globalVariable.apiRewrite + '/accessControlPreProcess', function (req, res, next) {

      /*  mysql.query("call access_control_preProcess('" + req.body[0].group_id + "', '" + apiSecurity.orgID(req.headers.user_id) + "', '" + apiSecurity.branch(req.headers.user_id) + "','" + req.headers.user_id + "');", [], function (err, result, fields) {
            if (err) {
                console.log(err);
                req.connection.destroy();
            } else {
                var _exeBefore = []
                _exeBefore[0] = 'noReq'
                res.send(_exeBefore)
            }

        });*/
console.log(req.body[0].group_id )
        async function run() {
            let connection;
            try {
                connection = await oracledb.getConnection(oracle);

               
                const result1 = await connection.execute("call access_control_preProcess('" + req.body[0].group_id + "', '" + apiSecurity.orgID(req.headers.user_id) + "', '" + apiSecurity.branch(req.headers.user_id) + "','" + req.headers.user_id + "')", [], { outFormat: oracledb.OUT_FORMAT_OBJECT });
                const result2 = await connection.execute("commit", [], { outFormat: oracledb.OUT_FORMAT_OBJECT });

                var _exeBefore = []
                _exeBefore[0] = 'noReq'
                res.send(_exeBefore)
            }
            catch (err) { console.error(err);  req.connection.destroy(); }
            finally { if (connection) { try { await connection.close(); } catch (err) { console.error(err); req.connection.destroy(); } } }
        }
        run();

    })

   

};