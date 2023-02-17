var queryList = [];
queryList[''] = { query: "", parm: [] };
queryList['deptList'] = { query: "select sl,department from department order by sl", parm: [] };
queryList['deptEdit'] = { query: "select department,sl tableSL  from department where sl=_p_ order by sl", parm: ['sl'] };
queryList['designationList'] = {
    query: `select t1.sl, t1.designation,t2.department from designation t1, department t2
where t1.department=t2.sl
order by t2.sl,t1.sl`, parm: []
};
queryList['designationListEdit'] = { query: "select designation,department,sl tableSL  from designation where sl=_p_ order by sl", parm: ['sl'] };
queryList['selectDeptList'] = { query: "select department v, sl r from department", parm: [] };
queryList['selectDesignationList'] = { query: "select designation v, sl r from designation where department=_p_", parm: ['department'] };
queryList['empList'] = { query: "select sl,employee_name,photo,phone from employee order by sl", parm: [] };
queryList['genderList'] = { query: "select 'Male' v , 1 r from dual UNION all select 'Female' v , 2 r from dual UNION all select 'Other' v , 3 r from dual", parm: [] };
queryList['empEdit'] = { query: "select gender,photo,employee_name,sl tableSL,department,phone,designation  from employee where sl=_p_ order by sl", parm: ['sl'] };
queryList['classList'] = { query: "select * from edu_class", parm: [] };
queryList['classEdit'] = { query: "select sl tablesl,class,class_sl from edu_class where sl=_p_", parm: ['sl'] };
queryList['sectionList'] = { query: "select * from edu_section", parm: [] };
queryList['sectionEdit'] = { query: "select sl tablesl,section,section_sl,class,section_sl from edu_section where sl=_p_", parm: ['sl'] };
queryList['selectClassList'] = { query: "select class v, sl r from edu_class", parm: [] };
queryList['selectSectionList'] = { query: "select section v, sl r from edu_section where class=_p_", parm: ['class'] };
queryList['selectAcademicYearList'] = { query: "select system_year v, sl r from global_year", parm: [] };
queryList['studentList'] = { query: "select * from edu_student", parm: [] };
queryList['studentEdit'] = { query: "select sl tablesl,name from edu_student where sl=_p_", parm: ['sl'] };
queryList['applicationMenuList'] = { query: "select * from application_menu", parm: [] };
queryList['selectMenuList'] = { query: "select menu v, sl r from application_menu", parm: [] };
queryList['applicationPageList'] = { query: "select sl,page,link,icon,menu from application_menu_pages", parm: [] };
queryList['applicationPageListEdit'] = { query: "select sl,page,link,icon,menu from application_menu_pages where sl=_p_", parm: ['sl'] };


module.exports = {
    queryList,

};

