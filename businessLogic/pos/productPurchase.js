
var mysql = require('../../dbConfig/mysql');
var oracle = require('../../dbConfig//oracle');
var gv = require('../../engine/globalVariable');
var gloDBconn = require('../../engine/gloDBconn');
const oracledb = require('oracledb');
var apiSecurity = require('../../engine/apiSecurity');
const fs = require('fs');
var uuid = require('uuid');





module.exports = function (app) {


    app.post(gv.apiRewrite + '/productPurchase1', function (req, res, next) {

        var query = [], parm = [];

        query[0] = gv.dbSyntex["transaction"][gv.DB];
        parm.push([])

        var dbcol_n = ['supplier', 'free_qty', 'qty', 'acc_sec', 'challan', 'manufacture_date', 'exp_date', 'mrp']
        var tempQuery = gloDBconn.dbi(req.body, req.headers, dbcol_n, '')

        query[1] = tempQuery[0].q;
        parm.push(tempQuery[0].p)
        query[2] = tempQuery[1].q;
        parm.push(tempQuery[1].p)

        var postQuery = [];
        postQuery.push({
            sl: req.body[0].sl,
            product_code: '_sql_',
            supplier: req.body[0].supplier,
            qty: parseFloat(parseFloat(req.body[0].free_qty) + parseFloat(req.body[0].qty)),
            cost: req.body[0].cost,
            purchase_date: '_sql_',
            adj: '0',
            challan: '0',
            acc_sec: req.body[0].acc_sec,
            manufacture_date: '_sql_',
            exp_date: '_sql_',
            mrp: req.body[0].mrp
        })




        postQuery.push({ tbl: 'pos_product_purchase' })

        tempQuery = gloDBconn.dbi(postQuery, req.headers, [], ["(select concat(concat(" + apiSecurity.orgID(req.headers.user_id) + "," + apiSecurity.branch(req.headers.user_id) + "),sl_generator) sl FROM application_sl_generator WHERE lower(table_name) = 'pos_product' AND lower(col_name) = 'sl' AND org_id = '" + apiSecurity.orgID(req.headers.user_id) + "' AND branch = '" + apiSecurity.branch(req.headers.user_id) + "')", gv.dbSyntex['time'][gv.DB], gv.toDate(req.body[0].manufacture_date), gv.toDate(req.body[0].exp_date)])

        query[3] = tempQuery[0].q;
        parm.push(tempQuery[0].p)
        query[4] = tempQuery[1].q;
        parm.push(tempQuery[1].p)

        gloDBconn.get_info(query, parm, function (result) {
            if (result == "error") {
                req.connection.destroy();
            } else {
                res.send('received')
            }
        })

    })

    app.post(gv.apiRewrite + '/purchaseProduct', function (req, res, next) {

        var query = [], parm = [], tempQuery;

        query[0] = gv.dbSyntex["transaction"][gv.DB];
        parm.push([])

        var dynamicQuery = [];
        dynamicQuery.push({
            sl: req.body[0].sl,
            product_code: '_sql_',
            supplier: req.body[0].supplier,
            qty: parseFloat(parseFloat(req.body[0].free_qty) + parseFloat(req.body[0].qty)),
            cost: req.body[0].cost,
            purchase_date: '_sql_',
            adj: '0',
            challan: '0',
            acc_sec: req.body[0].acc_sec,
            manufacture_date: '_sql_',
            exp_date: '_sql_',
            mrp: req.body[0].mrp
        })

        dynamicQuery.push({ tbl: 'pos_product_purchase' })
        tempQueryParm = [
            "(select concat(concat(" + apiSecurity.orgID(req.headers.user_id) + "," + apiSecurity.branch(req.headers.user_id) + "),sl_generator) sl FROM application_sl_generator WHERE lower(table_name) = 'pos_product' AND lower(col_name) = 'sl' AND org_id = '" + apiSecurity.orgID(req.headers.user_id) + "' AND branch = '" + apiSecurity.branch(req.headers.user_id) + "')",
            gv.dbSyntex['time'][gv.DB],
            gv.toDate(req.body[0].manufacture_date),
            gv.toDate(req.body[0].exp_date)
        ]
        tempQuery = gloDBconn.dbi(dynamicQuery, req.headers, [], tempQueryParm)

        query[1] = tempQuery[0].q;
        parm.push(tempQuery[0].p)
        query[2] = tempQuery[1].q;
        parm.push(tempQuery[1].p)

        gloDBconn.get_info(query, parm, function (result) {
            if (result == "error") {
                req.connection.destroy();
            } else {
                res.send('received')
            }
        })

    })
    app.post(gv.apiRewrite + '/productPurchaseClearance', function (req, res, next) {

        var query = [], parm = [], tempQuery, querySl = 0;

        querySl = 0;
        query[querySl] = gv.dbSyntex["transaction"][gv.DB];
        parm.push([])

        querySl = querySl + 1
        query[querySl] = "select ps.qty*ps.cost debit, null credit,p.unit,ps.qty ,ps.cost rate,p.sl item_code,ps.supplier party,2 party_type,ps.acc_sec accounts_sub_sector from pos_product_purchase ps, pos_product p where ps.product_code=p.sl and  ps.adj=0 and ps.dml_by='" + req.headers.user_id + "'";
        parm.push([])

        querySl = querySl + 1
        query[querySl] = "select sl from accounts_principal_sub_sector where default_option=119 and org_id='" + apiSecurity.orgID(req.headers.user_id) + "' and branch='" + apiSecurity.branch(req.headers.user_id) + "' FETCH FIRST 1 ROWS ONLY";
        parm.push([])




        gloDBconn.get_info(query, parm, function (result) {
            if (result == "error") {
                req.connection.destroy();
            } else {
                var credit = 0;

                querySl = querySl + 1
                query[querySl] = "update application_sl_generator set sl_generator=sl_generator+1  where lower(table_name)='accounts_journal' and  lower(col_name)='journal_sl' and org_id='" + apiSecurity.orgID(req.headers.user_id) + "' and branch='" + apiSecurity.branch(req.headers.user_id) + "'";
                parm.push([])

                querySl = querySl + 1
                query[querySl] = "update application_sl_generator set business_logic=to_char(current_timestamp,'yymm'),sl_generator=0 where table_name='accounts_journal' and col_name not in ('sl','journal_sl')  and business_logic!= " + gv.date_to_str(gv.dbSyntex['time'][gv.DB], '%yy%mm');
                parm.push([])

                querySl = querySl + 1
                query[querySl] = "update application_sl_generator set sl_generator=sl_generator+1  where lower(table_name)='accounts_journal' and  lower(col_name)='jv' and org_id='" + apiSecurity.orgID(req.headers.user_id) + "' and branch='" + apiSecurity.branch(req.headers.user_id) + "'";
                parm.push([])


                querySl = querySl + 1
                query[querySl] = "update application_sl_generator set sl_generator=sl_generator+1  where lower(table_name)='pos_product_purchase' and  lower(col_name)='challan' and org_id='" + apiSecurity.orgID(req.headers.user_id) + "' and branch='" + apiSecurity.branch(req.headers.user_id) + "'";
                parm.push([])

                /****** Purchase Debit  Start*/
                for (var i = 0; i < result[1].length; i++) {
                    var dynamicQuery = [];
                    credit = parseFloat(credit) + parseFloat(result[1][i].debit)

                    dynamicQuery.push({
                        sl: null,
                        explanation: 'Purchase Product',
                        debit: result[1][i].debit,
                        credit: null,
                        journal_sl: '_sql_',
                        journal_date: '_sql_',
                        accounts_sub_sector: result[1][i].accounts_sub_sector,
                        party: result[1][i].party,
                        party_type: result[1][i].party_type,
                        acc_head: null,
                        challan: '_sql_',
                        unit: result[1][i].unit,
                        qty: result[1][i].qty,
                        rate: result[1][i].rate,
                        item_code: result[1][i].item_code,
                        narration: null,
                        comment_: null,
                        cancel_: '0',
                        voucher_no: '_sql_'
                    })

                    dynamicQuery.push({ tbl: 'accounts_journal' })


                    tempQueryParm = [


                        "(select concat(concat(org_id,branch),sl_generator) sl from application_sl_generator  where table_name='accounts_journal' and col_name='journal_sl' and org_id='" + apiSecurity.orgID(req.headers.user_id) + "' and branch='" + apiSecurity.branch(req.headers.user_id) + "')",

                        gv.dbSyntex['time'][gv.DB],

                        "(select concat(concat(org_id,branch),sl_generator) sl from application_sl_generator  where table_name='pos_product_purchase' and col_name='challan' and org_id='" + apiSecurity.orgID(req.headers.user_id) + "' and branch='" + apiSecurity.branch(req.headers.user_id) + "')",

                        "(select concat(concat(col_name,business_logic),sl_generator)sl from application_sl_generator  where table_name='accounts_journal' and col_name='jv' and org_id='" + apiSecurity.orgID(req.headers.user_id) + "' and branch='" + apiSecurity.branch(req.headers.user_id) + "')"

                    ]
                    tempQuery = gloDBconn.dbi(dynamicQuery, req.headers, [], tempQueryParm)



                    querySl = querySl + 1
                    query[querySl] = tempQuery[0].q;
                    parm.push(tempQuery[0].p)
                    querySl = querySl + 1
                    query[querySl] = tempQuery[1].q;
                    parm.push(tempQuery[1].p)

                }



                /****** Purchase Debit  End*/

                /****** Purchase Credit  Start*/
                var dynamicQuery = [];


                dynamicQuery.push({
                    sl: null,
                    explanation: 'Purchase Product',
                    debit: null,
                    credit: credit,
                    journal_sl: '_sql_',
                    journal_date: '_sql_',
                    accounts_sub_sector: result[2][0].sl,
                    party: result[1][0].party,
                    party_type: result[1][0].party_type,
                    acc_head: null,
                    challan: '_sql_',
                    unit: null,
                    qty: null,
                    rate: null,
                    item_code: null,
                    narration: null,
                    comment_: null,
                    cancel_: '0',
                    voucher_no: '_sql_'
                })

                dynamicQuery.push({ tbl: 'accounts_journal' })


                tempQueryParm = [


                    "(select concat(concat(org_id,branch),sl_generator) sl from application_sl_generator  where table_name='accounts_journal' and col_name='journal_sl' and org_id='" + apiSecurity.orgID(req.headers.user_id) + "' and branch='" + apiSecurity.branch(req.headers.user_id) + "')",

                    gv.dbSyntex['time'][gv.DB],

                    "(select concat(concat(org_id,branch),sl_generator) sl from application_sl_generator  where table_name='pos_product_purchase' and col_name='challan' and org_id='" + apiSecurity.orgID(req.headers.user_id) + "' and branch='" + apiSecurity.branch(req.headers.user_id) + "')",

                    "(select concat(concat(col_name,business_logic),sl_generator)sl from application_sl_generator  where table_name='accounts_journal' and col_name='jv' and org_id='" + apiSecurity.orgID(req.headers.user_id) + "' and branch='" + apiSecurity.branch(req.headers.user_id) + "')"

                ]
                tempQuery = gloDBconn.dbi(dynamicQuery, req.headers, [], tempQueryParm)



                querySl = querySl + 1
                query[querySl] = tempQuery[0].q;
                parm.push(tempQuery[0].p)
                querySl = querySl + 1
                query[querySl] = tempQuery[1].q;
                parm.push(tempQuery[1].p)

                querySl = querySl + 1
                query[querySl] = "update pos_product_purchase set challan=(select sl_generator from application_sl_generator  where table_name='pos_product_purchase' and col_name='challan' and org_id='" + apiSecurity.orgID(req.headers.user_id) + "' and branch='" + apiSecurity.branch(req.headers.user_id) + "'), adj='1' where dml_by='"+req.headers.user_id+"' and org_id='" + apiSecurity.orgID(req.headers.user_id) + "' and branch='" + apiSecurity.branch(req.headers.user_id) + "'";
                parm.push([])

                /****** Purchase Credit  End*/



                gloDBconn.get_info(query, parm, function (result) {
                    if (result == "error") {
                        req.connection.destroy();
                    } else {

                    }
                })


                res.send("");
            }
        })





    })




};

