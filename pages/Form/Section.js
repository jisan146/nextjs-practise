import React, { Component } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import cookie from 'react-cookies'
import Table from '../layouts/Table';
import Grid from '../layouts/Grid';
import DetailsView from '../layouts/DetailsView';
import PageTitleAndTab from '../layouts/PageTitleAndTab';
import Head from 'next/head'


class Section extends Component {

    host = ""
    pageTitle = 'Section'
    page_id = '/Form/Section'
    dbTblName = 'edu_section'
    requiredField = ["section",'class']
    allFiled = ["section", "class", "section_sl"]
    dataSubmitLink = '/req/v5/call/section_entry'
    getDatalistLink = '/req/v5/sectionList'
    dataEditReqLink = '/req/v5/sectionEdit'
    dataEditLink = '/req/v5/info/update/edu_section'
    selectTagListReqLink = '/req/v5/'

    componentDidMount() {
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

            for (var i = 0; i < data.length; i++) {
                this.setState({ [data[i]]: this.state.tblRefresh.data[data[i]] }, () => { });
                var requiredField = data[i].toLowerCase()
                var value = String(this.state.tblRefresh.data[data[i]])
                try {
                    var input = document.getElementById(requiredField);
                    var getAttribute = input.getAttribute('data_list');
                    var name = requiredField
                    console.log(getAttribute)
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
                catch { }



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

        var name = event.target.name;
        axios
            .post(this.host + this.selectTagListReqLink + event.target.getAttribute('data_list'))
            .then(response => {
                var options = []
                options = response.data[0].map(list => {
                    return <option value={list.r}>{list.v}</option>
                })
                this.setState({ [name + '_SelectList']: options }, () => { });
            })
            .catch(error => { })
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
                    this.requiredFieldComplete = []
                    this.setState({ loading: 1 }, () => { });
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

                                {this.state.privilege_add == 1 ?
                                    <div className={"tab-pane " + this.state.privilege_add_active} id="Form">
                                        <div className="card">
                                            <div className="card-header">
                                                <h3 className="card-title">Add {this.state.title}</h3>

                                            </div>

                                            <div className="card-body">


                                            <div className="form-group row">
                                                    <label className="col-md-3 col-form-label">SL<span className="text-danger"></span></label>
                                                    <div className="col-md-7">
                                                        <input {...this.inputAttr('text', "form-control", "section_sl", "")} />
                                                    </div>
                                                </div>

                                                <div className="form-group row">
                                                    <label className="col-md-3 col-form-label">Class<span className="text-danger">*</span></label>
                                                    <div className="col-md-7">
                                                        <select {...this.selectInputAttr("form-control", "class", "selectClassList")}>
                                                            <option value={''}>-- Class --</option>

                                                            {this.state.class_SelectList}





                                                        </select>
                                                    </div>
                                                </div>



                                                <div className="form-group row">
                                                    <label className="col-md-3 col-form-label">Section<span className="text-danger">*</span></label>
                                                    <div className="col-md-7">
                                                        <input {...this.inputAttr('text', "form-control", "section", "")} />
                                                    </div>
                                                </div>

                                                



                                                <div className="form-group row">
                                                    <label className="col-md-3 col-form-label" />
                                                    <div className="col-md-7">
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
                                    </div> : <></>
                                }





                            </div>
                        </div>
                    </div>
                </div>



            </>
        )
    }
}
export default Section;
