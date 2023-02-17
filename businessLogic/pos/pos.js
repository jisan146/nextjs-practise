
var mysql = require('../../dbConfig/mysql');

var globalVariable = require('../../engine/globalVariable');
var md5 = require('md5');
var sha512 = require('js-sha512');
const fs = require('fs');
const oracledb = require('oracledb');
const { query } = require('express');

module.exports = function (app) {

    app.post(globalVariable.apiRewrite + '/totalCost', function (req, res, next) {

        var _willSend = [{}], inputName = Object.keys(req.body[0])
       

        mysql.query("select sub_options_value from application_options_sub t0, application_users u where u.org_id=t0.org_id and t0.application_options=1003 and u.user_id='"+req.headers.user_id+"'", [], function (err, result, fields) {
            if (err) {
                console.log(err);
                req.connection.destroy();
            } else {
               
                for (var i = 0; i < inputName.length; i++) {
                    if (inputName != 'cost'
                        || inputName != 'profit'
                        || inputName != 'free_qty'
                        || inputName != 'qty'
                        || inputName != 'discount'
                        || inputName != 'vat'
                        || inputName != 'tax'
                        || inputName != 'sale_price'
                        || inputName != 'stock_alert'
                    ) {
                        _willSend[0][inputName[i]] = req.body[0][inputName[i]]
                    }
                }
                _willSend[0]['cost'] = '0'
                _willSend[0]['profit'] = '0'
                _willSend[0]['free_qty'] = '0'
                _willSend[0]['qty'] = '0'
                _willSend[0]['discount'] = '0'
                _willSend[0]['vat'] = '0'
                _willSend[0]['tax'] = '0'
                _willSend[0]['sale_price'] = '0'
                
                if (result.length > 0) {
                    _willSend[0]['stock_alert'] = result[0].sub_options_value
                } else
                {
                    _willSend[0]['stock_alert'] = ''
                }
                res.send(_willSend)
            }
        });

       
    });

    app.post(globalVariable.apiRewrite + '/freeQty', function (req, res, next) {

        var _willSend = [{}], inputName = Object.keys(req.body[0])

        for (var i = 0; i < inputName.length; i++) {
            if (inputName != 'cost'
                || inputName != 'profit'
                || inputName != 'qty'
                || inputName != 'discount'
                || inputName != 'vat'
                || inputName != 'tax'
                || inputName != 'sale_price'
            ) {
                _willSend[0][inputName[i]] = req.body[0][inputName[i]]
            }
        }
        _willSend[0]['cost'] = '0'
        _willSend[0]['profit'] = '0'
        _willSend[0]['qty'] = '0'
        _willSend[0]['discount'] = '0'
        _willSend[0]['vat'] = '0'
        _willSend[0]['tax'] = '0'
        _willSend[0]['sale_price'] = '0'
        res.send(_willSend)
    });

    app.post(globalVariable.apiRewrite + '/unitPrice', function (req, res, next) {

        var _willSend = [{}], inputName = Object.keys(req.body[0]);
        

        for (var i = 0; i < inputName.length; i++) {
            if (inputName != 'cost'
                || inputName != 'profit'
                || inputName != 'discount'
                || inputName != 'vat'
                || inputName != 'tax'
                || inputName != 'sale_price'
            ) {
                _willSend[0][inputName[i]] = req.body[0][inputName[i]]
            }
        }
        var
            total_cost = parseFloat(req.body[0].total_cost),
            free_qty = parseFloat(req.body[0].free_qty),
            cost = '',
            qty = parseFloat(req.body[0].qty);
        cost = parseFloat(parseFloat(total_cost) / (free_qty + qty))

        if (!parseFloat(cost)) { cost = '' }

        _willSend[0]['cost'] = cost
        _willSend[0]['profit'] = '0'
        _willSend[0]['discount'] = '0'
        _willSend[0]['vat'] = '0'
        _willSend[0]['tax'] = '0'
        _willSend[0]['sale_price'] = '0'
        res.send(_willSend)
    });

    app.post(globalVariable.apiRewrite + '/profit', function (req, res, next) {

        var _willSend = [{}], inputName = Object.keys(req.body[0])

        for (var i = 0; i < inputName.length; i++) {
            if (
                inputName != 'discount'
                || inputName != 'profit'
                || inputName != 'vat'
                || inputName != 'tax'

            ) {
                _willSend[0][inputName[i]] = req.body[0][inputName[i]]
            }
        }
        var
            profit = req.body[0].profit,
            cost = parseFloat(req.body[0].cost);


        if (profit.indexOf("%") >= 0) {
            profit = profit.replace("%", "");
            profit = parseFloat((cost * (profit / 100)));
            sale_price = cost + profit

        } else {
            profit = parseFloat(req.body[0].profit)
            sale_price = parseFloat(cost + profit)
        }
        if (!parseFloat(sale_price)) { sale_price = '' }
        if (!parseFloat(profit)) { profit = '' }


        _willSend[0]['profit'] = profit
        _willSend[0]['sale_price'] = sale_price
        _willSend[0]['discount'] = '0'
        _willSend[0]['vat'] = '0'
        _willSend[0]['tax'] = '0'

        res.send(_willSend)
    });


    app.post(globalVariable.apiRewrite + '/discount', function (req, res, next) {

        var _willSend = [{}], inputName = Object.keys(req.body[0])

        for (var i = 0; i < inputName.length; i++) {
            if (
                inputName != 'discount'
                || inputName != 'vat'
                || inputName != 'tax'

            ) {
                _willSend[0][inputName[i]] = req.body[0][inputName[i]]
            }
        }
        var
            discount = req.body[0].discount,
            profit = req.body[0].profit,
            cost = parseFloat(req.body[0].cost);


        if (discount.indexOf("%") >= 0) {
            discount = discount.replace("%", "");
            discount = parseFloat(((cost + profit) * (discount / 100)));
            sale_price = cost + profit - discount

        } else {
            discount = parseFloat(req.body[0].discount)
            sale_price = parseFloat(cost + profit - discount)
        }
        if (!parseFloat(sale_price)) { sale_price = '' }
        if (!parseFloat(discount)) { discount = '' }


        _willSend[0]['discount'] = discount
        _willSend[0]['sale_price'] = sale_price
        _willSend[0]['vat'] = '0'
        _willSend[0]['tax'] = '0'

        res.send(_willSend)
    });

    app.post(globalVariable.apiRewrite + '/vat', function (req, res, next) {

        var _willSend = [{}], inputName = Object.keys(req.body[0])

        for (var i = 0; i < inputName.length; i++) {
            if (
                inputName != 'vat'
                || inputName != 'tax'
                || inputName != 'sale_price'

            ) {
                _willSend[0][inputName[i]] = req.body[0][inputName[i]]
            }
        }
        var
            vat = req.body[0].vat,
            sale_price = parseFloat(req.body[0].cost) + parseFloat(req.body[0].profit) - parseFloat(req.body[0].discount);



        if (vat.indexOf("%") >= 0) {
            vat = vat.replace("%", "");
            vat = parseFloat((sale_price * (vat / 100)));
            sale_price = sale_price + vat

        } else {
            vat = req.body[0].vat
        }
        if (!parseFloat(vat)) { vat = '' }
        if (!parseFloat(sale_price)) { sale_price = '' }



        _willSend[0]['sale_price'] = sale_price
        _willSend[0]['vat'] = vat
        _willSend[0]['tax'] = '0'

        res.send(_willSend)
    });

    app.post(globalVariable.apiRewrite + '/tax', function (req, res, next) {

        var _willSend = [{}], inputName = Object.keys(req.body[0])

        for (var i = 0; i < inputName.length; i++) {
            if (
                inputName != 'tax'
                || inputName != 'sale_price'

            ) {
                _willSend[0][inputName[i]] = req.body[0][inputName[i]]
            }
        }
        var
            tax = req.body[0].tax,
            vat = req.body[0].vat,
            sale_price = parseFloat(req.body[0].cost) + parseFloat(req.body[0].profit) - parseFloat(req.body[0].discount);



        if (tax.indexOf("%") >= 0) {
            tax = tax.replace("%", "");
            tax = parseFloat((sale_price * (tax / 100)));
            sale_price = sale_price + tax + vat

        } else {
            tax = req.body[0].tax
        }
        if (!parseFloat(tax)) { tax = '' }
        if (!parseFloat(sale_price)) { sale_price = '' }



        _willSend[0]['sale_price'] = sale_price
        _willSend[0]['tax'] = tax


        res.send(_willSend)
    });

    



    app.post(globalVariable.apiRewrite + '/productInfo', function (req, res, next) {


        var _willSend = [{}], inputName = Object.keys(req.body[0])
        var product_code = req.body[0].product_code

        var query = "select t0.name,t0.barcode,t1.cost,DATE_FORMAT(now(), '%Y-%m-%d') purchase_date, t1.supplier from pos_product t0, pos_product_purchase t1 , application_users u where t0.sl=t1.product_code and u.org_id=t1.org_id and u.user_id='" + req.headers.user_id + "' and (t0.sl='" + product_code + "' or t0.barcode='" + product_code + "' or t0.product_code='" + product_code + "') order by t1.sl desc limit 1;"

        query = query + "select IFNULL(acc_sec, '')acc_sec,count(challan) upd, case count(challan) when 0 then (select concat('"+apiSecurity.orgID(req.headers.user_id)+"',sl_generator + 1) from  application_sl_generator where TABLE_NAME='pos_product_purchase' and COL_NAME='challan' )else max(challan) end challan from pos_product_purchase where adj=0 and dml_by=" + req.headers.user_id + ";"
        query = query + "update application_sl_generator set sl_generator=sl_generator+1 where TABLE_NAME='pos_product_purchase' and COL_NAME='challan';"

        mysql.query(query, [], function (err, result, fields) {
            if (err) {
                console.log(err);
                req.connection.destroy();
            } else {
                if (result[0].length > 0) {
                    for (var i = 0; i < inputName.length; i++) {
                        if (inputName[i] == 'name') {
                            _willSend[0][inputName[i]] = result[0][0].name
                        } else if (inputName[i] == 'supplier') {
                            _willSend[0][inputName[i]] = result[0][0].supplier
                        } else if (inputName[i] == 'cost') {
                            _willSend[0][inputName[i]] = result[0][0].cost
                        } else if (inputName[i] == 'purchase_date') {
                            _willSend[0][inputName[i]] = result[0][0].purchase_date
                        } else if (inputName[i] == 'acc_sec') {
                            _willSend[0][inputName[i]] = result[1][0].acc_sec
                        } else if (inputName[i] == 'challan') {
                            _willSend[0][inputName[i]] = result[1][0].challan
                        } else {
                            _willSend[0][inputName[i]] = req.body[0][inputName[i]]
                        }

                    }
                } else {
                    for (var i = 0; i < inputName.length; i++) {
                        if (inputName[i] == 'product_code' || inputName[i] == 'free_qty') {
                            _willSend[0][inputName[i]] = _willSend[0][inputName[i]]
                        } else {
                            _willSend[0][inputName[i]] = ''
                        }


                    }

                }

                res.send(_willSend)
            }
        });
    });


    

    app.post(globalVariable.apiRewrite + '/productChallan', function (req, res, next) {


        var _willSend = [{}], inputName = Object.keys(req.body[0]);
        var challanVal = req.body[0].challan;


        for (var i = 0; i < inputName.length; i++) {

            _willSend[0][inputName[i]] = req.body[0][inputName[i]]

        }


        var query = "select IFNULL(acc_sec, '')acc_sec,count(challan) upd, case count(challan) when 0 then (select concat('"+apiSecurity.orgID(req.headers.user_id)+"',sl_generator + 1) from  application_sl_generator where TABLE_NAME='pos_product_purchase' and COL_NAME='challan' )else max(challan) end challan from pos_product_purchase where adj=0 and dml_by=" + req.headers.user_id

        mysql.query(query, [], function (err, result, fields) {
            if (err) {
                console.log(err);
                req.connection.destroy();
            } else {

                if (result.length > 0) {

                    if (result[0].upd == '0' && challanVal == '0') {
                        challan()
                    }
                    for (var i = 0; i < inputName.length; i++) {
                        if (inputName[i] == 'acc_sec') {
                            _willSend[0][inputName[i]] = result[0].acc_sec
                        } else if (inputName[i] == 'challan') {
                            _willSend[0][inputName[i]] = result[0].challan
                        }

                    }
                }

                res.send(_willSend)
            }
        });
        function challan() {

            mysql.query("update application_sl_generator set sl_generator=sl_generator+1 where TABLE_NAME='pos_product_purchase' and COL_NAME='challan'", [], function (err, result, fields) {
                if (err) {
                    console.log(err);
                    req.connection.destroy();
                } else {

                }

            });
        }
    });

    app.post(globalVariable.apiRewrite + '/challanAmount', function (req, res, next) {


        var _willSend = [{}], inputName = Object.keys(req.body[0]);
        var challanVal = req.body[0].challan;


        for (var i = 0; i < inputName.length; i++) {

            _willSend[0][inputName[i]] = req.body[0][inputName[i]]

        }


        var query = "select sum(cost*qty) amount from pos_product_purchase t0, application_users t1 where t0.org_id=t1.org_id and  t0.challan='" + req.body[0].invoice + "' and t1.user_id=" + req.headers.user_id

        mysql.query(query, [], function (err, result, fields) {
            if (err) {
                console.log(err);
                req.connection.destroy();
            } else {

                if (result.length > 0) {

                    for (var i = 0; i < inputName.length; i++) {
                        if (inputName[i] == 'amount') {
                            _willSend[0][inputName[i]] = result[0].amount
                        } else if (inputName[i] == 'due') {
                            _willSend[0][inputName[i]] = '0'
                        }

                    }
                }else
                {
                    for (var i = 0; i < inputName.length; i++) {
                        if (inputName[i] == 'amount') {
                            _willSend[0][inputName[i]] = '0'
                        } else if (inputName[i] == 'due') {
                            _willSend[0][inputName[i]] = '0'
                        }

                    } 
                }

                res.send(_willSend)
            }
        });
    });
    app.post(globalVariable.apiRewrite + '/partyPamentAdj', function (req, res, next) {

        var sl = "(select concat('" + apiSecurity.orgID(req.headers.user_id) + "','" + apiSecurity.branch(req.headers.user_id) + "',sl_generator + 1) sl from  application_sl_generator where TABLE_NAME='accounts_journal' and COL_NAME='sl' and org_id='" + apiSecurity.orgID(req.headers.user_id) + "' and branch='" + apiSecurity.branch(req.headers.user_id) + "')"; 
       
        var query = ""
        for (var i = 1; i <= req.body.tabularSl; i++) {
            query = query + "insert into accounts_journal (sl,explanation,debit,credit,journal_sl,journal_date,org_id,branch,dml_by,dml_time,accounts_sub_sector,party,party_type,acc_head,challan) values (" + sl + ",'Party Payment'," + "NULL," + "'" + req.body["amount" + i] + "'," + "" + "0" + "," + "NOW()," + "'" + apiSecurity.orgID(req.headers.user_id) + "'," + "'" + apiSecurity.branch(req.headers.user_id) + "'," + "'" + req.headers.user_id + "'," + globalVariable.dbSyntex['time'][globalVariable.DB]+"," + "'" + req.body["acc_sec" + i] + "'," + "'" + req.body.party_name + "'," + "'2',NULL,'" + req.body.invoice + "');"
            query = query + " update application_sl_generator set sl_generator=sl_generator+1 where TABLE_NAME='accounts_journal' and COL_NAME='sl' and org_id='" + apiSecurity.orgID(req.headers.user_id) + "' and branch='" + apiSecurity.branch(req.headers.user_id) + "';" 
        }

       // query = query + "update pos_product_purchase t0, users t1 set t0.adj=1 where t0.org_id=t1.org_id and  t0.challan='" + req.body.invoice + "' and t1.user_id=" + req.headers.user_id + ";"


        var journal_sl = "(select concat('" + apiSecurity.orgID(req.headers.user_id) + "','" + apiSecurity.branch(req.headers.user_id) + "',sl_generator + 1)  from  application_sl_generator where TABLE_NAME='accounts_journal' and COL_NAME='journal_sl' and org_id='" + apiSecurity.orgID(req.headers.user_id) + "' and branch='" + apiSecurity.branch(req.headers.user_id) + "')"; 




        query = query + " update accounts_journal set journal_sl=" + journal_sl + " where challan='" + req.body.invoice + "' and org_id='" + apiSecurity.orgID(req.headers.user_id) + "' and branch='" + apiSecurity.branch(req.headers.user_id) + "';"
        query = query + " update application_sl_generator set sl_generator=sl_generator+1 where TABLE_NAME='accounts_journal' and COL_NAME='journal_sl' and org_id='" + apiSecurity.orgID(req.headers.user_id) + "' and branch='" + apiSecurity.branch(req.headers.user_id) + "';"
        mysql.query(" call pos_product_cost_gen('"+req.body.invoice+"'); "+query, [], function (err, result, fields) {
            if (err) {
                console.log(err);
                req.connection.destroy();
            } else {
                res.send('ok')
            }
        });

    });

};