
var mysql = require('../../dbConfig/mysql');
var oracle = require('../../dbConfig/oracle');
var globalVariable = require('../../engine/globalVariable');
var md5 = require('md5');
var sha512 = require('js-sha512');
const fs = require('fs');
const oracledb = require('oracledb');
const { query } = require('express');

module.exports = function (app) {

    app.get(globalVariable.apiRewrite + '/rfidPush/:tag/:user_id', function (req, res, next) {

        mysql.query("insert into bwdb_geo_bag_chip select null,'" + req.params.tag + "',0,org_id,branch,user_id,now() from users where user_id='" + req.params.user_id + "'", function (err, result, fields) {
            if (err) {
                console.log(err);

                mysql.query("update bwdb_geo_bag_chip set placed=1 where chip_id ='"+req.params.tag+"'", function (err, result, fields) {
                    if (err) {
                        console.log(err); res.send("0")
                    } else {
                        res.send("1")
                    }

                });
            } else {
                res.send("1")
            }

        });
    });





};