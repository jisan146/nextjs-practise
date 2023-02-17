
var mysql = require('../dbConfig/mysql');
var oracle = require('../dbConfig/oracle');
var gv = require('./globalVariable');
var md5 = require('md5');
var sha512 = require('js-sha512');
const fs = require('fs');
const oracledb = require('oracledb');
var gloDBconn = require('./gloDBconn');

module.exports = function (app) {







    app.post(gv.apiRewrite + '/noReq', function (req, res, next) {


        var _exeBefore = []
        _exeBefore[0] = 'noReq'
        res.send(_exeBefore)
    });

    app.post(gv.apiRewrite + '/viewResult', function (req, res, next) {




        var reportName, exam, std_id = '';

        var query = [], parm = [], tempQuery, querySl = 0, dynamicQuery = [], token = "";

        querySl = 0;
        query[querySl] = "select sl from edu_student where class=_p_ and section=_p_ and academic_year=_p_ and roll=_p_";
        parm.push([
            req.body[0].class,
            req.body[0].section,
            req.body[0].academic_session,
            req.body[0].std_roll
        ])





        gloDBconn.get_info(query, parm, function (result) {
            if (result == "error") {
                req.connection.destroy();
            } else {

                if (result[0].length > 0) {
                    std_id = result[0][0].sl
                } else { std_id = '0' }

                if (req.body[0].std_roll == '') {
                    if (req.body[0].class == '2110') {
                        reportName = '/reports/scs/exam3'

                    } else if (req.body[0].class == '2111') {
                        reportName = '/reports/scs/exam3'
                    }
                    else if (req.body[0].class == '2112') {
                        reportName = '/reports/scs/exam3'
                    }
                    else {
                        reportName = '/reports/scs/exam2'
                    }
                } else {

                    if (req.body[0].class == '2110') {
                        reportName = '/reports/scs/result3'
                        if (req.headers.org_id == '1') {
                            exam = '&exam1=113&exam2=114&exam3=115'
                        } else {
                            exam = '&exam1=211&exam2=212&exam3=213'
                        }

                    } else if (req.body[0].class == '2111') {
                        reportName = '/reports/scs/result3'
                        if (req.headers.org_id == '1') {
                            exam = '&exam1=113&exam2=114&exam3=115'
                        } else {
                            exam = '&exam1=211&exam2=212&exam3=213'
                        }
                    }
                    else if (req.body[0].class == '2112') {
                        reportName = '/reports/scs/result3'
                        if (req.headers.org_id == '1') {
                            exam = '&exam1=113&exam2=114&exam3=115'
                        } else {
                            exam = '&exam1=211&exam2=212&exam3=213'
                        }
                    }
                    else {
                        reportName = '/reports/scs/result_all'
                        if (req.headers.org_id == '1') {
                            exam = '&exam1=113&exam2=114'
                        } else {
                            exam = '&exam1=211&exam2=212'
                        }
                    }

                }


                var _exeBefore = []
                _exeBefore[0] = '_link'
                _exeBefore[1] = 'http://demo.edubd.online:8080/jasperserver/flow.html?_flowId=viewReportFlow&j_username=scs&j_password=scs&reportUnit=' + reportName + '&class=' + req.body[0].class + '&section=' + req.body[0].section + '&session=' + req.body[0].academic_session+'&academic_session=' + req.body[0].academic_session + '&std=' + std_id + exam + '&output=pdf'
                res.send(_exeBefore)

            }
        })




    });


};