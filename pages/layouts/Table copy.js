import React, { Component } from 'react';
import DeleteModal from './DeleteModal';
import axios from 'axios';
import cookie from 'react-cookies'
String.prototype.initCap = function () {
    return this
        .toLowerCase()
        .replace(/_/g, " ")
        .replace(/(?:^|\s)[a-z]/g, function (m) {
            return m.toUpperCase();
        });
};

class Table extends Component {
    host = ""
    constructor() {
        super()
        this.state = {
            delVal: '',
            tblRefresh: 0
        }
    }
    dataDel = (event) => {

        this.setState({ delVal: event.currentTarget.name })


    }
    dataEditReq = (event) => {
        var host = cookie.load('host');
        this.host = host.host
        this.setState({ delVal: event.currentTarget.name })

        axios
            .post(this.host + this.props.dataEditReqLink, { sl: event.currentTarget.name }) 
            .then(response => {


                this.props.parentCallback({ tblEdit: 1, data: response.data[0][0] });

            })
            .catch(error => {

            })


    }
    componentDidUpdate() {
        // 
        // e.preventDefault();
        if (this.state.tblRefresh == 1) {
            this.props.parentCallback({ tblRefresh: 1 });
            this.setState({ tblRefresh: 0 })
        }
    }
    handleCallback = (tblRefresh) => {
        this.setState({ tblRefresh: tblRefresh })
    }


    render() {
        return (
            <>
                <div className={"tab-pane " + this.props.privilege_list_active} id="List">
                    <div className="card">
                        <div className="table-responsive">
                            <table className="table table-hover table-vcenter text-nowrap table-striped mb-0">
                                <thead>
                                    <tr>
                                        {this.props.tableCol.map(tableColName => {
                                            if (tableColName == 'sl' && this.props.privilege_sl == 0)
                                                return <></>
                                            else return <th>{tableColName.initCap()}</th>
                                        })}

                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>



                                    {this.props.tableRow.map((tableAllRow) => (


                                        <tr>
                                            {this.props.tableCol.map(tableColName => {
                                                if (tableColName == 'sl' && this.props.privilege_sl == 0)
                                                    return <></>
                                                else return <td><div className="font-15">{tableAllRow[tableColName]}</div></td>
                                            })}



                                            <td>




                                                {this.props.privilege_view == 1 ? <>
                                                    <button type="button" className="btn btn-icon btn-sm" title="View"><i className="fa fa-eye" /></button>
                                                </>
                                                    : <></>
                                                }
                                                {this.props.privilege_edit == 1 ? <>
                                                    <button onClick={this.dataEditReq} id={tableAllRow.sl} name={tableAllRow.sl} type="button" className="btn btn-icon btn-sm" title="Edit"><i className="fa fa-edit" /></button>
                                                </>
                                                    : <></>
                                                }

                                                {this.props.privilege_delete == 1 ? <>
                                                    <button onClick={this.dataDel} id={tableAllRow.sl} name={tableAllRow.sl} type="button" className="btn btn-icon btn-sm js-sweetalert" title="Delete" data-type="confirm" data-toggle="modal" data-target={".bd-example-modal-default_del"}><i className="fa fa-trash-o text-danger" /></button>
                                                </>
                                                    : <></>
                                                }



                                            </td>
                                        </tr>
                                    ))}



                                    <DeleteModal parentCallback={this.handleCallback} tbl_name={this.props.tbl_name} col_name={this.props.col_name} col_val={this.state.delVal}></DeleteModal>

                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </>
        )
    }
}
export default Table;
