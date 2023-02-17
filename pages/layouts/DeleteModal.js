import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookies'
class DeleteModal extends Component {

    host = ""
    componentDidMount() {
        var host = cookie.load('host');
        this.host = host.host
    }
    submit = async e => {




        axios
            .post(this.host + '/req/v5/call/delete_data',
                {
                    tbl_name: this.props.tbl_name,
                    col_name: this.props.col_name,
                    col_val: this.props.col_val
                })
            .then(response => {
                
                var btnclose = document.getElementById('w-change-close');
                btnclose.click()
                this.props.parentCallback(1);
                e.preventDefault();
              

            })
            .catch(error => { })




    }

    render() {
        return (
            <>
                {/* Delete Modal */}
                <div class={"modal fade bd-example-modal-default_del"} tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-default">
                        <div class="modal-content">
                            <div class="card card-danger">
                                <div class="card-header">
                                    <h3 class="card-title"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i>&nbsp;Delete This Information?</h3>
                                </div>
                                <div class="card-body">
                                    {/** Form Input Element Generator Start */}
                                    <div class="callout callout-danger">


                                        <p>Warning: This action cannot be undone!</p>
                                    </div>
                                    {/** Form Input Element Generator End*/}
                                </div>

                                <div class="card-footer">
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <button
                                                focusID="submit"
                                                onClick={this.submit}

                                                class="btn btn-danger ">
                                                YES,DELETE
                                            </button>

                                            <button id="w-change-close" type="button" class="btn btn-secondary float-right" data-dismiss="modal">CANCEL,KEEP</button>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Delete Modal */}
            </>
        )
    }
}
export default DeleteModal;
