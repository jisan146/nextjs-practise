var gv = require('./globalVariable');
var apiSecurity = require('./apiSecurity');
var gloDBconn = require('./gloDBconn');
var uuid = require('uuid');
const fs = require('fs');
var glovalQuery = require('./globalQuery');


module.exports = function (app) {
    const path = require('path');
    let rootLoc = path.join(__dirname, '../');

    function fileSave(base64String, ext) {
        var fileName = ''
        try {

            let base64Image = base64String.split(';base64,').pop();
            fileName = uuid.v1() + '.' + ext

            if (!fs.existsSync(rootLoc + '/userFiles/')) {
                fs.mkdirSync(rootLoc + '/userFiles/', { recursive: true });
            }

            fs.writeFile(rootLoc + '/userFiles/' + fileName, base64Image, {
                encoding: 'base64'
            }, function (err) { });
        } catch (ex) { console.log(ex) }
        return fileName;
    }


    app.post(gv.apiRewrite + '/req/v5/privilege', function (req, res, next) {

        if (apiSecurity.authentication(req.headers.user_id) != req.headers.token) {
            req.connection.destroy();
        } else {
            res.send(
                {

                    privilege_sl: 1,
                    privilege_view: 1,
                    privilege_edit: 1,
                    privilege_delete: 1,
                    privilege_list: 1,
                    privilege_grid: 1,
                    privilege_full_view: 1,
                    privilege_add: 1
                }
            )
        }
    });

    app.post(gv.apiRewrite + '/req/v5/:object/:procedure', function (req, res, next) {

        if (apiSecurity.authentication(req.headers.user_id) != req.headers.token) {
            req.connection.destroy();
        } else {

            var body = Object.keys(req.body), dataEntryQuery = '', query = [], parm = [], querySl = 0;

            querySl = 0;
            query[querySl] = gv.dbSyntex["transaction"][gv.DB];
            parm.push([])

            if (req.params.object == 'call') {
                dataEntryQuery = req.params.object + " " + req.params.procedure + " ("

                for (var i = 0; i < body.length; i++) {

                    dataEntryQuery = dataEntryQuery + 'v_' + body[i] + '=> _p_ , '
                }
                dataEntryQuery = dataEntryQuery + 'v_dml_by=> _p_)'


                querySl = querySl + 1
                query[querySl] = dataEntryQuery;
                parm.push([])

                for (var i = 0; i < body.length; i++) {

                    if (typeof req.body[body[i]].file != 'undefined') {

                        // var fileName_ = fileSave(req.body.photo.file.base64, req.body.photo.ext)
                        var fileName_ = fileSave(req.body[body[i]].file.base64, req.body[body[i]].ext)
                        parm[1].push(fileName_)
                    } else {
                        parm[1].push(req.body[body[i]])
                    }


                }

                parm[1].push(req.headers.user_id)




            } else if (req.params.object == 'NewData') {

                dataEntryQuery = "insert into " + req.params.procedure + " (sl,"

                for (var i = 0; i < body.length; i++) {
                    dataEntryQuery = dataEntryQuery + body[i] + ','
                }
                dataEntryQuery = dataEntryQuery + 'org_id,branch,dml_by,dml_time) values ((select nvl(max(sl),0)+1 from ' + req.params.procedure + '),'
                for (var i = 0; i < body.length; i++) {
                    dataEntryQuery = dataEntryQuery + '_p_,'
                }
                dataEntryQuery = dataEntryQuery + 'org_id(_p_),branch(_p_),i_dml_by(_p_),current_timestamp)'

                querySl = querySl + 1
                query[querySl] = dataEntryQuery;
                parm.push([])

                for (var i = 0; i < body.length; i++) {
                    parm[1].push(req.body[body[i]])
                }
                parm[1].push(req.headers.user_id)
                parm[1].push(req.headers.user_id)
                parm[1].push(req.headers.user_id)

            }

            gloDBconn.get_info(query, parm, function (result) {
                if (result == "error") {
                    req.connection.destroy();
                } else {
                    res.send('Information Submitted')
                }
            })
        }
    });

    app.post(gv.apiRewrite + '/req/v5/info/update/:tbl', function (req, res, next) {

        if (apiSecurity.authentication(req.headers.user_id) != req.headers.token) {
            req.connection.destroy();
        } else {


            var body = Object.keys(req.body), dataUpdateQuery = "update " + req.params.tbl + " set ", query = [], parm = [], querySl = 0;



            for (var i = 0; i < body.length; i++) {



                if (body[i] != 'tableSL') {
                    dataUpdateQuery = dataUpdateQuery + body[i] + '= _p_ , '

                }

            }
            dataUpdateQuery = dataUpdateQuery + 'dml_by=i_dml_by(_p_) where sl=_p_'


            querySl = 0;
            query[querySl] = gv.dbSyntex["transaction"][gv.DB];
            parm.push([])

            querySl = querySl + 1
            query[querySl] = dataUpdateQuery;
            parm.push([])

            for (var i = 0; i < body.length; i++) {
                if (body[i] != 'tableSL') {

                    if (typeof req.body[body[i]].file != 'undefined') {


                        var fileName_ = fileSave(req.body[body[i]].file.base64, req.body[body[i]].ext)
                        parm[1].push(fileName_)

                    }

                    else {
                        parm[1].push(req.body[body[i]])
                    }
                }

            }

            parm[1].push(req.headers.user_id)
            parm[1].push(req.body.tableSL)


            gloDBconn.get_info(query, parm, function (result) {
                if (result == "error") {
                    req.connection.destroy();
                } else {
                    res.send('Information Updated')
                }
            })
        }
    });



    app.get(gv.apiRewrite + '/req/v5/:queryList', function (req, res, next) {

        if (apiSecurity.authentication(req.headers.user_id) != req.headers.token) {
            req.connection.destroy();
        } else {
            var query = [], parm = [], querySl = 0;



            querySl = 0;
            query[querySl] = queryList[req.params.queryList].query;
            parm.push([])

            gloDBconn.get_info(query, parm, function (result) {
                if (result == "error") {
                    req.connection.destroy();
                } else {
                    res.send(result)
                }
            })
        }
    });

    app.post(gv.apiRewrite + '/req/v5/:queryList', function (req, res, next) {

        if (apiSecurity.authentication(req.headers.user_id) != req.headers.token) {
            req.connection.destroy();
        } else {

            var query = [], parm = [], querySl = 0, queryParm = [];

            try {
                querySl = 0;
                query[querySl] = queryList[req.params.queryList].query;
                parm.push([])
            } catch {
                querySl = 0;
                query[querySl] = gv.dbSyntex["transaction"][gv.DB];
                parm.push([])
            }

            try {
                queryParm = queryList[req.params.queryList].parm
                for (var i = 0; i < queryParm.length; i++) {
                    parm[0].push(req.body[queryParm[i]])

                }
            } catch {

            }

            gloDBconn.get_info(query, parm, function (result) {
                if (result == "error") {
                    req.connection.destroy();
                } else {
                    res.send(result)
                }
            })
        }
    });


    app.post(gv.apiRewrite + '/req/v5/menu/menuReq/menuGet', function (req, res, next) {

        if (apiSecurity.authentication(req.headers.user_id) != req.headers.token) {
            req.connection.destroy();
        } else {

            var query = [], parm = [], querySl = 0, queryParm = [];

            querySl = 0
            query[querySl] = "select count(t1.sl) item ,t1.sl menu_sl,t1.menu from application_menu t1, application_menu_pages t2 where t1.sl=t2.menu group by t1.sl,t1.menu";
            parm.push([])

            querySl = querySl = querySl + 1
            query[querySl] = "select t2.sl page_sl,t2.page,t2.link,t1.sl menu_sl,t1.menu,t1.left_icon icon from application_menu t1, application_menu_pages t2 where t1.sl=t2.menu";
            parm.push([])

            gloDBconn.get_info(query, parm, function (result) {
                if (result == "error") {
                    req.connection.destroy();
                } else {
                    res.send(result)
                }
            })
        }
    });




    var queryList = [];
    queryList = glovalQuery.queryList;














};