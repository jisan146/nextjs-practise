import React, { Component } from 'react';
class QuickMenu extends Component {
    render() {
        return (
            <>
                {/* Start Quick menu with more functio */}
                <div className="user_div">
                    <ul className="nav nav-tabs">
                        <li className="nav-item"><a className="nav-link active" data-toggle="tab" href="#righttab-statistics">Statistics</a></li>
                        <li className="nav-item"><a className="nav-link" data-toggle="tab" href="#righttab-Result">Result</a></li>
                        <li className="nav-item"><a className="nav-link" data-toggle="tab" href="#righttab-Students">Student</a></li>
                        <li className="nav-item"><a className="nav-link" data-toggle="tab" href="#righttab-Todo">Todo</a></li>
                    </ul>
                    <div className="tab-content mt-3">
                        <div className="tab-pane fade show active" id="righttab-statistics" role="tabpanel">
                            <div className="card">
                                <div className="card-body">
                                    <div>Total Revenue</div>
                                    <div className="py-3 m-0 text-center h1 text-success">$79,452</div>
                                    <div className="d-flex">
                                        <span className="text-muted">Income</span>
                                        <div className="ml-auto"><i className="fa fa-caret-up text-success" />4%</div>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <ul className="list-unstyled mb-0">
                                        <li className="mb-3">
                                            <div className="clearfix">
                                                <div className="float-left"><strong>$43,320</strong></div>
                                                <div className="float-right"><small className="text-muted">Bank of America</small></div>
                                            </div>
                                            <div className="progress progress-xxs">
                                                <div className="progress-bar bg-azure" role="progressbar" style={{ width: '87%' }} aria-valuenow={42} aria-valuemin={0} aria-valuemax={100} />
                                            </div>
                                        </li>
                                        <li>
                                            <div className="clearfix">
                                                <div className="float-left"><strong>$36,132</strong></div>
                                                <div className="float-right"><small className="text-muted">Wells Fargo</small></div>
                                            </div>
                                            <div className="progress progress-xxs">
                                                <div className="progress-bar bg-green" role="progressbar" style={{ width: '80%' }} aria-valuenow={0} aria-valuemin={0} aria-valuemax={100} />
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-body top_counter">
                                    <div className="icon bg-yellow"><i className="fa fa-users" /> </div>
                                    <div className="content">
                                        <span>Total Student</span>
                                        <h5 className="number mb-0">2,051</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-body top_counter">
                                    <div className="icon bg-gray"><i className="fa fa-sitemap" /> </div>
                                    <div className="content">
                                        <span>Department</span>
                                        <h5 className="number mb-0">14</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-body top_counter">
                                    <div className="icon bg-dark"><i className="fa fa-black-tie" /> </div>
                                    <div className="content">
                                        <span>Total Teacher</span>
                                        <h5 className="number mb-0">27</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-body top_counter">
                                    <div className="icon bg-azure"><i className="fa fa-tags" /> </div>
                                    <div className="content">
                                        <span>Total Courses</span>
                                        <h5 className="number mb-0">31</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-body top_counter">
                                    <div className="icon bg-pink"><i className="fa fa-credit-card" /> </div>
                                    <div className="content">
                                        <span>Expense</span>
                                        <h5 className="number mb-0">$7,254</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-body top_counter">
                                    <div className="icon bg-green"><i className="fa fa-bank" /> </div>
                                    <div className="content">
                                        <span>Total Income</span>
                                        <h5 className="number mb-0">$27,852</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-body top_counter">
                                    <div className="icon bg-cyan"><i className="fa fa-map-o" /> </div>
                                    <div className="content">
                                        <span>Our Center</span>
                                        <h5 className="number mb-0">52</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-body top_counter">
                                    <div className="icon bg-indigo"><i className="fa fa-smile-o" /> </div>
                                    <div className="content">
                                        <span>Smiley Face</span>
                                        <h5 className="number mb-0">10K</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="righttab-Result" role="tabpanel">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">Result 2019</h3>
                                    <div className="card-options">
                                        <a href="#"><i className="fa fa-file-excel-o" data-toggle="tooltip" title="Export Excel" /></a>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <ul className="list-unstyled">
                                        <li className="mb-3">
                                            <div className="clearfix">
                                                <div className="float-left"><strong>87%</strong></div>
                                                <div className="float-right"><small className="text-muted">Art &amp; Design</small></div>
                                            </div>
                                            <div className="progress progress-xxs">
                                                <div className="progress-bar bg-azure" role="progressbar" style={{ width: '87%' }} aria-valuenow={42} aria-valuemin={0} aria-valuemax={100} />
                                            </div>
                                        </li>
                                        <li className="mb-3">
                                            <div className="clearfix">
                                                <div className="float-left"><strong>80%</strong></div>
                                                <div className="float-right"><small className="text-muted">Fashion</small></div>
                                            </div>
                                            <div className="progress progress-xxs">
                                                <div className="progress-bar bg-green" role="progressbar" style={{ width: '80%' }} aria-valuenow={0} aria-valuemin={0} aria-valuemax={100} />
                                            </div>
                                        </li>
                                        <li className="mb-3">
                                            <div className="clearfix">
                                                <div className="float-left"><strong>63%</strong></div>
                                                <div className="float-right"><small className="text-muted">Sports Science</small></div>
                                            </div>
                                            <div className="progress progress-xxs">
                                                <div className="progress-bar bg-orange" role="progressbar" style={{ width: '63%' }} aria-valuenow={36} aria-valuemin={0} aria-valuemax={100} />
                                            </div>
                                        </li>
                                        <li className="mb-3">
                                            <div className="clearfix">
                                                <div className="float-left"><strong>91%</strong></div>
                                                <div className="float-right"><small className="text-muted">Computers</small></div>
                                            </div>
                                            <div className="progress progress-xxs">
                                                <div className="progress-bar bg-indigo" role="progressbar" style={{ width: '91%' }} aria-valuenow={6} aria-valuemin={0} aria-valuemax={100} />
                                            </div>
                                        </li>
                                        <li>
                                            <div className="clearfix">
                                                <div className="float-left"><strong>35%</strong></div>
                                                <div className="float-right"><small className="text-muted">Biological Sciences</small></div>
                                            </div>
                                            <div className="progress progress-xxs">
                                                <div className="progress-bar bg-pink" role="progressbar" style={{ width: '35%' }} aria-valuenow={6} aria-valuemin={0} aria-valuemax={100} />
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="card-footer">
                                    <div className="row text-center">
                                        <div className="col-6 border-right">
                                            <label className="mb-0">Total Pass</label>
                                            <div className="font-20 font-weight-bold">1,052</div>
                                        </div>
                                        <div className="col-6">
                                            <label className="mb-0">Total Fail</label>
                                            <div className="font-20 font-weight-bold">198</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">Result 2018</h3>
                                    <div className="card-options">
                                        <a href="#"><i className="fa fa-file-excel-o" data-toggle="tooltip" title="Export Excel" /></a>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <ul className="list-unstyled">
                                        <li className="mb-3">
                                            <div className="clearfix">
                                                <div className="float-left"><strong>80%</strong></div>
                                                <div className="float-right"><small className="text-muted">Fashion</small></div>
                                            </div>
                                            <div className="progress progress-xxs">
                                                <div className="progress-bar bg-green" role="progressbar" style={{ width: '80%' }} aria-valuenow={0} aria-valuemin={0} aria-valuemax={100} />
                                            </div>
                                        </li>
                                        <li className="mb-3">
                                            <div className="clearfix">
                                                <div className="float-left"><strong>87%</strong></div>
                                                <div className="float-right"><small className="text-muted">Art &amp; Design</small></div>
                                            </div>
                                            <div className="progress progress-xxs">
                                                <div className="progress-bar bg-azure" role="progressbar" style={{ width: '87%' }} aria-valuenow={42} aria-valuemin={0} aria-valuemax={100} />
                                            </div>
                                        </li>
                                        <li className="mb-3">
                                            <div className="clearfix">
                                                <div className="float-left"><strong>91%</strong></div>
                                                <div className="float-right"><small className="text-muted">Computers</small></div>
                                            </div>
                                            <div className="progress progress-xxs">
                                                <div className="progress-bar bg-indigo" role="progressbar" style={{ width: '91%' }} aria-valuenow={6} aria-valuemin={0} aria-valuemax={100} />
                                            </div>
                                        </li>
                                        <li className="mb-3">
                                            <div className="clearfix">
                                                <div className="float-left"><strong>35%</strong></div>
                                                <div className="float-right"><small className="text-muted">Biological Sciences</small></div>
                                            </div>
                                            <div className="progress progress-xxs">
                                                <div className="progress-bar bg-pink" role="progressbar" style={{ width: '35%' }} aria-valuenow={6} aria-valuemin={0} aria-valuemax={100} />
                                            </div>
                                        </li>
                                        <li>
                                            <div className="clearfix">
                                                <div className="float-left"><strong>63%</strong></div>
                                                <div className="float-right"><small className="text-muted">Sports Science</small></div>
                                            </div>
                                            <div className="progress progress-xxs">
                                                <div className="progress-bar bg-orange" role="progressbar" style={{ width: '63%' }} aria-valuenow={36} aria-valuemin={0} aria-valuemax={100} />
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="card-footer">
                                    <div className="row text-center">
                                        <div className="col-6 border-right">
                                            <label className="mb-0">Total Pass</label>
                                            <div className="font-20 font-weight-bold">845</div>
                                        </div>
                                        <div className="col-6">
                                            <label className="mb-0">Total Fail</label>
                                            <div className="font-20 font-weight-bold">142</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="righttab-Students" role="tabpanel">
                            <div id="users">
                                <div className="input-group mt-2 mb-2">
                                    <input type="text" className="form-control search" placeholder="Search Student" />
                                </div>
                                <ul className="right_chat list-unstyled list">
                                    <li className="alfabet">A</li>
                                    <li>
                                        <a href="javascript:void(0);" className="media">
                                            <img className="media-object" src="/assets/images/xs/avatar1.jpg" alt />
                                            <div className="media-body">
                                                <span className="name">Abigail Churchill</span>
                                                <span className="message">Art &amp; Design</span>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0);" className="media">
                                            <img className="media-object" src="/assets/images/xs/avatar2.jpg" alt />
                                            <div className="media-body">
                                                <span className="name">Alexandra Carr</span>
                                                <span className="message">Fashion</span>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0);" className="media">
                                            <img className="media-object" src="/assets/images/xs/avatar3.jpg" alt />
                                            <div className="media-body">
                                                <span className="name">Alison Berry</span>
                                                <span className="message">Fashion</span>
                                            </div>
                                        </a>
                                    </li>
                                    <li className="alfabet">B</li>
                                    <li>
                                        <a href="javascript:void(0);" className="media">
                                            <img className="media-object" src="/assets/images/xs/avatar4.jpg" alt />
                                            <div className="media-body">
                                                <span className="name">Bella Alan</span>
                                                <span className="message">Sports Science</span>
                                            </div>
                                        </a>
                                    </li>
                                    <li className="alfabet">C</li>
                                    <li>
                                        <a href="javascript:void(0);" className="media">
                                            <img className="media-object" src="/assets/images/xs/avatar5.jpg" alt />
                                            <div className="media-body">
                                                <span className="name">Caroline Alan</span>
                                                <span className="message">Sports Science</span>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0);" className="media">
                                            <img className="media-object" src="/assets/images/xs/avatar6.jpg" alt />
                                            <div className="media-body">
                                                <span className="name">Connor Campbell</span>
                                                <span className="message">Computers</span>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0);" className="media">
                                            <img className="media-object" src="/assets/images/xs/avatar7.jpg" alt />
                                            <div className="media-body">
                                                <span className="name">Charles Campbell</span>
                                                <span className="message">Computers</span>
                                            </div>
                                        </a>
                                    </li>
                                    <li className="alfabet">D</li>
                                    <li>
                                        <a href="javascript:void(0);" className="media">
                                            <img className="media-object" src="/assets/images/xs/avatar8.jpg" alt />
                                            <div className="media-body">
                                                <span className="name">Donna Hudson</span>
                                                <span className="message">Computers</span>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0);" className="media">
                                            <img className="media-object" src="/assets/images/xs/avatar9.jpg" alt />
                                            <div className="media-body">
                                                <span className="name">Dylan Jones</span>
                                                <span className="message">Computers</span>
                                            </div>
                                        </a>
                                    </li>
                                    <li className="alfabet">G</li>
                                    <li>
                                        <a href="javascript:void(0);" className="media">
                                            <img className="media-object" src="/assets/images/xs/avatar8.jpg" alt />
                                            <div className="media-body">
                                                <span className="name">Gordon Hudson</span>
                                                <span className="message">Sports Science</span>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0);" className="media">
                                            <img className="media-object" src="/assets/images/xs/avatar9.jpg" alt />
                                            <div className="media-body">
                                                <span className="name">Gabrielle Walker</span>
                                                <span className="message">Computers</span>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0);" className="media">
                                            <img className="media-object" src="/assets/images/xs/avatar10.jpg" alt />
                                            <div className="media-body">
                                                <span className="name">Gavin North</span>
                                                <span className="message">Computers</span>
                                            </div>
                                        </a>
                                    </li>
                                    <li className="alfabet">S</li>
                                    <li>
                                        <a href="javascript:void(0);" className="media">
                                            <img className="media-object" src="/assets/images/xs/avatar1.jpg" alt />
                                            <div className="media-body">
                                                <span className="name">Stephanie Hudson</span>
                                                <span className="message">Sports Science</span>
                                            </div>
                                        </a>
                                    </li>
                                    <li className="alfabet">W</li>
                                    <li>
                                        <a href="javascript:void(0);" className="media">
                                            <img className="media-object" src="/assets/images/xs/avatar1.jpg" alt />
                                            <div className="media-body">
                                                <span className="name">William Paige</span>
                                                <span className="message">Fashion</span>
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="user_chatbody chat_app">
                                <div className="card-header bline pt-1 pl-0 pr-0">
                                    <h3 className="card-title">Abigail Churchill <small>Online</small></h3>
                                    <div className="card-options">
                                        <a href="javascript:void(0)" className="p-1" data-toggle="dropdown"><i className="fa fa-cog" /></a>
                                        <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                                            <a className="dropdown-item active" href="#">Online</a>
                                            <a className="dropdown-item" href="#">Away</a>
                                            <a className="dropdown-item" href="#">Do not disturb</a>
                                            <a className="dropdown-item" href="#">Invisible</a>
                                        </div>
                                        <a href="javascript:void(0)" className="p-1 chat_close"><i className="fa fa-close" /></a>
                                    </div>
                                </div>
                                <div className="chat_windows">
                                    <ul className="mb-0">
                                        <li className="other-message">
                                            <img className="avatar mr-3" src="/assets/images/xs/avatar1.jpg" alt="avatar" />
                                            <div className="message">
                                                <p className="bg-light-blue">Are we meeting today?</p>
                                                <span className="time">10:10 AM, Today</span>
                                            </div>
                                        </li>
                                        <li className="other-message">
                                            <img className="avatar mr-3" src="/assets/images/xs/avatar1.jpg" alt="avatar" />
                                            <div className="message">
                                                <p className="bg-light-blue">Hi Aiden, how are you? How is the project coming along?</p>
                                                <p className="bg-light-blue">Are we meeting today?</p>
                                                <span className="time">10:15 AM, Today</span>
                                            </div>
                                        </li>
                                        <li className="my-message">
                                            <div className="message">
                                                <p className="bg-light-gray">Project has been already finished and I have results to show you.</p>
                                                <div className="file_folder">
                                                    <a href="javascript:void(0);">
                                                        <div className="icon">
                                                            <i className="fa fa-file-excel-o text-success" />
                                                        </div>
                                                        <div className="file-name">
                                                            <p className="mb-0 text-muted">Report2017.xls</p>
                                                            <small>Size: 68KB</small>
                                                        </div>
                                                    </a>
                                                </div>
                                                <span className="time">10:17 AM, Today</span>
                                            </div>
                                        </li>
                                        <li className="other-message">
                                            <img className="avatar mr-3" src="/assets/images/xs/avatar1.jpg" alt="avatar" />
                                            <div className="message">
                                                <div className="media_img">
                                                    <img src="/assets/images/gallery/1.jpg" className="w100 img-thumbnail" alt />
                                                    <img src="/assets/images/gallery/2.jpg" className="w100 img-thumbnail" alt />
                                                </div>
                                                <span className="time">10:15 AM, Today</span>
                                            </div>
                                        </li>
                                        <li className="other-message">
                                            <img className="avatar mr-3" src="/assets/images/xs/avatar1.jpg" alt="avatar" />
                                            <div className="message">
                                                <p className="bg-light-blue">Are we meeting today I have results?</p>
                                                <span className="time">10:18 AM, Today</span>
                                            </div>
                                        </li>
                                        <li className="my-message">
                                            <div className="message">
                                                <p className="bg-light-gray">Well we have good budget for the project</p>
                                                <span className="time">10:25 AM, Today</span>
                                            </div>
                                        </li>
                                    </ul>
                                    <div className="chat-message clearfix">
                                        <a href="javascript:void(0);"><i className="icon-camera" /></a>
                                        <a href="javascript:void(0);"><i className="icon-camcorder" /></a>
                                        <a href="javascript:void(0);"><i className="icon-paper-plane" /></a>
                                        <div className="input-group mb-0">
                                            <input type="text" className="form-control" placeholder="Enter text here..." />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="righttab-Todo" role="tabpanel">
                            <ul className="list-unstyled mb-0 todo_list">
                                <li>
                                    <label className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" name="example-checkbox1" defaultValue="option1" defaultChecked />
                                        <span className="custom-control-label">Report Panel Usag</span>
                                    </label>
                                </li>
                                <li>
                                    <label className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" name="example-checkbox1" defaultValue="option1" />
                                        <span className="custom-control-label">Report Panel Usag</span>
                                    </label>
                                </li>
                                <li>
                                    <label className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" name="example-checkbox1" defaultValue="option1" defaultChecked />
                                        <span className="custom-control-label">New logo design for Angular Admin</span>
                                    </label>
                                </li>
                                <li>
                                    <label className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" name="example-checkbox1" defaultValue="option1" />
                                        <span className="custom-control-label">Design PSD files for Angular Admin</span>
                                    </label>
                                </li>
                                <li>
                                    <label className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" name="example-checkbox1" defaultValue="option1" defaultChecked />
                                        <span className="custom-control-label">New logo design for Angular Admin</span>
                                    </label>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
export default QuickMenu;
