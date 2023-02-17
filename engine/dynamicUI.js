
var mysql = require('.././dbConfig/mysql');
var oracle = require('.././dbConfig/oracle');
var gv = require('./globalVariable');
var gloDBconn = require('./gloDBconn');
const oracledb = require('oracledb');
const { query } = require('express');
const globalVariable = require('./globalVariable');
var apiSecurity = require('./apiSecurity');


module.exports = function (app) {
 

    app.post(gv.apiRewrite + '/ui', function (req, res, next) {

      
    
        if (apiSecurity.authentication(req.headers.user_id, apiSecurity.orgID(req.headers.user_id)) != req.headers.token) {
            req.connection.destroy();
        } else {
            //console.log(apiSecurity.orgID(req.headers.user_id))
            //console.log(apiSecurity.branch(req.headers.user_id))

            // apiSecurity.orgID(req.headers.user_id)
            // apiSecurity.branch(req.headers.user_id)

        var pageIDLength = 0
        try { pageIDLength = req.body.pageID.length } catch { pageIDLength = 0 }

        if (pageIDLength > 12) {

            var query = [], parm = [], querySl = 0;

            querySl = 0;
            query[querySl] = gv.dbSyntex["transaction"][gv.DB];
            parm.push([])

            querySl = querySl + 1
            query[querySl] = "select m.sl, m.page, m.link, m.icon, m.menu, m.query_id, m.ui_query, m.report_query, m.default_report_condition, m.dynamic_report_condition, m.order_by, m.pagination, m.conditional_column, m.update_query, m.select_option_query, m.other_query, m.sl_enable, m.page_info, m.tabular_enable, m.group_by, m.org_id, m.branch, m.dml_by, m.dml_time, m.business_logic_before_submit, m.submit, m.ui_title, m.report_title,a.update_privilege edit_privilege, a.delete_privilege, a.report_privilege report_enable, a.insert_privilege insert_enable from application_menu_pages m, application_menu_access_control a, application_users u where m.sl=a.page_id and u.access_=a.group_id and u.user_id=_p_ and m.query_id=_p_";
            parm.push([req.headers.user_id, req.body.pageID])

            gloDBconn.get_info(query, parm, function (result) {
                if (result == "error") {
                    req.connection.destroy();
                } else {
                    var UIquery = [], UIparm = [], UItempQuery, UIquerySl = 0, pageTitle, report_query, select_list_query = [], select_list_data = "", executeCondition = "", tblReport;


                    UIquerySl = 0;
                    UIquery[UIquerySl] = "select 1 from dual";
                    UIparm.push([])

                    UIquerySl = UIquerySl + 1
                    UIquery[UIquerySl] = result[1][0].ui_query;
                    UIparm.push([])

                    pageTitle = "select   '" + result[1][0].submit + "' as " + ' "_submit" ' + ", '" + result[1][0].page + "' as page_tittle, '" + result[1][0].business_logic_before_submit + "' as " + ' "_before_submit" ' + ", '" + result[1][0].ui_title + "' as " + ' "_ui_title" ' + ",'" + result[1][0].report_title + "' as " + ' "_report_title" ' + ", ' " + result[1][0].insert_enable + "' " + ' as "_insert_enable" ' + ",'" + result[1][0].report_enable + "' " + '  as "_report_enable" ' + " ,'" + result[1][0].sl_enable + "' " + ' as "_sl_enable" ' + ",'" + result[1][0].edit_privilege + "' " + ' as "_edit_privilege" ' + ",'" + result[1][0].delete_privilege + "' " + ' as  "_delete_privilege" ' + " from dual"


                    UIquerySl = UIquerySl + 1
                    UIquery[UIquerySl] = pageTitle;
                    UIparm.push([])

                    /****** Report Start */
                    try {
                        var report_query = result[1][0].report_query.replace(/_u_/g, "'" + req.headers.user_id + "'")

                        if (req.body.pageID != req.body.queryReq1) {

                            tblReport = report_query + ""
                            tblReport = tblReport.replace(/_queryReq1_/g, "'" + req.body.queryReq1 + "'")
                            tblReport = tblReport.replace(/_queryReq2_/g, "'" + req.body.queryReq2 + "'")

                        } else {
                            tblReport = report_query + ""
                        }

                        if (req.body.searchEnb == "y") {
                            var serCondition = " "; var i = 0
                            for (var i = 0; i < req.body.dataSearchCol.length - 1; i++) {
                                serCondition = serCondition + req.body.dataSearchCol[i] + " or "
                            }
                            serCondition = serCondition + req.body.dataSearchCol[i] + " "

                            tblReport = "select * from (" + tblReport + ") t where 1=1 and " + serCondition + " "

                        } else if (req.body.searchEnb == "adv_y") {
                            tblReport = "select * from (" + tblReport + ") t where 1=1  " + req.body.dataSearchCol + " "
                        } else {
                            tblReport = tblReport + ""
                        }
                    }
                    catch (ex) { console.log(ex); }

                    UIquerySl = UIquerySl + 1
                    UIquery[UIquerySl] = tblReport;
                    UIparm.push([])

                    /****** Report End */

                    /****** Select list start  */
                    try {
                        select_list_query = JSON.parse(result[1][0].select_option_query);


                        if (select_list_query.length > 0) {

                            UIquerySl = 4
                            UIquery[UIquerySl] = "select " + select_list_query.length + " as selectqty from dual"
                            UIparm.push([])

                        }

                        for (var i = 0; i < select_list_query.length; i++) {



                            /* executeCondition = select_list_query[i].list.replace(/_u_/g,globalVariable.dbi(req.headers.user_id))
                             executeCondition = executeCondition.replace(/_ps_/g, globalVariable.dbi(req.body.parentName))
 
                             UIquerySl = UIquerySl + 1
                             UIquery[UIquerySl] = executeCondition;
                             UIparm.push([])*/



                            executeCondition = select_list_query[i].list.replace(/_u_/g, globalVariable.dbi(req.headers.user_id))
                           
                            if(req.body.parentListQty>0)
                            {
                                for (var j = 0; j < req.body.parentListQty; j++) {
                              
                                    executeCondition = executeCondition.replace(/_ps_/, globalVariable.dbi(req.body.parentName[j]))
                                  
                                   
                                }
                            }
                            else
                            {
                                executeCondition = executeCondition.replace(/_ps_/g, '1') 
                               
                            }

                            executeCondition = executeCondition.replace(/_ps_/g, '1') 
                          
                            
                            

                          

                            UIquerySl = UIquerySl + 1
                            UIquery[UIquerySl] = executeCondition;
                            UIparm.push([])











                        }
                    } catch (ex) {

                    }

                    if (select_list_query.length > 0) {



                    } else {


                        UIquerySl = 4
                        UIquery[UIquerySl] = "select 0 as selectqty from dual"
                        UIparm.push([])
                    }
                    /****** elect list End  */


                    gloDBconn.get_info(UIquery, UIparm, function (result) {
                        if (result == "error") {
                            req.connection.destroy();
                        } else {
                            // console.log(result)
                            res.send(result)
                        }
                    })

                    /*
                        mysql.query("select 1 ; " + ui_query + "; " + pageTitle + " ; " + tblReport + " ; " + select_list_data + "", function (err, result, fields) {
                    if (err) {
                        console.log(err); req.connection.destroy();
                    } else {

                        res.send(result)
                    }

                });
                    */

                }
            })

        } else {
            req.connection.destroy();
        }
    }
    })





};