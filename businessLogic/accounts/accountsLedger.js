
var mysql = require('../../dbConfig/mysql');
var oracle = require('../../dbConfig/oracle');
var gv = require('../../engine/globalVariable');
var gloDBconn = require('../../engine/gloDBconn');
var md5 = require('md5');
var sha512 = require('js-sha512');
const fs = require('fs');
const oracledb = require('oracledb');

module.exports = function (app) {


    app.post(gv.apiRewrite + '/lagerEntry', function (req, res, next) {

        var query = [], parm = [], querySl = 0;

        querySl = 0;
        query[querySl] = gv.dbSyntex["transaction"][gv.DB];
        parm.push([])

        querySl = querySl + 1
        query[querySl] = `delete from accounts_ledger`;
        parm.push([])

        querySl = querySl + 1
        query[querySl] = `select sl from accounts_principal_sub_sector where org_id=1 and branch=1 order by sl`;
        parm.push([])

        gloDBconn.get_info(query, parm, function (result) {
            if (result == "error") {

            } else {

                for (var i = 0; i < result[2].length; i++) {
                    // console.log(result[1][i].sl)
                    lagerEntry(result[2][i].sl, req.headers)
                }
                res.send('ok');
            }
        })


    });


    function lagerEntry(sector_, headers_) {
        var query = [], parm = [], querySl = 0, sector = sector_;

        querySl = 0;
        query[querySl] = gv.dbSyntex["transaction"][gv.DB];
        parm.push([])

        querySl = querySl + 1
        query[querySl] = `select a.sl,a.journal_sl,b.sl sector, b.sub_sector,explanation,nvl(a.debit,0)dr,nvl(a.credit,0) cr,
        case when nvl(a.debit,0)-nvl(a.credit,0)>0 then nvl(a.debit,0)-nvl(a.credit,0) else -1*(nvl(a.debit,0)-nvl(a.credit,0)) end val from accounts_journal a, accounts_principal_sub_sector b
                where a.accounts_sub_sector=b.sl and a.journal_sl in (select journal_sl from accounts_journal where accounts_sub_sector=_p_)  order by  a.sl,a.journal_sl`;
        parm.push([sector])

        gloDBconn.get_info(query, parm, function (result) {
            if (result == "error") {

            } else {


                if (result[1].length > 0) {
                    var journal_sl = ''
                    console.log(sector_ + "  " + result[1].length)
                    for (var i = 0; i < result[1].length; i++) {


                        journal_sl = result[1][i].journal_sl
                        if (result[1][i].sector == sector) {
                            var prvSecVal = 0, nxtSecVal = 0;

                            if (i > 0) {

                                prvSecVal = result[1][i - 1].val
                            }
                            if (i < result[1].length - 1) {

                                nxtSecVal = result[1][i + 1].val
                            }

                            if (result[1][i].val == prvSecVal) {
                                ledgerEntry(result[1][i].explanation, result[1][i].sector, result[1][i - 1].sector, result[1][i].dr, result[1][i].cr, result[1][i].journal_date, result[1][i].journal_sl)
                                //    console.log(result[1][i].journal_sl + " " + result[1][i - 1].sub_sector + " " + result[1][i].dr + " " + result[1][i].cr)

                            } else if (result[1][i].val == nxtSecVal) {
                                ledgerEntry(result[1][i].explanation, result[1][i].sector, result[1][i + 1].sector, result[1][i].dr, result[1][i].cr, result[1][i].journal_date, result[1][i].journal_sl)
                                //  console.log(result[1][i].journal_sl + " " + result[1][i + 1].sub_sector + " " + result[1][i].dr + " " + result[1][i].cr)
                            }
                        }

                    }

                    function ledgerEntry(details, ledger_sector, opposite_sector, dr, cr, journal_date, issue_no) {

                        querySl = querySl + 1
                        query[querySl] = `update application_sl_generator set sl_generator=sl_generator+1  where lower(table_name)='accounts_ledger' and  lower(col_name)='sl' and org_id='1' and branch='1'`;
                        parm.push([])

                        querySl = querySl + 1
                        query[querySl] = "insert into accounts_ledger (sl,details,ledger_sector,opposite_sector,dr,cr,journal_date,issue_no,org_id,branch,dml_by,dml_time) values ((select concat(concat(1,1),sl_generator) sl FROM application_sl_generator WHERE lower(table_name) = 'accounts_ledger' AND lower(col_name) = 'sl' AND org_id = '1' AND branch = '1'),'" + details + "','" + ledger_sector + "','" + opposite_sector + "','" + dr + "','" + cr + "',null,'" + issue_no + "','1000',1,1,current_timestamp)";
                        parm.push([])

                        /*  querySl = querySl + 1
                          query[querySl] = `update application_sl_generator set sl_generator=sl_generator+1  where lower(table_name)='accounts_ledger' and  lower(col_name)='sl' and org_id='1' and branch='1'`;
                          parm.push([])*/




                        /*    var empInsCmd = [];
                            empInsCmd.push({
                                sl: '0',
                                details: details,
                                ledger_sector: ledger_sector,
                                opposite_sector: opposite_sector,
                                dr: dr,
                                cr: cr,
                                journal_date: 'null',
                                issue_no: issue_no,
                            })
    
                            empInsCmd.push({ tbl: 'accounts_ledger' })
    
                            tempQuery = gloDBconn.dbi(empInsCmd, headers_, [], [])
    
                            querySl = querySl + 1
                            query[querySl] = tempQuery[0].q;
                            parm.push(tempQuery[0].p)
    
                            querySl = querySl + 1
                            query[querySl] = tempQuery[1].q;
                            parm.push(tempQuery[1].p)*/

                    }



                    gloDBconn.get_info(query, parm, function (result) {
                        if (result == "error") {

                            console.log(result)
                        } else {

                        }
                    })
                }

            }
        })
    }

    app.get(gv.apiRewrite + '/ladger', function (req, res, next) {

        var query = [], parm = [], querySl = 0;

        querySl = 0;
        query[querySl] = gv.dbSyntex["transaction"][gv.DB];
        parm.push([])

        querySl = querySl + 1
        query[querySl] = `select
        l.ledger_sector sector_sl,
        (select sub_sector from accounts_principal_sub_sector where sl=l.ledger_sector) sector,
        (select sub_sector from accounts_principal_sub_sector where sl=l.opposite_sector) details,
        dr,cr, l.issue_no
        from accounts_ledger l`;
        parm.push([])

        querySl = querySl + 1
        query[querySl] = `select
        distinct l.ledger_sector,(select sub_sector from accounts_principal_sub_sector where sl=l.ledger_sector) sector
        from accounts_ledger l`;
        parm.push([])

        gloDBconn.get_info(query, parm, function (result) {
            if (result == "error") {
            } else {
                res.send(result)

            }
        })

    })

    app.post(gv.apiRewrite + '/trialBalance', function (req, res, next) {

        var query = [], parm = [], querySl = 0;

        querySl = 0;
        query[querySl] = gv.dbSyntex["transaction"][gv.DB];
        parm.push([])



        querySl = querySl + 1
        query[querySl] = `delete from accounts_trial_balance`;
        parm.push([])

        querySl = querySl + 1
        query[querySl] = `select l.ledger_sector sector_sl,sum( dr-cr) bal from accounts_ledger l group by  l.ledger_sector`;
        parm.push([])





        gloDBconn.get_info(query, parm, function (result) {
            if (result == "error") {

            } else {

                for (var i = 0; i < result[2].length; i++) {
                    var trialBalance = [];
                    var dr = 0, cr = 0;
                    if (result[2][i].bal >= 0) {
                        dr = result[2][i].bal
                    } else {
                        cr = result[2][i].bal * -1
                    }
                    trialBalance.push({
                        sl: 0,
                        sector_sl: result[2][i].sector_sl,
                        dr: dr,
                        cr: cr

                    })

                    trialBalance.push({ tbl: 'accounts_trial_balance' })

                    tempQuery = gloDBconn.dbi(trialBalance, req.headers, [], [])

                    querySl = querySl + 1
                    query[querySl] = tempQuery[0].q;
                    parm.push(tempQuery[0].p)

                    querySl = querySl + 1
                    query[querySl] = tempQuery[1].q;
                    parm.push(tempQuery[1].p)
                }

                querySl = querySl + 1
                query[querySl] = `select t1.sub_sector,nvl(t0.dr,0)dr,nvl(t0.cr,0)cr from accounts_trial_balance t0, accounts_principal_sub_sector t1 where t0.sector_sl=t1.sl`;
                parm.push([])

                

                gloDBconn.get_info(query, parm, function (result) {
                    if (result == "error") {

                    } else {
                        
                        res.send(result[querySl])

                    }
                })
            }
        })

    })



};