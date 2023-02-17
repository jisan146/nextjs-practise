const xlsxFile = require('read-excel-file/node');
var mysql = require('../../dbConfig/mysql');
var oracle = require('../../dbConfig/oracle');
var gv = require('../../engine/globalVariable');
var md5 = require('md5');
var sha512 = require('js-sha512');
const fs = require('fs');
var uuid = require('uuid');
const oracledb = require('oracledb');
const { query } = require('express');
var gloDBconn = require('../../engine/gloDBconn');
var apiSecurity = require('../../engine/apiSecurity');



module.exports = function (app) {



    const path = require('path');
    let rootLoc = path.join(__dirname, '../../');

    app.post(gv.apiRewrite + '/dataImportClassRoutineSave', function (req, res, next) {

        var query = [], parm = [], tempQuery, querySl = 0, dynamicQuery = [];

        querySl = 0;
        query[querySl] = gv.dbSyntex["transaction"][gv.DB];
        parm.push([])

        querySl = querySl + 1
        query[querySl] ="delete from edu_class_routine where class=_p_ and section=_p_ and ACADEMIC_SESSION=_p_";
        parm.push([
            String(req.body[0].class),
            String(req.body[0].section),
            String(req.body[0].session)
        ])

    /*    querySl = querySl + 1
        query[querySl] ="delete from edu_class_subject where class=_p_ and section=_p_ and ACADEMIC_SESSION=_p_";
        parm.push([
            String(req.body[0].class),
            String(req.body[0].section),
            String(req.body[0].session)
        ])
*/

      
        for (var i = 0; i < req.body.length; i++) {

           
            querySl = querySl + 1
            query[querySl] = "call  bulk_teacher_Routine_Entry('"+req.body[i].teacher+"','"+   String(req.body[i].class)+"','"+  String(req.body[i].section)+"','"+ String(req.body[i].session)+"','"+req.body[i].subject+"','"+String(req.body[i].room)+"','"+String(req.body[i].period)+"','"+String(req.body[i].day)+"','"+String(req.body[i].time)+"','"+apiSecurity.orgID(req.headers.user_id)+"','"+ apiSecurity.branch(req.headers.user_id)+"','"+req.headers.user_id+"')"
            parm.push([
              
             
               

            ])

          //  console.log(query)

    
           

        }
       
        gloDBconn.get_info(query, parm, function (result) {
            if (result == "error") {
                req.connection.destroy();
            } else {


                res.send('')
            }
        })


    })
    app.post(gv.apiRewrite + '/dataImportOptionEmployeeName', function (req, res, next) {



        var query = [], parm = [], tempQuery, querySl = 0, dynamicQuery = [];



        querySl = querySl + 0
        query[querySl] = `select t0.user_id ,lower(employee_name) name from employee t0 , application_users t1 
        where t0.org_id=t1.org_id and t1.user_id=_p_ order by t0.user_id`
        parm.push([req.headers.user_id])






        gloDBconn.get_info(query, parm, function (result) {
            if (result == "error") {
                req.connection.destroy();
            } else {


                res.send(result)
            }
        })

    });

    app.post(gv.apiRewrite + '/dataImportOptionEmployee', function (req, res, next) {



        var query = [], parm = [], tempQuery, querySl = 0, dynamicQuery = [];

        querySl = 0;
        query[querySl] = gv.dbSyntex["transaction"][gv.DB];
        parm.push([])

        querySl = querySl + 1
        query[querySl] = `select designation ,sl from designation t0 , application_users t1 
        where t0.org_id=t1.org_id and t1.user_id=_p_ order by sl`
        parm.push([req.headers.user_id])



        querySl = querySl + 1
        query[querySl] = `select department ,sl from department t0 , application_users t1 
        where t0.org_id=t1.org_id and t1.user_id=_p_ order by sl`
        parm.push([req.headers.user_id])


        gloDBconn.get_info(query, parm, function (result) {
            if (result == "error") {
                req.connection.destroy();
            } else {


                res.send(result)
            }
        })

    });





    app.post(gv.apiRewrite + '/dataImportOptionV2', function (req, res, next) {



        var query = [], parm = [], tempQuery, querySl = 0, dynamicQuery = [];

        querySl = 0;
        query[querySl] = gv.dbSyntex["transaction"][gv.DB];
        parm.push([])

        querySl = querySl + 1
        query[querySl] = `select section section, sl section_sl,(select class from edu_class where sl=t0.class)class, class class_sl from edu_section t0 , application_users t1 
        where t0.org_id=t1.org_id and t1.user_id=_p_ order by class,sl`
        parm.push([req.headers.user_id])



        querySl = querySl + 1
        query[querySl] = "select system_year v , sl r from global_year"
        parm.push([])





        gloDBconn.get_info(query, parm, function (result) {
            if (result == "error") {
                req.connection.destroy();
            } else {


                res.send(result)
            }
        })

    }); 

    app.post(gv.apiRewrite + '/dataImportOption', function (req, res, next) {



        var query = [], parm = [], tempQuery, querySl = 0, dynamicQuery = [];

        querySl = 0;
        query[querySl] = gv.dbSyntex["transaction"][gv.DB];
        parm.push([])

        querySl = querySl + 1
        query[querySl] = "select class v, sl r from edu_class t0, application_users t1 where t0.org_id=t1.org_id and t1.user_id=_p_"
        parm.push([req.headers.user_id])

        querySl = querySl + 1
        query[querySl] = "select section v, sl r from edu_section where class=_p_"
        parm.push([req.body.class])

        querySl = querySl + 1
        query[querySl] = "select distinct system_year v , t0.sl r from global_year t0, edu_student t1 where t0.sl=t1.academic_year and t1.class=_p_ and section=_p_"
        parm.push([ req.body.class, req.body.section])

        querySl = querySl + 1
        query[querySl] = `select distinct t1.subject v, t0.subject r from edu_class_routine t0,edu_class_subject t1 where emp_id=_p_ and t1.sl=t0.subject and t1.class=_p_ and t1.section=_p_
        and t1.academic_session=_p_ and t1.assign=1 order by 2`
        parm.push([req.headers.user_id, req.body.class, req.body.section, req.body.session])



        gloDBconn.get_info(query, parm, function (result) {
            if (result == "error") {
                req.connection.destroy();
            } else {


                res.send(result)
            }
        })

    });





    app.post(gv.apiRewrite + '/eduDataImportV2', function (req, res, next) {

        /* xlsxFile('D:\\digipath\\data.xlsx', { sheet: 'Student' }).then((rows) => {
             res.send(rows)
         })*/

         try{
            fileSave();

            xlsxFile(rootLoc + '/userFiles/orgAssets/' + apiSecurity.orgID(req.headers.user_id) + "/" + fileName, { sheet: req.body.option }).then((rows) => {
    
                res.send(rows)
            })
    
    
    
    
    
    
    
            var fileName = ''
            function fileSave() {
                try {
                    let base64String = req.body.file;
    
                    let base64Image = base64String
                        .split(';base64,')
                        .pop();
                    var ext = req.body.fileEXT.substr(req.body.fileEXT.lastIndexOf('.') + 1);
    
                    fileName = uuid.v1() + '.' + ext
    
    
    
    
    
                    if (!fs.existsSync(rootLoc + '/userFiles/orgAssets/' + apiSecurity.orgID(req.headers.user_id) + '/')) {
                        fs.mkdirSync(rootLoc + '/userFiles/orgAssets/' + apiSecurity.orgID(req.headers.user_id) + '/', { recursive: true });
                    }
    
    
    
                    fs.writeFile(rootLoc + '/userFiles/orgAssets/' + apiSecurity.orgID(req.headers.user_id) + "/" + fileName, base64Image, {
                        encoding: 'base64'
                    }, function (err) { });
                } catch (ex) { console.log(ex) }
            }
    
    
         }
         catch{
            req.connection.destroy();
         }

     

    });

    app.post(gv.apiRewrite + '/EmployeeDesDepTDataUpload', function (req, res, next) {

        var excelCol = Object.keys(req.body.EmployeeDataMapExcel[0])
        var dbCol = "", query = [], parm = [], querySl = 0;
        for (j = 0; j < excelCol.length; j++) {

            if (req.body.EmployeeDataMapExcel[0][excelCol[j]] >= 0) {
                dbCol = dbCol + excelCol[j] + ','
            }

        }

        dbCol = dbCol + 'ORG_ID,BRANCH,DML_BY,DML_TIME,SL'

        querySl = 0;
        query[querySl] = gv.dbSyntex["transaction"][gv.DB];
        parm.push([])

        for (var k = 1; k < req.body.employeeDataJson.length; k++) {





            for (l = 0; l < excelCol.length; l++) {


                if (req.body.EmployeeDataMapExcel[0][excelCol[l]] >= 0) {

                    if (excelCol[l] == 'DESIGNATION') {


                        var designation = String(req.body.employeeDataJson[k][req.body.EmployeeDataMapExcel[0][excelCol[l]]])

                        querySl = querySl + 1
                        query[querySl] = "call  BULK_DESIGNATION_ENTRY (_p_,_p_, _p_,_p_)"
                        parm.push([
                            designation,
                            apiSecurity.orgID(req.headers.user_id),
                            apiSecurity.branch(req.headers.user_id),
                            req.headers.user_id
                        ])









                    } else if (excelCol[l] == 'DEPARTMENT') {


                        var department = String(req.body.employeeDataJson[k][req.body.EmployeeDataMapExcel[0][excelCol[l]]])

                        querySl = querySl + 1
                        query[querySl] = "call  BULK_DEPARTMENT_ENTRY (_p_,_p_, _p_,_p_)"
                        parm.push([
                            department,
                            apiSecurity.orgID(req.headers.user_id),
                            apiSecurity.branch(req.headers.user_id),
                            req.headers.user_id
                        ])







                    }
                    else {


                    }
                }

            }




        }


        gloDBconn.get_info(query, parm, function (result) {
            if (result == "error") {
                console.log(result)
                req.connection.destroy();
            } else {

                res.send('ok')
            }
        })
    })

    app.post(gv.apiRewrite + '/EmployeeDataUpload', function (req, res, next) {

        var excelCol = Object.keys(req.body.EmployeeDataMapExcel[0])
        var dbCol = "", query = [], parm = [], querySl = 0;
        for (j = 0; j < excelCol.length; j++) {

            if (req.body.EmployeeDataMapExcel[0][excelCol[j]] >= 0) {
                dbCol = dbCol + excelCol[j] + ','
            }

        }

        dbCol = dbCol + 'ORG_ID,BRANCH,DML_BY,DML_TIME,SL'

        querySl = 0;
        query[querySl] = gv.dbSyntex["transaction"][gv.DB];
        parm.push([])

        for (var k = 1; k < req.body.employeeDataJson.length; k++) {
            querySl = querySl + 1
            query[querySl] = ` update application_sl_generator set sl_generator=sl_generator+1  where lower(table_name)='employee' and  
    lower(col_name)='sl' and org_id=_p_ and branch=_p_`
            parm.push([

                apiSecurity.orgID(req.headers.user_id),
                apiSecurity.branch(req.headers.user_id),

            ])

            querySl = querySl + 1
            query[querySl] = `insert into employee (` + dbCol + `) values(`
            parm.push([])


            for (l = 0; l < excelCol.length; l++) {


                if (req.body.EmployeeDataMapExcel[0][excelCol[l]] >= 0) {

                    if (excelCol[l] == 'DESIGNATION') {


                        var designation = String(req.body.employeeDataJson[k][req.body.EmployeeDataMapExcel[0][excelCol[l]]])

                        /*    var queryD = [], parmD = [], querySlD = 0;
    
                            querySlD = 0;
                            queryD[querySlD] = gv.dbSyntex["transaction"][gv.DB];
                            parmD.push([])
    
                            querySlD = querySlD + 1;
                            queryD[querySlD] = "call  BULK_DESIGNATION_ENTRY (_p_,_p_, _p_,_p_)";
                            parmD.push([
                                designation,
                                apiSecurity.orgID(req.headers.user_id),
                                apiSecurity.branch(req.headers.user_id),
                                req.headers.user_id
                            ])
    
                            gloDBconn.get_info(queryD, parmD, function (result) {
                                if (result == "error") {
    
                                    req.connection.destroy();
                                } else {
    
    
                                }
                            })
    */

                        query[querySl] = query[querySl] + "(select sl from designation where lower(replace(designation,' ',''))=lower(replace('" + designation + "',' ','')) and org_id='" + apiSecurity.orgID(req.headers.user_id) + "' and branch='" + apiSecurity.branch(req.headers.user_id) + "'),"



                    } else if (excelCol[l] == 'DEPARTMENT') {


                        var department = String(req.body.employeeDataJson[k][req.body.EmployeeDataMapExcel[0][excelCol[l]]])

                        /*   var queryD = [], parmD = [], querySlD = 0;
   
                           querySlD = 0;
                           queryD[querySlD] = gv.dbSyntex["transaction"][gv.DB];
                           parmD.push([])
   
                           querySlD = querySlD + 1;
                           queryD[querySlD] = "call  BULK_DEPARTMENT_ENTRY (_p_,_p_, _p_,_p_)";
                           parmD.push([
                               department,
                               apiSecurity.orgID(req.headers.user_id),
                               apiSecurity.branch(req.headers.user_id),
                               req.headers.user_id
                           ])
   
                           gloDBconn.get_info(queryD, parmD, function (result) {
                               if (result == "error") {
   
                                   req.connection.destroy();
                               } else {
   
   
                               }
                           })
   */

                        query[querySl] = query[querySl] + "(select sl from department where lower(replace(department,' ',''))=lower(replace('" + department + "',' ','')) and org_id='" + apiSecurity.orgID(req.headers.user_id) + "' and branch='" + apiSecurity.branch(req.headers.user_id) + "'),"



                    }
                    else {
                        query[querySl] = query[querySl] + `_p_,`
                        parm[querySl].push(String(req.body.employeeDataJson[k][req.body.EmployeeDataMapExcel[0][excelCol[l]]]))

                    }
                }

            }

            query[querySl] = query[querySl] + `_p_,_p_,_p_,current_timestamp,(select concat(concat(_p_,_p_)
            ,sl_generator) sl FROM application_sl_generator WHERE lower(table_name) = 'employee' AND lower(col_name) = 'sl' 
            AND org_id =_p_ AND branch = _p_))`

            parm[querySl].push(apiSecurity.orgID(req.headers.user_id))
            parm[querySl].push(apiSecurity.branch(req.headers.user_id))
            parm[querySl].push(req.headers.user_id)
            parm[querySl].push(apiSecurity.orgID(req.headers.user_id))
            parm[querySl].push(apiSecurity.branch(req.headers.user_id))
            parm[querySl].push(apiSecurity.orgID(req.headers.user_id))
            parm[querySl].push(apiSecurity.branch(req.headers.user_id))


        }


        gloDBconn.get_info(query, parm, function (result) {
            if (result == "error") {
                console.log(result)
                req.connection.destroy();
            } else {

                res.send('ok')
            }
        })
    })

    app.post(gv.apiRewrite + '/eduDataUploadV2', function (req, res, next) {


        var excelCol = Object.keys(req.body.ClassDataMapExcel[0])
        var dbCol = "", query = [], parm = [], querySl = 0;
        for (j = 0; j < excelCol.length; j++) {

            if (req.body.ClassDataMapExcel[0][excelCol[j]] >= 0) {
                dbCol = dbCol + excelCol[j] + ','
            }

        }
        dbCol = dbCol + 'ORG_ID,BRANCH,DML_BY,DML_TIME,SL,CLASS,SECTION,ACADEMIC_YEAR'
        querySl = 0;
        query[querySl] = gv.dbSyntex["transaction"][gv.DB];
        parm.push([])

        for (var i = 0; i < req.body.classDataRange.length; i++) {

            if (req.body.classDataRange[i].rs > 0 && req.body.classDataRange[i].re > 0) {
                for (var k = req.body.classDataRange[i].rs; k <= req.body.classDataRange[i].re; k++) {
                    querySl = querySl + 1
                    query[querySl] = ` update application_sl_generator set sl_generator=sl_generator+1  where lower(table_name)='edu_student' and  
            lower(col_name)='sl' and org_id=_p_ and branch=_p_`
                    parm.push([

                        apiSecurity.orgID(req.headers.user_id),
                        apiSecurity.branch(req.headers.user_id),

                    ])

                    querySl = querySl + 1
                    query[querySl] = `insert into edu_student (` + dbCol + `) values(`
                    parm.push([])
                    for (l = 0; l < excelCol.length; l++) {


                        if (req.body.ClassDataMapExcel[0][excelCol[l]] >= 0) {
                            query[querySl] = query[querySl] + `_p_,`
                            if (excelCol[l] == 'GENDER') {
                                var gender = String(req.body.classDataJson[k][req.body.ClassDataMapExcel[0][excelCol[l]]])
                                gender = gender.replace(/ /g, "")
                                gender = gender.toLowerCase();
                                if (gender == 'female') {
                                    gender = '1'
                                } else if (gender == 'male') {
                                    gender = '2'
                                } else {
                                    gender = ''
                                }
                                parm[querySl].push(gender)

                            }
                            else {
                                parm[querySl].push(String(req.body.classDataJson[k][req.body.ClassDataMapExcel[0][excelCol[l]]]))

                            }
                        }

                    }

                    query[querySl] = query[querySl] + `_p_,_p_,_p_,current_timestamp,(select concat(concat(_p_,_p_)
                    ,sl_generator) sl FROM application_sl_generator WHERE lower(table_name) = 'edu_student' AND lower(col_name) = 'sl' 
                    AND org_id =_p_ AND branch = _p_),_p_,_p_,_p_)`
                    parm[querySl].push(apiSecurity.orgID(req.headers.user_id))
                    parm[querySl].push(apiSecurity.branch(req.headers.user_id))
                    parm[querySl].push(req.headers.user_id)
                    parm[querySl].push(apiSecurity.orgID(req.headers.user_id))
                    parm[querySl].push(apiSecurity.branch(req.headers.user_id))
                    parm[querySl].push(apiSecurity.orgID(req.headers.user_id))
                    parm[querySl].push(apiSecurity.branch(req.headers.user_id))
                    parm[querySl].push(String(req.body.classDataRange[i].class))
                    parm[querySl].push(String(req.body.classDataRange[i].section))
                    parm[querySl].push(String(req.body.classDataRange[i].session))

                }
            }
        }


        gloDBconn.get_info(query, parm, function (result) {
            if (result == "error") {
                console.log(result)
                req.connection.destroy();
            } else {

                res.send('ok')
            }
        })

    })

    app.post(gv.apiRewrite + '/eduDataImport', function (req, res, next) {

        fileSave();



        xlsxFile(rootLoc + '/userFiles/orgAssets/' + apiSecurity.orgID(req.headers.user_id) + "/" + fileName, { sheet: 'Student' }).then((rows) => {



            var query = [], parm = [], tempQuery, querySl = 0, dynamicQuery = [];

            querySl = 0;
            query[querySl] = gv.dbSyntex["transaction"][gv.DB];
            parm.push([])

            for (var i = 1; i < rows.length; i++) {

                var gender = String(rows[i][6])
                gender = gender.replace(/ /g, "")
                gender = gender.toLowerCase();
                if (gender == 'female') {
                    gender = '1'
                } else if (gender == 'male') {
                    gender = '2'
                } else {
                    gender = ''
                }




                querySl = querySl + 1
                query[querySl] = ` update application_sl_generator set sl_generator=sl_generator+1  where lower(table_name)='edu_student' and  
                lower(col_name)='sl' and org_id=_p_ and branch=_p_`
                parm.push([

                    apiSecurity.orgID(req.headers.user_id),
                    apiSecurity.branch(req.headers.user_id),

                ])

                querySl = querySl + 1
                query[querySl] = `insert into edu_student (
                    SL,
                    ORG_ID,
                    BRANCH,
                    DML_BY,
                    DML_TIME,
                    NAME,
                    CLASS,
                    SECTION,
                    ACADEMIC_YEAR,
                    ROLL,
                    GENDER,
                    STUDENT_PHONE,
                    GUARDIAN_PHONE
                    )values(
                        (select concat(concat(_p_,_p_)
 ,sl_generator) sl FROM application_sl_generator WHERE lower(table_name) = 'edu_student' AND lower(col_name) = 'sl' 
 AND org_id =_p_ AND branch = _p_),
 _p_,
 _p_,
 _p_,
 current_timestamp,
 _p_,
 _p_,
 _p_,
 _p_,
 _p_,
 _p_,
 _p_,
 _p_

                    )`
                parm.push([

                    apiSecurity.orgID(req.headers.user_id),
                    apiSecurity.branch(req.headers.user_id),
                    apiSecurity.orgID(req.headers.user_id),
                    apiSecurity.branch(req.headers.user_id),
                    apiSecurity.orgID(req.headers.user_id),
                    apiSecurity.branch(req.headers.user_id),
                    req.headers.user_id,
                    String(rows[i][2]),
                    req.body.class,
                    req.body.section,
                    req.body.session,
                    String(rows[i][3]),
                    gender,
                    String(rows[i][4]),
                    String(rows[i][5]),

                ])









            }





            gloDBconn.get_info(query, parm, function (result) {
                if (result == "error") {
                    console.log(result)
                    req.connection.destroy();
                } else {

                    res.send('ok')
                }
            })





            /*  var query = [], parm = [], tempQuery, querySl = 0, dynamicQuery = [];

              querySl = 0;
              query[querySl] = gv.dbSyntex["transaction"][gv.DB];
              parm.push([])

              querySl = querySl + 1
              query[querySl] = "call org_class (_p_,_p_)"
              parm.push([
                  apiSecurity.orgID(req.headers.user_id),
                  apiSecurity.branch(req.headers.user_id)
              ])

              querySl = querySl + 1
              query[querySl] = "call org_section (_p_,_p_)"
              parm.push([
                  apiSecurity.orgID(req.headers.user_id),
                  apiSecurity.branch(req.headers.user_id)
              ])
      
              querySl = querySl + 1
              query[querySl] = "call org_student (_p_,_p_)"
              parm.push([
                  apiSecurity.orgID(req.headers.user_id),
                  apiSecurity.branch(req.headers.user_id)
              ])
      
         
      
              gloDBconn.get_info(query, parm, function (result) {
                  if (result == "error") {
                      req.connection.destroy();
                  } else {
      
                      
                  }
              })
*/







        })







        var fileName = ''
        function fileSave() {
            try {
                let base64String = req.body.file;

                let base64Image = base64String
                    .split(';base64,')
                    .pop();
                var ext = req.body.fileEXT.substr(req.body.fileEXT.lastIndexOf('.') + 1);

                fileName = uuid.v1() + '.' + ext





                if (!fs.existsSync(rootLoc + '/userFiles/orgAssets/' + apiSecurity.orgID(req.headers.user_id) + '/')) {
                    fs.mkdirSync(rootLoc + '/userFiles/orgAssets/' + apiSecurity.orgID(req.headers.user_id) + '/', { recursive: true });
                }



                fs.writeFile(rootLoc + '/userFiles/orgAssets/' + apiSecurity.orgID(req.headers.user_id) + "/" + fileName, base64Image, {
                    encoding: 'base64'
                }, function (err) { });
            } catch (ex) { console.log(ex) }
        }
    });


    var indices = [];
    var array = [1, 2, 3, 4, 1, 1];
    var element = 1;
    var idx = array.indexOf(element);
    while (idx != -1) {
        indices.push(idx);
        idx = array.indexOf(element, idx + 1);
    }
  //  console.log(indices);


};