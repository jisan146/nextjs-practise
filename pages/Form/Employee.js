import React, { Component } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import cookie from 'react-cookies'
import Table from '../layouts/Table';
import Grid from '../layouts/Grid';
import DetailsView from '../layouts/DetailsView';
import PageTitleAndTab from '../layouts/PageTitleAndTab';
import Head from 'next/head'
import Script from 'next/script'


class Employee extends Component {

    host = ""
    pageTitle = 'Employee'
    page_id = '/Form/Employee'
    dbTblName = 'employee'
    requiredField = ["employee_name", "department", "designation", "phone", "gender"]
    allFiled = ["employee_id", "employee_name", "department", "designation", "phone", "email", "join_date", "nid", "photo", "inial", "gender"]
    blobField = ['photo']
    dataSubmitLink = '/req/v5/call/employee_entry'
    getDatalistLink = '/req/v5/empList'
    dataEditReqLink = '/req/v5/empEdit'
    dataEditLink = '/req/v5/info/update/employee'
    selectTagListReqLink = '/req/v5/'
    selectParentList = []
    selectChieldList = []

    componentDidMount() {
        this.selectParentList["designation"] = ["department"]
        this.selectChieldList["department"] = ["designation"]
        this.tabActive('privilege_list_active')
        var host = cookie.load('host');
        this.host = host.host

        axios
            .post(this.host + '/req/v5/privilege', { page_id: this.page_id })
            .then(response => {


                var privileges = Object.keys(response.data);

                for (var p = 0; p < privileges.length; p++) {
                    this.setState({ [privileges[p]]: response.data[privileges[p]] }, () => { });
                }

            })
            .catch(error => {

            })

        this.requiredFieldSet()
        this.tableData()

    }
    tabActive(tabName) {

        if (tabName == 'privilege_list_active') {
            this.setState({ privilege_list_active: ' active' }, () => { });
            this.setState({ privilege_grid_active: ' ' }, () => { });
            this.setState({ privilege_full_view_active: ' ' }, () => { });
            this.setState({ privilege_add_active: ' ' }, () => { });
        } else if (tabName == 'privilege_grid_active') {
            this.setState({ privilege_list_active: ' ' }, () => { });
            this.setState({ privilege_grid_active: ' active' }, () => { });
            this.setState({ privilege_full_view_active: ' ' }, () => { });
            this.setState({ privilege_add_active: ' ' }, () => { });
        }
        else if (tabName == 'privilege_full_view_active') {
            this.setState({ privilege_list_active: ' ' }, () => { });
            this.setState({ privilege_grid_active: ' ' }, () => { });
            this.setState({ privilege_full_view_active: ' active' }, () => { });
            this.setState({ privilege_add_active: ' ' }, () => { });
        }
        else if (tabName == 'privilege_add_active') {
            this.setState({ privilege_list_active: ' ' }, () => { });
            this.setState({ privilege_grid_active: ' ' }, () => { });
            this.setState({ privilege_full_view_active: ' ' }, () => { });
            this.setState({ privilege_add_active: ' active' }, () => { });
        }
    }
    componentDidUpdate() {

        if (this.state.tblRefresh.tblRefresh == 1) {
            this.tableData()
            this.setState({ tblRefresh: 0 })
        } else if (this.state.tblRefresh.tblEdit == 1) {

            this.setState({ tblEdit: 1 })
            this.tabActive('privilege_add_active')
            var data = Object.keys(this.state.tblRefresh.data);
            var localState = []
            for (var d = 0; d < data.length; d++) {


                if (this.state.tblRefresh.data[data[d]] == null) {
                    this.setState({ [data[d]]: '' }, () => { });
                    localState[data[d]] = ''
                } else {
                    this.setState({ [data[d]]: this.state.tblRefresh.data[data[d]] }, () => { });
                    localState[data[d]] = this.state.tblRefresh.data[data[d]]
                }
            }

            for (var i = 0; i < data.length; i++) {


                /* if (this.state.tblRefresh.data[data[i]] == null) {
                     this.setState({ [data[i]]: '' }, () => { });
                 } else {
                     this.setState({ [data[i]]: this.state.tblRefresh.data[data[i]] }, () => { });
                 }*/

                /* if (this.blobField.indexOf(data[i]) >= 0) {
 
                 }*/
                try {
                    var tagName = document.getElementById(data[i]).tagName;

                    if (tagName.toLocaleLowerCase() == 'select') {
                        var data_list = document.getElementById(data[i]).getAttribute('data_list');

                        this.selectTagListFunc(data[i], data_list, localState, 1)
                    }

                } catch { }


                var requiredField = data[i].toLowerCase()
                var value = String(this.state.tblRefresh.data[data[i]])
                /*  try {
                      var input = document.getElementById(requiredField);
                      var getAttribute = input.getAttribute('data_list');
                      var name = requiredField
  
                      axios
                          .post(this.host + this.selectTagListReqLink + getAttribute)
                          .then(response => {
                              var options = []
                              options = response.data[0].map(list => {
                                  return <option value={list.r}>{list.v}</option>
                              })
                              this.setState({ [name + '_SelectList']: options }, () => { });
                          })
                          .catch(error => { })
                  }
                  catch { }*/



                if (this.requiredField.indexOf(requiredField) >= 0 && value.length > 0) {
                    document.getElementById(data[i]).style.border = '1px solid green';

                    if (this.requiredFieldComplete.indexOf(requiredField) < 0) {
                        this.requiredFieldComplete.push(requiredField)
                    }

                } else if (this.requiredField.indexOf(requiredField) >= 0 && value.length == 0) {
                    document.getElementById(data[i]).style.border = '1px solid red';

                    var requiredFieldCompleteIndex = this.requiredFieldComplete.indexOf(requiredField);
                    this.requiredFieldComplete.splice(requiredFieldCompleteIndex, 1);
                }
            }

            for (var dd = 0; dd < data.length; dd++) {


                if (this.state.tblRefresh.data[data[dd]] == null) {
                    this.setState({ [data[dd]]: '' }, () => { });
                  
                } else {
                    this.setState({ [data[dd]]: this.state.tblRefresh.data[data[dd]] }, () => { });
                   
                }
            }
            this.setState({ tblRefresh: 0 })
        }
    }


    requiredFieldSet() {
        if (this.state.privilege_add == 1) {


            for (var af = 0; af < this.allFiled.length; af++) {
                this.setState({ [this.allFiled[af]]: '' })
            }
            for (var i = 0; i < this.requiredField.length; i++) {
                var name = this.requiredField[i]
                name = name.toLowerCase()

                document.getElementById(name).style.border = '1px solid red';
            }
        }

    }

    constructor() {
        super()
        this.state = {
            title: this.pageTitle,
            tableCol: [],
            tableRow: [],
            allTableData: [],
            tblRefresh: 0,
            tblEdit: [],
            loading: 0,
            privilege_sl: 0,
            privilege_view: 0,
            privilege_edit: 0,
            privilege_delete: 0,
            privilege_list: 0,
            privilege_grid: 0,
            privilege_full_view: 0,
            privilege_add: 1,
            file: null,
            base64URL: ""

        }
    }
    handleCallback = (tblRefresh) => {
        this.setState({ tblRefresh: tblRefresh })
    }
    tableData() {


        axios
            .post(this.host + this.getDatalistLink)
            .then(response => {

                this.setState({ tableRow: response.data[0] }, () => { });
                var tableColName = Object.keys(response.data[0][0]);
                this.setState({ tableCol: tableColName }, () => { });

            })
            .catch(error => {

            })

    }
    selectTagList = (event) => {

        this.selectTagListFunc(event.target.name, event.target.getAttribute('data_list'), '', 0)
    }
    selectTagListFunc = (name_, data_list, parentData, flag) => {


        var name = name_;

        var submitData = {}



        try {
            for (var c = 0; c < this.selectChieldList[name].length; c++) {

                this.setState({ [this.selectChieldList[name][c] + '_SelectList']: [] }, () => { });
                this.setState({ [this.selectChieldList[name][c]]: '' }, () => { });

                var requiredField = this.selectChieldList[name][c].toLowerCase()
                document.getElementById(requiredField).style.border = '1px solid red';

            }
        }
        catch { }

        try {

            // console.log(parentData)
            if (flag == 1) {
                for (var k = 0; k < this.selectParentList[name].length; k++) {
                    submitData[this.selectParentList[name][k]] = parentData[this.selectParentList[name][k]]

                }
            } else {
                for (var k = 0; k < this.selectParentList[name].length; k++) {
                    submitData[this.selectParentList[name][k]] = this.state[this.selectParentList[name][k]]

                }
            }

        }
        catch (ex) { }

        axios
            .post(this.host + this.selectTagListReqLink + data_list, submitData)
            .then(response => {
                var options = []
                options = response.data[0].map(list => {
                    return <option value={list.r}>{list.v}</option>
                })
                this.setState({ [name + '_SelectList']: options }, () => { });
            })
            .catch(error => { })
        submitData = {}

    }




    selectInputAttr(className, name, data_list) {
        var inputAttr =
        {
            className: className,
            name: name.toLowerCase(),
            id: name.toLowerCase(),
            onChange: this.onchg,
            value: this.state[name.toLowerCase()],
            data_list: data_list,
            onClick: this.selectTagList,
            style:{border:'1px solid #A9A9A9'}
        }
        return inputAttr;
    };
    onchg = (event) => {

        this.tabActive('privilege_add_active')
        var name = event.target.name;
        var value = event.target.value;



        this.setState({ [name]: value }, () => { });
        var requiredField = name.toLowerCase()


        if (this.requiredField.indexOf(requiredField) >= 0 && value.length > 0) {
            document.getElementById(name).style.border = '1px solid green';

            if (this.requiredFieldComplete.indexOf(requiredField) < 0) {
                this.requiredFieldComplete.push(requiredField)
            }

        } else if (this.requiredField.indexOf(requiredField) >= 0 && value.length == 0) {
            document.getElementById(name).style.border = '1px solid red';

            var requiredFieldCompleteIndex = this.requiredFieldComplete.indexOf(requiredField);
            this.requiredFieldComplete.splice(requiredFieldCompleteIndex, 1);
        }

    }
    requiredFieldComplete = []
    inputAttr(type, className, name, placeholder) {
        var inputAttr =
        {
            type: type,
            className: className,
            name: name.toLowerCase(),
            id: name.toLowerCase(),
            onChange: this.onchg,
            value: this.state[name.toLowerCase()],
            placeholder: placeholder,
            autoComplete: "off",
            style:{border:'1px solid #A9A9A9'}

        }
        return inputAttr;
    };






    edit = async e => {


        var submitData = {}
        for (var k = 0; k < this.allFiled.length; k++) {
            submitData[this.allFiled[k]] = this.state[this.allFiled[k]]
        }
        submitData['tableSL'] = this.state.tablesl




        if (this.requiredFieldComplete.length == this.requiredField.length) {

            axios
                .post(this.host + this.dataEditLink, submitData)
                .then(response => {
                    this.setState({ loading: 1 }, () => { });
                    this.requiredFieldComplete = []
                    clearFileInput();
                    this.tableData()
                    toast.success("Information Updated", {
                        theme: "colored",
                        autoClose: 1000
                    })



                    for (var i = 0; i < this.allFiled.length; i++) {

                        this.setState({ [this.allFiled[i]]: '' }, () => { });
                    }
                    this.requiredFieldSet()
                    this.setState({ loading: 0 }, () => { });
                    this.setState({ tblEdit: 0 })
                    this.tabActive('privilege_list_active')

                })
                .catch(error => {

                    toast.error("Failed to Update Information", {
                        theme: "colored",
                        autoClose: 1000
                    })
                    this.setState({ loading: 0 }, () => { });
                })
        }
        else {
            toast.warn("Required Field Can't Empty", {
                theme: "colored",
                autoClose: 1000
            })
        }

    }
    submit = async e => {


        var submitData = {}
        for (var k = 0; k < this.allFiled.length; k++) {
            submitData[this.allFiled[k]] = this.state[this.allFiled[k]]
        }



        if (this.requiredFieldComplete.length == this.requiredField.length) {

            axios
                .post(this.host + this.dataSubmitLink, submitData)
                .then(response => {
                    this.setState({ loading: 1 }, () => { });
                    this.requiredFieldComplete = []
                    clearFileInput();
                    this.tableData()
                    toast.success("Information Submitted", {
                        theme: "colored",
                        autoClose: 1000
                    })



                    for (var i = 0; i < this.allFiled.length; i++) {

                        this.setState({ [this.allFiled[i]]: '' }, () => { });
                    }
                    this.requiredFieldSet()
                    this.setState({ loading: 0 }, () => { });

                    this.tabActive('privilege_list_active')

                })
                .catch(error => {

                    toast.error("Failed to Submit Information", {
                        theme: "colored",
                        autoClose: 1000
                    })
                    this.setState({ loading: 0 }, () => { });
                })
        }
        else {
            toast.warn("Required Field Can't Empty", {
                theme: "colored",
                autoClose: 1000
            })
        }

    }



    handleFileInputChange = e => {

        let { file } = this.state;

        file = e.target.files[0];

        this.setState({ [e.target.name]: '' }, () => { });
        this.setState({ [e.target.name]: {} }, () => { });

        this.setState({ [e.target.name]: { file: file, name: e.target.files[0].name, ext: e.target.files[0].name.split('.').pop() } }, () => { });
        //  console.log("File Is", file);
        this.getBase64(file)
            .then(result => {
                file["base64"] = result;
                //  console.log("File Is", result);
                this.setState({
                    base64URL: result,
                    file
                });
                //  this.setState({ [e.target.name]: {file:file,data:result} }, () => { });

            })
            .catch(err => {
                //  console.log(err);
            });

        this.setState({
            file: e.target.files[0]
        });
    };
    getBase64 = file => {
        return new Promise(resolve => {
            let fileInfo;
            let baseURL = "";
            // Make new FileReader
            let reader = new FileReader();

            // Convert the file to base64 text
            reader.readAsDataURL(file);

            // on reader load somthing...
            reader.onload = () => {
                // Make a fileInfo Object

                baseURL = reader.result;

                resolve(baseURL);
            };

        });
    };

    render() {



        return (
            <>
                <Head>
                    <title>{this.state.title}</title>

                </Head>
                <div>

                    <PageTitleAndTab
                        title={this.state.title}
                        privilege_list={this.state.privilege_list}
                        privilege_grid={this.state.privilege_grid}
                        privilege_full_view={this.state.privilege_full_view}
                        privilege_add={this.state.privilege_add}

                        privilege_list_active={this.state.privilege_list_active}
                        privilege_grid_active={this.state.privilege_grid_active}
                        privilege_full_view_active={this.state.privilege_full_view_active}
                        privilege_add_active={this.state.privilege_add_active}

                    ></PageTitleAndTab>
                    <div className="section-body mt-4">
                        <div className="container-fluid">
                            <div className="tab-content">
                                {this.state.privilege_list == 1 ?
                                    <Table
                                        queryList="" tableCol={this.state.tableCol} tableRow={this.state.tableRow}
                                        tbl_name={this.dbTblName} col_name="sl"
                                        parentCallback={this.handleCallback}
                                        privilege_sl={this.state.privilege_sl}
                                        privilege_view={this.state.privilege_view}
                                        privilege_edit={this.state.privilege_edit}
                                        privilege_delete={this.state.privilege_delete}
                                        privilege_list_active={this.state.privilege_list_active}
                                        dataEditReqLink={this.dataEditReqLink}
                                    ></Table> : <></>
                                }

                                {this.state.privilege_grid == 1 ?
                                    <Grid></Grid> : <></>
                                }

                                {this.state.privilege_full_view == 1 ?
                                    <DetailsView></DetailsView> : <></>
                                }
                                {/**** */}
                                {this.state.privilege_add == 1 ?
                                    <div className={"tab-pane " + this.state.privilege_add_active} id="Form">
                                        <div className="row clearfix">
                                            <div className="col-sm-12">
                                                <div className="card">
                                                    <div className="card-header">
                                                        <h3 className="card-title">Add {this.state.title} Basic Information</h3>
                                                        <div className="card-options ">

                                                        </div>
                                                    </div>
                                                    <div className="card-body">
                                                        <div className="row clearfix">

                                                            <div className="col-md-6 col-sm-12">
                                                                <div className="form-group">
                                                                    <label className="col-form-label">Employee Name<span className="text-danger">*</span></label>
                                                                    <input {...this.inputAttr('text', "form-control", "employee_name", "")} />
                                                                </div>
                                                            </div>

                                                            <div className="col-md-6 col-sm-12">
                                                                <div className="form-group">
                                                                    <label className="col-form-label">Gender<span className="text-danger">*</span></label>
                                                                    <select {...this.selectInputAttr("form-control", "gender", "genderList")}>
                                                                        <option value={''}>-- Gender --</option>
                                                                        {this.state.gender_SelectList}
                                                                    </select>
                                                                </div>
                                                            </div>



                                                            <div className="col-md-6 col-sm-12">
                                                                <div className="form-group">
                                                                    <label className="col-form-label">Department<span className="text-danger">*</span></label>
                                                                    <select {...this.selectInputAttr("form-control", "department", "selectDeptList")}>
                                                                        <option value={''}>-- Department --</option>
                                                                        {this.state.department_SelectList}
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6 col-sm-12">
                                                                <div className="form-group">
                                                                    <label className="col-form-label">Designation<span className="text-danger">*</span></label>
                                                                    <select {...this.selectInputAttr("form-control", "designation", "selectDesignationList")}>
                                                                        <option value={''}>-- Designation --</option>
                                                                        {this.state.designation_SelectList}
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6 col-sm-12">
                                                                <div className="form-group">
                                                                    <label className="col-form-label">Phone<span className="text-danger">*</span></label>
                                                                    <input {...this.inputAttr('text', "form-control", "phone", "")} />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6 col-sm-12">
                                                                <div className="form-group">
                                                                    <label className="col-form-label">Email<span className="text-danger"></span></label>
                                                                    <input {...this.inputAttr('text', "form-control", "email", "")} />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6 col-sm-12">
                                                                <div className="form-group">
                                                                    <label className="col-form-label">Join Date<span className="text-danger"></span></label>
                                                                    <input class="form-control"  {...this.inputAttr('date', "form-control", "join_date", "")} />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6 col-sm-12">
                                                                <div className="form-group">
                                                                    <label className="col-form-label">NID<span className="text-danger"></span></label>
                                                                    <input {...this.inputAttr('text', "form-control", "nid", "")} />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6 col-sm-12">
                                                                <div className="form-group">
                                                                    <label className="col-form-label">Inial<span className="text-danger"></span></label>
                                                                    <input {...this.inputAttr('text', "form-control", "inial", "")} />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6 col-sm-12">
                                                                <div className="form-group">
                                                                    <label className="col-form-label">Employee ID<span className="text-danger"></span></label>
                                                                    <input {...this.inputAttr('text', "form-control", "employee_id", "")} />
                                                                </div>
                                                            </div>


                                                            <div className="col-sm-12">
                                                                <div className="form-group mt-2 mb-3">
                                                                    <label className="col-form-label">Employee Photo<span className="text-danger">*</span></label>
                                                                    <input name='photo' id='photo' onChange={this.handleFileInputChange} style={{ border: '1px solid red' }} type="file" className="dropify" />
                                                                    <small id="fileHelp" className="form-text text-muted"></small>
                                                                </div>
                                                            </div>

                                                            <div className="col-sm-12">
                                                                {
                                                                    this.state.loading == 0 ? <>
                                                                        {this.state.tblEdit == 1 ?
                                                                            <><button onClick={this.edit} type="submit" className="btn btn-primary">
                                                                                Edit
                                                                            </button>&nbsp;</> :
                                                                            <><button onClick={this.submit} type="submit" className="btn btn-primary">
                                                                                Submit
                                                                            </button>&nbsp;</>
                                                                        }</>
                                                                        : <>
                                                                            <button class="btn btn-primary" type="button" disabled>
                                                                                <span class="spinner-border spinner-border-sm text-danger" role="status" aria-hidden="true"></span>
                                                                                Wait...
                                                                            </button>&nbsp;
                                                                        </>
                                                                }

                                                                <button type="submit" className="btn btn-outline-secondary">Cancel</button>&nbsp;

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    : <></>}
                                {/**** */}







                            </div>
                        </div>
                    </div>
                </div>

                <Script
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `
              $(function () {
                //Initialize Select2 Elements
                $('.dropify').dropify();

              })
  `,
                    }}
                />

                <Script
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `
          function   clearFileInput()
                    {
                        var drEvent = $('#photo').dropify();
drEvent = drEvent.data('dropify');
drEvent.resetPreview();
drEvent.clearElement();
                    }
  `,
                    }}
                />

            </>
        )
    }
}
export default Employee;
