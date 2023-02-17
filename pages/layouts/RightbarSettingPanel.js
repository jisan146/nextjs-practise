import React, { Component } from 'react';

class RightbarSettingPanel extends Component {





    render() {

        return (


            <>
                {/* Start Rightbar setting panel */}
                <div id="rightsidebar" className="right_sidebar">
                    <a href="javascript:void(0)" className="p-3 settingbar float-right"><i className="fa fa-close" /></a>
                    <ul className="nav nav-tabs" role="tablist">
                        <li className="nav-item"><a className="nav-link active" data-toggle="tab" href="#Settings" aria-expanded="true">Settings</a></li>
                        <li className="nav-item"><a className="nav-link" data-toggle="tab" href="#activity" aria-expanded="false">Activity</a></li>
                    </ul>
                    <div className="tab-content">
                        <div role="tabpanel" className="tab-pane vivify fadeIn active" id="Settings" aria-expanded="true">
                            <div className="mb-4">
                                <h6 className="font-14 font-weight-bold text-muted">Theme Color</h6>
                                <ul className="choose-skin list-unstyled mb-0">
                                    <li data-theme="azure"><div className="azure" /></li>
                                    <li data-theme="indigo"><div className="indigo" /></li>
                                    <li data-theme="purple"><div className="purple" /></li>
                                    <li data-theme="orange"><div className="orange" /></li>
                                    <li data-theme="green"><div className="green" /></li>
                                    <li data-theme="cyan" className="active"><div className="cyan" /></li>
                                    <li data-theme="blush"><div className="blush" /></li>
                                    <li data-theme="white"><div className="bg-white" /></li>
                                </ul>
                            </div>
                            <div className="mb-4">
                                <h6 className="font-14 font-weight-bold text-muted">Font Style</h6>
                                <div className="custom-controls-stacked font_setting">
                                    <label className="custom-control custom-radio custom-control-inline">
                                        <input type="radio" className="custom-control-input" name="font" defaultValue="font-muli" defaultChecked />
                                        <span className="custom-control-label">Muli Google Font</span>
                                    </label>
                                    <label className="custom-control custom-radio custom-control-inline">
                                        <input type="radio" className="custom-control-input" name="font" defaultValue="font-montserrat" />
                                        <span className="custom-control-label">Montserrat Google Font</span>
                                    </label>
                                    <label className="custom-control custom-radio custom-control-inline">
                                        <input type="radio" className="custom-control-input" name="font" defaultValue="font-poppins" />
                                        <span className="custom-control-label">Poppins Google Font</span>
                                    </label>
                                </div>
                            </div>
                            <div>
                                <h6 className="font-14 font-weight-bold mt-4 text-muted">General Settings</h6>
                                <ul className="setting-list list-unstyled mt-1 setting_switch">
                                    <li>
                                        <label className="custom-switch">
                                            <span className="custom-switch-description">Night Mode</span>
                                            <input type="checkbox" name="custom-switch-checkbox" className="custom-switch-input btn-darkmode" />
                                            <span className="custom-switch-indicator" />
                                        </label>
                                    </li>
                                    <li>
                                        <label className="custom-switch">
                                            <span className="custom-switch-description">Fix Navbar top</span>
                                            <input type="checkbox" name="custom-switch-checkbox" className="custom-switch-input btn-fixnavbar" />
                                            <span className="custom-switch-indicator" />
                                        </label>
                                    </li>
                                    <li>
                                        <label className="custom-switch">
                                            <span className="custom-switch-description">Header Dark</span>
                                            <input type="checkbox" name="custom-switch-checkbox" className="custom-switch-input btn-pageheader" />
                                            <span className="custom-switch-indicator" />
                                        </label>
                                    </li>
                                    <li>
                                        <label className="custom-switch">
                                            <span className="custom-switch-description">Min Sidebar Dark</span>
                                            <input type="checkbox" name="custom-switch-checkbox" className="custom-switch-input btn-min_sidebar" />
                                            <span className="custom-switch-indicator" />
                                        </label>
                                    </li>
                                    <li>
                                        <label className="custom-switch">
                                            <span className="custom-switch-description">Sidebar Dark</span>
                                            <input type="checkbox" name="custom-switch-checkbox" className="custom-switch-input btn-sidebar" />
                                            <span className="custom-switch-indicator" />
                                        </label>
                                    </li>
                                    <li>
                                        <label className="custom-switch">
                                            <span className="custom-switch-description">Icon Color</span>
                                            <input type="checkbox" name="custom-switch-checkbox" className="custom-switch-input btn-iconcolor" />
                                            <span className="custom-switch-indicator" />
                                        </label>
                                    </li>
                                    <li>
                                        <label className="custom-switch">
                                            <span className="custom-switch-description">Gradient Color</span>
                                            <input type="checkbox" name="custom-switch-checkbox" className="custom-switch-input btn-gradient" defaultChecked />
                                            <span className="custom-switch-indicator" />
                                        </label>
                                    </li>
                                    <li>
                                        <label className="custom-switch">
                                            <span className="custom-switch-description">Box Shadow</span>
                                            <input type="checkbox" name="custom-switch-checkbox" className="custom-switch-input btn-boxshadow" />
                                            <span className="custom-switch-indicator" />
                                        </label>
                                    </li>
                                    <li>
                                        <label className="custom-switch">
                                            <span className="custom-switch-description">RTL Support</span>
                                            <input type="checkbox" name="custom-switch-checkbox" className="custom-switch-input btn-rtl" />
                                            <span className="custom-switch-indicator" />
                                        </label>
                                    </li>
                                    <li>
                                        <label className="custom-switch">
                                            <span className="custom-switch-description">Box Layout</span>
                                            <input type="checkbox" name="custom-switch-checkbox" className="custom-switch-input btn-boxlayout" />
                                            <span className="custom-switch-indicator" />
                                        </label>
                                    </li>
                                </ul>
                            </div>
                            <hr />
                            <div className="form-group">
                                <label className="d-block">Storage <span className="float-right">77%</span></label>
                                <div className="progress progress-sm">
                                    <div className="progress-bar" role="progressbar" aria-valuenow={77} aria-valuemin={0} aria-valuemax={100} style={{ width: '77%' }} />
                                </div>
                                <button type="button" className="btn btn-primary btn-block mt-3">Upgrade Storage</button>
                            </div>
                        </div>
                        <div role="tabpanel" className="tab-pane vivify fadeIn" id="activity" aria-expanded="false">
                            <ul className="new_timeline mt-3">
                                <li>
                                    <div className="bullet pink" />
                                    <div className="time">11:00am</div>
                                    <div className="desc">
                                        <h3>Attendance</h3>
                                        <h4>Computer Class</h4>
                                    </div>
                                </li>
                                <li>
                                    <div className="bullet pink" />
                                    <div className="time">11:30am</div>
                                    <div className="desc">
                                        <h3>Added an interest</h3>
                                        <h4>“Volunteer Activities”</h4>
                                    </div>
                                </li>
                                <li>
                                    <div className="bullet green" />
                                    <div className="time">12:00pm</div>
                                    <div className="desc">
                                        <h3>Developer Team</h3>
                                        <h4>Hangouts</h4>
                                        <ul className="list-unstyled team-info margin-0 p-t-5">
                                            <li><img src="/assets/images/xs/avatar1.jpg" alt="Avatar" /></li>
                                            <li><img src="/assets/images/xs/avatar2.jpg" alt="Avatar" /></li>
                                            <li><img src="/assets/images/xs/avatar3.jpg" alt="Avatar" /></li>
                                            <li><img src="/assets/images/xs/avatar4.jpg" alt="Avatar" /></li>
                                        </ul>
                                    </div>
                                </li>
                                <li>
                                    <div className="bullet green" />
                                    <div className="time">2:00pm</div>
                                    <div className="desc">
                                        <h3>Responded to need</h3>
                                        <a href="javascript:void(0)">“In-Kind Opportunity”</a>
                                    </div>
                                </li>
                                <li>
                                    <div className="bullet orange" />
                                    <div className="time">1:30pm</div>
                                    <div className="desc">
                                        <h3>Lunch Break</h3>
                                    </div>
                                </li>
                                <li>
                                    <div className="bullet green" />
                                    <div className="time">2:38pm</div>
                                    <div className="desc">
                                        <h3>Finish</h3>
                                        <h4>Go to Home</h4>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </>

        )
    }
}

export default RightbarSettingPanel;
