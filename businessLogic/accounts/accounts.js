
var mysql = require('../../dbConfig/mysql');
var oracle = require('../../dbConfig/oracle');
var gv = require('../../engine/globalVariable');
var gloDBconn = require('../../engine/gloDBconn');
var md5 = require('md5');
var sha512 = require('js-sha512');
const fs = require('fs');
const oracledb = require('oracledb');
var apiSecurity = require('../../engine/apiSecurity');

module.exports = function (app) {

    app.post(gv.apiRewrite + '/studentInfoJournal', function (req, res, next) {
        console.log(req.body)

        var query = [], parm = [], querySl = 0;

        querySl = 0;
        query[querySl] = gv.dbSyntex["transaction"][gv.DB];
        parm.push([])

        querySl = querySl + 1
        query[querySl] = `select to_char(sysdate,'RRRR-mm-dd') jdate, t0.user_id,

        name||' - '||roll||' - '||t2.class||' - '||t3.section||' - '||t4.system_year info
        
        from edu_student t0, application_users t1 , edu_class t2, edu_section t3, global_year t4
        where t0.org_id=t1.org_id  and t2.sl=t0.class and t3.sl=t0.section and t4.sl=t0.academic_year and t0.user_id=t1.user_id 
        and t0.org_id=(select org_id from application_users where user_id=_p_)
        and (t1.user_id=_p_ or t1.ORG_USER_ID_FIZAR=_p_)`;
        parm.push([
            req.headers.user_id,
            req.body.party_name_s,
            req.body.party_name_s
        ])



        gloDBconn.get_info(query, parm, function (result) {
            if (result == "error") {
                req.connection.destroy();
            } else {

                if (result[1].length > 0) {
                    res.send({
                        user_id: result[1][0].user_id,
                        info: result[1][0].info,
                        jdate: result[1][0].jdate
                    })
                }
                else {
                    res.send({
                        user_id: 0,
                        info: 'No Student Found',
                        jdate: ''
                    })
                }

            }
        })


    })

    app.post(gv.apiRewrite + '/journalEntryOptions', function (req, res, next) {
        console.log(req.body)

        var query = [], parm = [], querySl = 0;

        querySl = 0;
        query[querySl] = gv.dbSyntex["transaction"][gv.DB];
        parm.push([])

        querySl = querySl + 1
        query[querySl] = `select t0.sub_sector as v,  t0.sl as r, edu_fees_tk(_p_,t0.sl) tk  from accounts_principal_sub_sector t0, application_users u where t0.org_id=u.org_id  and u.user_id=_p_
        and t0.sl in (select SUB_SECTOR from edu_class_fees where class=(select class from edu_student where user_id=_p_) 
        and academic_session=(select academic_year from edu_student where user_id=_p_))`;
        parm.push([
            req.body.party_name,
            req.headers.user_id,
            req.body.party_name,
            req.body.party_name
        ])

        querySl = querySl + 1
        query[querySl] = `select t0.sub_sector as v,  t0.sl as r from accounts_principal_sub_sector t0, application_users u,
        accounts_principal_sector t1 where t0.org_id=u.org_id  and u.user_id=_p_ and t1.sl=t0.PRINCIPAL_SECTOR and t1.val in ('a','b','c')`;
        parm.push([req.headers.user_id])

        gloDBconn.get_info(query, parm, function (result) {
            if (result == "error") {
                req.connection.destroy();
            } else {

                res.send(result)
            }
        })


    })

    app.post(gv.apiRewrite + '/journalEntry', function (req, res, next) {

console.log(req.body)
        var query = [], parm = [], querySl = 0;

        querySl = 0;
        query[querySl] = gv.dbSyntex["transaction"][gv.DB];
        parm.push([])

        querySl = querySl + 1
        query[querySl] = "update application_sl_generator set sl_generator=sl_generator+1  where lower(table_name)='accounts_journal' and  lower(col_name)='journal_sl' and org_id='" + apiSecurity.orgID(req.headers.user_id) + "' and branch='" + apiSecurity.branch(req.headers.user_id) + "'";
        parm.push([])

        querySl = querySl + 1
        query[querySl] = "update application_sl_generator set business_logic=to_char(current_timestamp,'yymm'),sl_generator=0 where table_name='accounts_journal' and col_name not in ('sl','journal_sl')  and business_logic!= " + gv.date_to_str(gv.dbSyntex['time'][gv.DB], '%yy%mm');
        parm.push([])

        for (var i = 1; i <= req.body.tabularSl; i++) {


            querySl = querySl + 1
            query[querySl] = "call accounts_journal_entry_process (_p_, _p_,_p_,_p_,_p_,0,_p_,_p_,_p_,_p_,_p_,_p_)";
            parm.push([
                req.body.sector,
                req.body["acc_sec" + i],
                req.body["amount" + i],
                apiSecurity.orgID(req.headers.user_id),
                apiSecurity.branch(req.headers.user_id),
                req.body.explanation,
                req.body.narration,
                req.body.comment,
                req.body.party_category,
                req.body.party_name,
                req.body.journal_date

            ])

        }

        gloDBconn.get_info(query, parm, function (result) {
            if (result == "error") {
                req.connection.destroy();
            } else {

                res.send('')
            }
        })
    })

    app.post(gv.apiRewrite + '/journalEntry-', function (req, res, next) {


        var query = [], parm = [], tempQuery, querySl = 0, dynamicQuery = [], secVal, amount, sectorVal = [];

        querySl = 0;
        query[querySl] = gv.dbSyntex["transaction"][gv.DB];
        parm.push([])

        querySl = querySl + 1
        query[querySl] = "select t1.val from accounts_principal_sub_sector t0, accounts_principal_sector t1 where t0.principal_sector=t1.sl and t0.sl=_p_";
        parm.push([gv.dbi(req.body.sector)])

        querySl = querySl + 1
        query[querySl] = "select t1.val,t0.sl from accounts_principal_sub_sector t0, accounts_principal_sector t1 where t0.principal_sector=t1.sl and t0.org_id=_p_ and t0.branch=_p_";
        parm.push([apiSecurity.orgID(req.headers.user_id), apiSecurity.branch(req.headers.user_id)])




        gloDBconn.get_info(query, parm, function (result) {
            if (result == "error") {
                req.connection.destroy();
            } else {

                querySl = querySl + 1
                query[querySl] = "update application_sl_generator set sl_generator=sl_generator+1  where lower(table_name)='accounts_journal' and  lower(col_name)='journal_sl' and org_id='" + apiSecurity.orgID(req.headers.user_id) + "' and branch='" + apiSecurity.branch(req.headers.user_id) + "'";
                parm.push([])

                querySl = querySl + 1
                query[querySl] = "update application_sl_generator set business_logic=to_char(current_timestamp,'yymm'),sl_generator=0 where table_name='accounts_journal' and col_name not in ('sl','journal_sl')  and business_logic!= " + gv.date_to_str(gv.dbSyntex['time'][gv.DB], '%yy%mm');
                parm.push([])

                secVal = result[1][0].val

                for (i = 0; i < result[2].length; i++) {
                    sectorVal[result[2][i].sl] = result[2][i].val
                }

                if (req.body.mode == "-1") { amount = -1 } else { amount = 1 }


                for (var i = 1; i <= req.body.tabularSl; i++) {
                    var voucherType;

                    if ((secVal == 'a' || secVal == 'b' || secVal == 'c') && (sectorVal[req.body["acc_sec" + i]] == 'l')) {
                        if (secVal == 'b') { voucherType = 'bd' } else if (secVal == 'c') { voucherType = 'cd' } else { voucherType = 'jv' }

                        dr_cr(req.body["amount" + i], null, req.body.sector, voucherType)
                        dr_cr(null, req.body["amount" + i], req.body["acc_sec" + i], voucherType)

                    }
                    else if ((secVal == 'a' || secVal == 'b' || secVal == 'c') && (sectorVal[req.body["acc_sec" + i]] == 'p')) {

                        if (secVal == 'b') { voucherType = 'bd' } else if (secVal == 'c') { voucherType = 'cd' } else { voucherType = 'jv' }

                        dr_cr(req.body["amount" + i], null, req.body.sector, voucherType)
                        dr_cr(null, req.body["amount" + i], req.body["acc_sec" + i], voucherType)

                    }
                    else if ((secVal == 'a' || secVal == 'b' || secVal == 'c') && (sectorVal[req.body["acc_sec" + i]] == 'r')) {
                        if (secVal == 'b') { voucherType = 'bd' } else if (secVal == 'c') { voucherType = 'cd' } else { voucherType = 'jv' }

                        dr_cr(req.body["amount" + i], null, req.body.sector, voucherType)
                        dr_cr(null, req.body["amount" + i], req.body["acc_sec" + i], voucherType)


                    }
                    else if ((secVal == 'a' || secVal == 'b' || secVal == 'c') && (sectorVal[req.body["acc_sec" + i]] == 'd')) {
                        if (secVal == 'b') { voucherType = 'bc' } else if (secVal == 'c') { voucherType = 'cc' } else { voucherType = 'jv' }

                        dr_cr(req.body["amount" + i], null, req.body["acc_sec" + i], voucherType)
                        dr_cr(null, req.body["amount" + i], req.body.sector, voucherType)


                    }
                    else if ((secVal == 'a' || secVal == 'b' || secVal == 'c') && (sectorVal[req.body["acc_sec" + i]] == 'e')) {
                        if (secVal == 'b') { voucherType = 'bc' } else if (secVal == 'c') { voucherType = 'cc' } else { voucherType = 'jv' }

                        dr_cr(req.body["amount" + i], null, req.body["acc_sec" + i], voucherType)
                        dr_cr(null, req.body["amount" + i], req.body.sector, voucherType)

                    }
                    else if ((secVal == 'd') && (sectorVal[req.body["acc_sec" + i]] == 'a' || sectorVal[req.body["acc_sec" + i]] == 'b' || sectorVal[req.body["acc_sec" + i]] == 'c')) {
                        if (sectorVal[req.body["acc_sec" + i]] == 'b') { voucherType = 'bc' } else if (sectorVal[req.body["acc_sec" + i]] == 'c') { voucherType = 'cc' } else { voucherType = 'jv' }

                        dr_cr(req.body["amount" + i], null, req.body.sector, voucherType)
                        dr_cr(null, req.body["amount" + i], req.body["acc_sec" + i], voucherType)

                    }
                    else if ((secVal == 'e') && (sectorVal[req.body["acc_sec" + i]] == 'a' || sectorVal[req.body["acc_sec" + i]] == 'b' || sectorVal[req.body["acc_sec" + i]] == 'c')) {
                        if (sectorVal[req.body["acc_sec" + i]] == 'b') { voucherType = 'bc' } else if (sectorVal[req.body["acc_sec" + i]] == 'c') { voucherType = 'cc' } else { voucherType = 'jv' }

                        dr_cr(req.body["amount" + i], null, req.body.sector, voucherType)
                        dr_cr(null, req.body["amount" + i], req.body["acc_sec" + i], voucherType)

                    }
                    else if ((secVal == 'l') && (sectorVal[req.body["acc_sec" + i]] == 'a' || sectorVal[req.body["acc_sec" + i]] == 'b' || sectorVal[req.body["acc_sec" + i]] == 'c')) {
                        if (sectorVal[req.body["acc_sec" + i]] == 'b') { voucherType = 'bd' } else if (sectorVal[req.body["acc_sec" + i]] == 'c') { voucherType = 'cd' } else { voucherType = 'jv' }

                        dr_cr(req.body["amount" + i], null, req.body["acc_sec" + i], voucherType)
                        dr_cr(null, req.body["amount" + i], req.body.sector, voucherType)

                    }
                    else if ((secVal == 'p') && (sectorVal[req.body["acc_sec" + i]] == 'a' || sectorVal[req.body["acc_sec" + i]] == 'b' || sectorVal[req.body["acc_sec" + i]] == 'c')) {
                        if (sectorVal[req.body["acc_sec" + i]] == 'b') { voucherType = 'bd' } else if (sectorVal[req.body["acc_sec" + i]] == 'c') { voucherType = 'cd' } else { voucherType = 'jv' }

                        dr_cr(req.body["amount" + i], null, req.body["acc_sec" + i], voucherType)
                        dr_cr(null, req.body["amount" + i], req.body.sector, voucherType)

                    }
                    else if ((secVal == 'r') && (sectorVal[req.body["acc_sec" + i]] == 'a' || sectorVal[req.body["acc_sec" + i]] == 'b' || sectorVal[req.body["acc_sec" + i]] == 'c')) {
                        if (sectorVal[req.body["acc_sec" + i]] == 'b') { voucherType = 'bd' } else if (sectorVal[req.body["acc_sec" + i]] == 'c') { voucherType = 'cd' } else { voucherType = 'jv' }

                        dr_cr(req.body["amount" + i], null, req.body["acc_sec" + i], voucherType)
                        dr_cr(null, req.body["amount" + i], req.body.sector, voucherType)

                    }
                    querySl = querySl + 1
                    query[querySl] = "update application_sl_generator set sl_generator=sl_generator+1  where lower(table_name)='accounts_journal' and  lower(col_name)='" + voucherType + "'and org_id='" + apiSecurity.orgID(req.headers.user_id) + "' and branch='" + apiSecurity.branch(req.headers.user_id) + "'";
                    parm.push([])

                    function dr_cr(dr, cr, sector, voucherType) {

                        var voucherNo = "(select concat(concat(col_name,business_logic),sl_generator)sl from application_sl_generator  where table_name='accounts_journal' and col_name='" + voucherType + "' and org_id='" + apiSecurity.orgID(req.headers.user_id) + "' and branch='" + apiSecurity.branch(req.headers.user_id) + "')"


                        dynamicQuery.push({
                            sl: null,
                            explanation: gv.dbi(req.body.explanation),
                            debit: '_sql_',
                            credit: '_sql_',
                            journal_sl: '_sql_',
                            journal_date: '_sql_',
                            accounts_sub_sector: '_sql_',
                            party: gv.dbi(req.body.party_name),
                            party_type: gv.dbi(req.body.party_category),
                            acc_head: null,
                            challan: '0',
                            unit: null,
                            qty: null,
                            rate: null,
                            item_code: null,
                            narration: null,
                            comment_: null,
                            cancel_: '0',
                            voucher_no: '_sql_',
                        })

                        dynamicQuery.push({ tbl: 'accounts_journal' })


                        tempQueryParm =
                            [
                                dr,
                                cr,
                                "(select concat(concat(org_id,branch),sl_generator) sl from application_sl_generator  where table_name='accounts_journal' and col_name='journal_sl' and org_id='" + apiSecurity.orgID(req.headers.user_id) + "' and branch='" + apiSecurity.branch(req.headers.user_id) + "')",
                                gv.dbSyntex['time'][gv.DB],
                                sector,
                                voucherNo
                            ]

                        tempQuery = gloDBconn.dbi(dynamicQuery, req.headers, [], tempQueryParm)

                        querySl = querySl + 1
                        query[querySl] = tempQuery[0].q;
                        parm.push(tempQuery[0].p)

                        querySl = querySl + 1
                        query[querySl] = tempQuery[1].q;
                        parm.push(tempQuery[1].p)
                    }

                }


                gloDBconn.get_info(query, parm, function (result) {
                    if (result == "error") {
                        req.connection.destroy();
                    } else {

                        res.send('')
                    }
                })



            }
        })
    });
    //console.log(gv.date_to_str(gv.dbSyntex['time'][gv.DB] ,'%Y-%m-%d'))

    app.post(gv.apiRewrite + '/journalDate', function (req, res, next) {


        var _willSend = [{}], inputName = Object.keys(req.body[0])

        mysql.query("select DATE_FORMAT(now(), '%Y-%m-%d') d", [], function (err, result, fields) {
            if (err) {
                console.log(err);
                req.connection.destroy();
            } else {

                for (var i = 0; i < inputName.length; i++) {
                    if (inputName[i] == 'date') {
                        _willSend[0][inputName[i]] = result[0].d
                    }

                    else {
                        _willSend[0][inputName[i]] = req.body[0][inputName[i]]
                    }

                }



                res.send(_willSend)
            }
        });
    });

    app.post(gv.apiRewrite + '/capitalEntry', function (req, res, next) {



        var sl = "(select concat('" + apiSecurity.orgID(req.headers.user_id) + "',sl_generator + 1) from sl_generator where TABLE_NAME='accounts_journal' and COL_NAME='sl')",
            journal_sl = "(select concat('" + apiSecurity.orgID(req.headers.user_id) + "',sl_generator + 1) from sl_generator where TABLE_NAME='accounts_journal' and COL_NAME='journal_sl')",
            query = "";
        query = query + "insert into accounts_journal (sl,explanation,debit,credit,journal_sl,journal_date,org_id,branch,dml_by,dml_time,accounts_sub_sector,party,party_type,acc_head) values (" + sl +
            ",'" + req.body.explanation + "',"
            + "NULL,"
            + "'" + req.body.amount + "',"
            + "" + journal_sl + ","
            + "'" + req.body.date + "',"
            + "'" + apiSecurity.orgID(req.headers.user_id) + "',"
            + "'" + apiSecurity.branch(req.headers.user_id) + "',"
            + "'" + req.headers.user_id + "',"
            + "'now()',"
            + "'" + req.body.sector + "',"
            + "'" + req.body.owner + "',"
            + "'1',NULL);"
        query = query + " update SL_GENERATOR set SL_GENERATOR=SL_GENERATOR+1 where TABLE_NAME='accounts_journal' and COL_NAME='sl';"

        for (var i = 1; i <= req.body.tabularSl; i++) {
            query = query + "insert into accounts_journal (sl,explanation,debit,credit,journal_sl,journal_date,org_id,branch,dml_by,dml_time,accounts_sub_sector,party,party_type,acc_head) values (" + sl +
                ",'" + req.body.explanation + "',"
                + "'" + req.body["amount" + i] + "',"
                + "NULL,"
                + "" + journal_sl + ","
                + "'" + req.body.date + "',"
                + "'" + apiSecurity.orgID(req.headers.user_id) + "',"
                + "'" + apiSecurity.branch(req.headers.user_id) + "',"
                + "'" + req.headers.user_id + "',"
                + "'now()',"
                + "'" + req.body["acc_sec" + i] + "',"
                + "'" + req.body.owner + "',"
                + "'1',NULL);"
            query = query + " update SL_GENERATOR set SL_GENERATOR=SL_GENERATOR+1 where TABLE_NAME='accounts_journal' and COL_NAME='sl';"
        }

        query = query + " update SL_GENERATOR set SL_GENERATOR= SL_GENERATOR+1 where TABLE_NAME='accounts_journal' and COL_NAME='journal_sl';"


        mysql.query(query, [], function (err, result, fields) {
            if (err) {
                console.log(err);
                req.connection.destroy();
            } else {
                res.send("Request Received")
            }

        });


    });



    app.post(gv.apiRewrite + '/sectorBalance', function (req, res, next) {
        mysql.query("select case when sum(ifnull(t0.debit,0)-ifnull(t0.credit,0))>0 then sum(ifnull(t0.debit,0)-ifnull(t0.credit,0))else sum(ifnull(t0.debit,0)-ifnull(t0.credit,0))*-1 end balance from accounts_journal t0, accounts_principal_sub_sector t1,accounts_principal_sector t2,application_users u where t0.accounts_sub_sector=t1.sl and t2.sl=t1.principal_sector and u.org_id=t0.org_id and u.user_id='" + req.headers.user_id + "' and t0.accounts_sub_sector='" + req.body.acc_sec + "' group by t0.accounts_sub_sector order by t2.sl,t0.accounts_sub_sector,t0.sl,t0.journal_sl", [], function (err, result, fields) {
            if (err) {
                console.log(err);
                req.connection.destroy();
            } else {
                res.send(result)
            }
        });
    })

};