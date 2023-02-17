import React, { Component } from 'react';
class PageTitleAndTab extends Component {
    render() {
        return (
            <>
                <div className="section-body">
                    <div className="container-fluid">
                        <div className="d-flex justify-content-between align-items-center ">
                            <div className="header-action">
                                <h1 className="page-title">{this.props.title}</h1>
                                {/*
                                   <ol className="breadcrumb page-breadcrumb">
                                    <li className="breadcrumb-item"><a href="#">Ericsson</a></li>
                                    <li className="breadcrumb-item active" aria-current="page">Staff</li>
                                </ol>
                                */}

                            </div>
                         
                            <ul className="nav nav-tabs page-header-tab">
                                {this.props.privilege_list == 1 ? <>
                                    <li className="nav-item"><a className={"nav-link "+this.props.privilege_list_active} data-toggle="tab" href="#List">List View</a></li></>
                                    : <></>
                                }
                                {this.props.privilege_grid == 1 ? <>
                                    <li className="nav-item"><a className={"nav-link "+this.props.privilege_grid_active}  data-toggle="tab" href="#Grid">Grid View</a></li>
                                    </>
                                    : <></>
                                }
                                 {this.props.privilege_full_view == 1 ? <>
                                    <li className="nav-item"><a className={"nav-link "+this.props.privilege_full_view_active}  data-toggle="tab" href="#Details">Details</a></li>
                                    </>
                                    : <></>
                                }
                               
                               
                                {this.props.privilege_add == 1 ? <>
                                    <li className="nav-item"><a className={"nav-link "+this.props.privilege_add_active}  data-toggle="tab" href="#Form">Add</a></li>
                                    </>
                                    : <></>
                                }
                               
                            </ul>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
export default PageTitleAndTab;
