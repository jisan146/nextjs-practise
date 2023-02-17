
var mysql = require('../../dbConfig/mysql');
var oracle = require('../../dbConfig/oracle');
var globalVariable = require('../../engine/globalVariable');
var md5 = require('md5');
var sha512 = require('js-sha512');
const fs = require('fs');
const oracledb = require('oracledb');
const { query } = require('express');

module.exports = function (app) {

    app.post(globalVariable.apiRewrite + '/deshboard', function (req, res, next) {

        mysql.query("select 1;select  concat('Week ',CONVERT(ROW_NUMBER()over(PARTITION BY 1 ORDER BY sl),int)) week, plan from bwdb_project_plan order by sl;select  concat('Week ',CONVERT(ROW_NUMBER()over(PARTITION BY 1 ORDER BY sl),char)) week,done_ work_progress from bwdb_project_plan where done_>0  order by sl;select sum(bag) need,(select count(*) from bwdb_geo_bag_chip ) produce,(select count(*) from bwdb_geo_bag_chip  where placed=1 ) placed, sum(bag)-(select count(*) from bwdb_geo_bag_chip  where placed=1 ) remaining from bwdb_project_plan order by sl;", function (err, result, fields) {
            if (err) {
                console.log(err);
            } else {
                
                res.send(result)
            }

        });
    });





};