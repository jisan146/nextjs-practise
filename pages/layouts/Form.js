import React, { Component } from 'react';
class Form extends Component {
    render() {
        return (
            <>
                <div className="row clearfix">
                    <div className="col-lg-8 col-md-12 col-sm-12">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">Basic Information</h3>
                                <div className="card-options ">
                                    <a href="#" className="card-options-collapse" data-toggle="card-collapse"><i className="fe fe-chevron-up" /></a>
                                    <a href="#" className="card-options-remove" data-toggle="card-remove"><i className="fe fe-x" /></a>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="row clearfix">
                                    <div className="col-md-6 col-sm-12">
                                        <div className="form-group">
                                            <label>First Name</label>
                                            <input type="text" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-12">
                                        <div className="form-group">
                                            <label>Last Name</label>
                                            <input type="text" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-12">
                                        <div className="form-group">
                                            <label>Joining Date</label>
                                            <input data-provide="datepicker" data-date-autoclose="true" className="form-control" placeholder />
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-12">
                                        <label>Gender</label>
                                        <select className="form-control show-tick">
                                            <option value>-- Gender --</option>
                                            <option value={10}>Male</option>
                                            <option value={20}>Female</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6 col-sm-12">
                                        <div className="form-group">
                                            <label>Department</label>
                                            <input type="text" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-12">
                                        <div className="form-group">
                                            <label>Position</label>
                                            <input type="text" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-12">
                                        <div className="form-group">
                                            <label>Phone</label>
                                            <input type="text" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-12">
                                        <div className="form-group">
                                            <label>Enter Your Email</label>
                                            <input type="text" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <div className="form-group mt-2 mb-3">
                                            <input type="file" className="dropify" />
                                            <small id="fileHelp" className="form-text text-muted">This is some placeholder block-level help text for the above input. It's a bit lighter and easily wraps to a new line.</small>
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <div className="form-group mt-3">
                                            <label>Messages</label>
                                            <textarea rows={4} className="form-control no-resize" placeholder="Please type what you want..." defaultValue={""} />
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                        <button type="submit" className="btn btn-outline-secondary">Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-12 col-sm-12">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">Account Information</h3>
                                <div className="card-options ">
                                    <a href="#" className="card-options-collapse" data-toggle="card-collapse"><i className="fe fe-chevron-up" /></a>
                                    <a href="#" className="card-options-remove" data-toggle="card-remove"><i className="fe fe-x" /></a>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="row clearfix">
                                    <div className="col-sm-12">
                                        <div className="form-group">
                                            <label>User Name</label>
                                            <input type="text" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-12">
                                        <div className="form-group">
                                            <label>Password</label>
                                            <input type="text" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-12">
                                        <div className="form-group">
                                            <label>Confirm Password</label>
                                            <input type="text" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                        <button type="submit" className="btn btn-outline-secondary">Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">Account Information</h3>
                                <div className="card-options ">
                                    <a href="#" className="card-options-collapse" data-toggle="card-collapse"><i className="fe fe-chevron-up" /></a>
                                    <a href="#" className="card-options-remove" data-toggle="card-remove"><i className="fe fe-x" /></a>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="form-group">
                                    <label>Facebook</label>
                                    <input type="text" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label>Twitter</label>
                                    <input type="text" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label>LinkedIN</label>
                                    <input type="text" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label>Behance</label>
                                    <input type="text" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label>dribbble</label>
                                    <input type="text" className="form-control" />
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                                <button type="submit" className="btn btn-outline-secondary">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
export default Form;
