import React, { Component } from 'react';
class DetailsView extends Component {
    render() {
        return (
            <>
                <div className="tab-pane" id="Details">
                    <div className="row">
                        <div className="col-xl-4 col-md-12">
                            <div className="card">
                                <div className="card-body w_user">
                                    <div className="user_avtar">
                                        <img className="rounded-circle" src="/assets/images/sm/avatar1.jpg" alt />
                                    </div>
                                    <div className="wid-u-info">
                                        <h5>Dessie Parks</h5>
                                        <p className="text-muted m-b-0">119 Peepee Way, Hilo, HI, 96720</p>
                                        <ul className="list-unstyled">
                                            <li>
                                                <h5 className="mb-0">270</h5>
                                                <small>Followers</small>
                                            </li>
                                            <li>
                                                <h5 className="mb-0">310</h5>
                                                <small>Following</small>
                                            </li>
                                            <li>
                                                <h5 className="mb-0">908</h5>
                                                <small>Liks</small>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">About Me</h3>
                                    <div className="card-options ">
                                        <a href="#" className="card-options-collapse" data-toggle="card-collapse"><i className="fe fe-chevron-up" /></a>
                                        <a href="#" className="card-options-remove" data-toggle="card-remove"><i className="fe fe-x" /></a>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <p>Hello I am Celena Anderson a Clerk in Xyz College USA. I love to work with all my college staff and seniour professors.</p>
                                    <ul className="list-group">
                                        <li className="list-group-item">
                                            <b>Gender </b>
                                            <div>Female</div>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Operation Done </b>
                                            <div>30+</div>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Degree </b>
                                            <div>M.Com.</div>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Designation</b>
                                            <div>Jr. Clerk</div>
                                        </li>
                                        <li className="list-group-item">
                                            <div className="clearfix">
                                                <div className="float-left"><strong>Telly</strong></div>
                                                <div className="float-right"><small className="text-muted">35%</small></div>
                                            </div>
                                            <div className="progress progress-xxs">
                                                <div className="progress-bar bg-azure" role="progressbar" style={{ width: '35%' }} aria-valuenow={35} aria-valuemin={0} aria-valuemax={100} />
                                            </div>
                                        </li>
                                        <li className="list-group-item">
                                            <div className="clearfix">
                                                <div className="float-left"><strong>Account</strong></div>
                                                <div className="float-right"><small className="text-muted">72%</small></div>
                                            </div>
                                            <div className="progress progress-xxs">
                                                <div className="progress-bar bg-red" role="progressbar" style={{ width: '72%' }} aria-valuenow={72} aria-valuemin={0} aria-valuemax={100} />
                                            </div>
                                        </li>
                                        <li className="list-group-item">
                                            <div className="clearfix">
                                                <div className="float-left"><strong>MS Office</strong></div>
                                                <div className="float-right"><small className="text-muted">60%</small></div>
                                            </div>
                                            <div className="progress progress-xxs">
                                                <div className="progress-bar bg-blue" role="progressbar" style={{ width: '60%' }} aria-valuenow={60} aria-valuemin={0} aria-valuemax={100} />
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="card-footer text-center">
                                    <div className="row">
                                        <div className="col-md-4 col-sm-4 col-6">
                                            <div className="font-18 font-weight-bold">37</div>
                                            <div>Projects</div>
                                        </div>
                                        <div className="col-md-4 col-sm-4 col-6">
                                            <div className="font-18 font-weight-bold">51</div>
                                            <div>Tasks</div>
                                        </div>
                                        <div className="col-md-4 col-sm-4 col-6">
                                            <div className="font-18 font-weight-bold">61</div>
                                            <div>Uploads</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-8 col-md-12">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">Timeline Activity</h3>
                                    <div className="card-options">
                                        <a href="#" className="card-options-collapse" data-toggle="card-collapse"><i className="fe fe-chevron-up" /></a>
                                        <a href="#" className="card-options-fullscreen" data-toggle="card-fullscreen"><i className="fe fe-maximize" /></a>
                                        <a href="#" className="card-options-remove" data-toggle="card-remove"><i className="fe fe-x" /></a>
                                        <div className="item-action dropdown ml-2">
                                            <a href="javascript:void(0)" data-toggle="dropdown"><i className="fe fe-more-vertical" /></a>
                                            <div className="dropdown-menu dropdown-menu-right">
                                                <a href="javascript:void(0)" className="dropdown-item"><i className="dropdown-icon fa fa-eye" /> View Details </a>
                                                <a href="javascript:void(0)" className="dropdown-item"><i className="dropdown-icon fa fa-share-alt" /> Share </a>
                                                <a href="javascript:void(0)" className="dropdown-item"><i className="dropdown-icon fa fa-cloud-download" /> Download</a>
                                                <div className="dropdown-divider" />
                                                <a href="javascript:void(0)" className="dropdown-item"><i className="dropdown-icon fa fa-copy" /> Copy to</a>
                                                <a href="javascript:void(0)" className="dropdown-item"><i className="dropdown-icon fa fa-folder" /> Move to</a>
                                                <a href="javascript:void(0)" className="dropdown-item"><i className="dropdown-icon fa fa-edit" /> Rename</a>
                                                <a href="javascript:void(0)" className="dropdown-item"><i className="dropdown-icon fa fa-trash" /> Delete</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="summernote">
                                        Hello there,
                                        <br />
                                        <p>The toolbar can be customized and it also supports various callbacks such as <code>oninit</code>, <code>onfocus</code>, <code>onpaste</code> and many more.</p>
                                        <p>Please try <b>paste some texts</b> here</p>
                                    </div>
                                    <div className="timeline_item ">
                                        <img className="tl_avatar" src="/assets/images/xs/avatar1.jpg" alt />
                                        <span><a href="javascript:void(0);">Elisse Joson</a> San Francisco, CA <small className="float-right text-right">20-April-2019 - Today</small></span>
                                        <h6 className="font600">Hello, 'Im a single div responsive timeline without media Queries!</h6>
                                        <div className="msg">
                                            <p>I'm speaking with myself, number one, because I have a very good brain and I've said a lot of things. I write the best placeholder text, and I'm the biggest developer on the web card she has is the Lorem card.</p>
                                            <a href="javascript:void(0);" className="mr-20 text-muted"><i className="fa fa-heart text-pink" /> 12 Love</a>
                                            <a className="text-muted" role="button" data-toggle="collapse" href="#collapseExample" aria-expanded="false" aria-controls="collapseExample"><i className="fa fa-comments" /> 1 Comment</a>
                                            <div className="collapse p-4 section-gray mt-2" id="collapseExample">
                                                <form className="well">
                                                    <div className="form-group">
                                                        <textarea rows={2} className="form-control no-resize" placeholder="Enter here for tweet..." defaultValue={""} />
                                                    </div>
                                                    <button className="btn btn-primary">Submit</button>
                                                </form>
                                                <ul className="recent_comments list-unstyled mt-4 mb-0">
                                                    <li>
                                                        <div className="avatar_img">
                                                            <img className="rounded img-fluid" src="/assets/images/xs/avatar4.jpg" alt />
                                                        </div>
                                                        <div className="comment_body">
                                                            <h6>Donald Gardner <small className="float-right font-14">Just now</small></h6>
                                                            <p>Lorem ipsum Veniam aliquip culpa laboris minim tempor</p>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="timeline_item ">
                                        <img className="tl_avatar" src="/assets/images/xs/avatar4.jpg" alt />
                                        <span><a href="javascript:void(0);" title>Dessie Parks</a> Oakland, CA <small className="float-right text-right">19-April-2019 - Yesterday</small></span>
                                        <h6 className="font600">Oeehhh, that's awesome.. Me too!</h6>
                                        <div className="msg">
                                            <p>I'm speaking with myself, number one, because I have a very good brain and I've said a lot of things. on the web by far... While that's mock-ups and this is politics, are they really so different? I think the only card she has is the Lorem card.</p>
                                            <div className="timeline_img mb-20">
                                                <img className="width100" src="/assets/images/gallery/1.jpg" alt="Awesome Image" />
                                                <img className="width100" src="/assets/images/gallery/2.jpg" alt="Awesome Image" />
                                            </div>
                                            <a href="javascript:void(0);" className="mr-20 text-muted"><i className="fa fa-heart text-pink" /> 23 Love</a>
                                            <a className="text-muted" role="button" data-toggle="collapse" href="#collapseExample1" aria-expanded="false" aria-controls="collapseExample1"><i className="fa fa-comments" /> 2 Comment</a>
                                            <div className="collapse p-4 section-gray mt-2" id="collapseExample1">
                                                <form className="well">
                                                    <div className="form-group">
                                                        <textarea rows={2} className="form-control no-resize" placeholder="Enter here for tweet..." defaultValue={""} />
                                                    </div>
                                                    <button className="btn btn-primary">Submit</button>
                                                </form>
                                                <ul className="recent_comments list-unstyled mt-4 mb-0">
                                                    <li>
                                                        <div className="avatar_img">
                                                            <img className="rounded img-fluid" src="/assets/images/xs/avatar4.jpg" alt />
                                                        </div>
                                                        <div className="comment_body">
                                                            <h6>Donald Gardner <small className="float-right font-14">Just now</small></h6>
                                                            <p>Lorem ipsum Veniam aliquip culpa laboris minim tempor</p>
                                                            <div className="timeline_img mb-20">
                                                                <img className="width150" src="/assets/images/gallery/7.jpg" alt="Awesome Image" />
                                                                <img className="width150" src="/assets/images/gallery/8.jpg" alt="Awesome Image" />
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="avatar_img">
                                                            <img className="rounded img-fluid" src="/assets/images/xs/avatar3.jpg" alt />
                                                        </div>
                                                        <div className="comment_body">
                                                            <h6>Dessie Parks <small className="float-right font-14">1min ago</small></h6>
                                                            <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking</p>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="timeline_item ">
                                        <img className="tl_avatar" src="/assets/images/xs/avatar7.jpg" alt />
                                        <span><a href="javascript:void(0);" title>Rochelle Barton</a> San Francisco, CA <small className="float-right text-right">12-April-2019</small></span>
                                        <h6 className="font600">An Engineer Explains Why You Should Always Order the Larger Pizza</h6>
                                        <div className="msg">
                                            <p>I'm speaking with myself, number one, because I have a very good brain and I've said a lot of things. I write the best placeholder text, and I'm the biggest developer on the web by far... While that's mock-ups and this is politics, is the Lorem card.</p>
                                            <a href="javascript:void(0);" className="mr-20 text-muted"><i className="fa fa-heart text-pink" /> 7 Love</a>
                                            <a className="text-muted" role="button" data-toggle="collapse" href="#collapseExample2" aria-expanded="false" aria-controls="collapseExample2"><i className="fa fa-comments" /> 1 Comment</a>
                                            <div className="collapse p-4 section-gray mt-2" id="collapseExample2">
                                                <form className="well">
                                                    <div className="form-group">
                                                        <textarea rows={2} className="form-control no-resize" placeholder="Enter here for tweet..." defaultValue={""} />
                                                    </div>
                                                    <button className="btn btn-primary">Submit</button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
export default DetailsView;
