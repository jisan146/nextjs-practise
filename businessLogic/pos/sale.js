
var mysql = require('../../dbConfig/mysql');
var oracle = require('../../dbConfig/oracle');
var globalVariable = require('../../engine/globalVariable');
var md5 = require('md5');
var sha512 = require('js-sha512');
const fs = require('fs');
const oracledb = require('oracledb');
const { query } = require('express');

module.exports = function (app) {

    app.post(globalVariable.apiRewrite + '/counter', function (req, res, next) {

        // console.log(req.body)
        if (req.body.status == 1) {
            if (req.body.uiSL == 1) {
                mysql.query("insert into pos_sales_customer_payment select NULL,0,'"+req.body.payment_method+"','"+req.body.total_payable+"',org_id,branch,user_id,NOW() from users where user_id='"+req.headers.user_id+"';", function (err, result, fields) {
                    if (err) {
                        console.log(err); req.connection.destroy();
                    } else {
                       
                    }

                });
            } else {
                for (var i = 1; i <= req.body.uiSL; i++) {
                    mysql.query("insert into pos_sales_customer_payment select NULL,0,'"+req.body["payment_method"+i]+"','"+req.body["amount"+i]+"',org_id,branch,user_id,NOW() from users where user_id='"+req.headers.user_id+"';", function (err, result, fields) {
                        if (err) {
                            console.log(err); req.connection.destroy();
                        } else {
                           
                        }
                    });
                }
            }
        }


        mysql.query("select t0.sub_sector,t0.sl from accounts_principal_sub_sector t0, accounts_principal_sector t1 where t0.principal_sector=t1.sl and t1.val in('a','b','c') and t0.org_id='" + apiSecurity.orgID(req.headers.user_id) + "';select sub_options_value from application_options_sub where application_options=1004 and org_id='" + apiSecurity.orgID(req.headers.user_id) + "'; call product_sales_temp('" + req.body.qty + "','" + req.body.pcode + "','" + req.headers.user_id + "','" + req.body.status + "','" + req.body.customer + "','" + req.body.total_price + "','" + req.body.total_paid_cash + "','" + req.body.total_cash_return + "',  '" + req.body.total_discout + "',NULL,NULL,'" + req.body.invoice_e + "','" + req.body.qty_e + "','" + req.body.pcode_e + "','"+req.body.total_payable+"','"+req.body.retAmount+"',@msg,@msg_e);SELECT @msg msg,@msg_e msg_e;", function (err, result, fields) {
            if (err) {
                console.log(err); req.connection.destroy();
            } else {
                res.send(result)
            }

        });
    });





};