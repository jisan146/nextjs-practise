import React, { Component } from 'react';
import Link from "next/link";
class MainLeftbar extends Component {

    componentDidMount() {


        try {
            var menu = this.props.menu[0], page = this.props.menu[1], pageTemp = []


            for (var m = 0; m < menu.length; m++) {
                pageTemp.push(<li className="g_heading">{menu[m].menu}</li>)
                for (var p = 0; p < page.length; p++) {
                    if (menu[m].menu_sl == page[p].menu_sl) {
                        pageTemp.push(<li className="">
                            <Link href={page[p].link}>
                                <a ><i className={page[p].icon} /><span>{page[p].page}</span></a>
                            </Link>

                        </li>)
                    }

                }
            }

            this.setState({ menu: pageTemp }, () => { });
        }
        catch { }


    }

    constructor() {
        super()
        this.state = {
            redirect: 0,
            menu: []

        }
    }
    render() {
        return (
            <>
                {/* Start Main leftbar navigation */}
                <div id="left-sidebar" className="sidebar">
                    <h5 className="brand-name">Ericsson<a href="javascript:void(0)" className="menu_option float-right"><i className="icon-grid font-16" data-toggle="tooltip" data-placement="left" title="Grid & List Toggle" /></a></h5>
                    <ul className="nav nav-tabs">
                        <li className="nav-item"><a className="nav-link active" data-toggle="tab" href="#menu-uni">University</a></li>
                        <li className="nav-item"><a className="nav-link" data-toggle="tab" href="#menu-admin">Admin</a></li>
                    </ul>
                    <div className="tab-content mt-3">
                        <div className="tab-pane fade show active" id="menu-uni" role="tabpanel">
                            <nav className="sidebar-nav">


                                <ul className="metismenu">


                                    {this.state.menu}



                                </ul>
                            </nav>
                        </div>
                        <div className="tab-pane fade" id="menu-admin" role="tabpanel">
                            <nav className="sidebar-nav">
                                <ul className="metismenu">
                                    <li><a href="payments.html"><i className="fa fa-credit-card" /><span>Payments</span></a></li>
                                    <li><a href="noticeboard.html"><i className="fa fa-dashboard" /><span>Noticeboard</span></a></li>
                                    <li><a href="taskboard.html"><i className="fa fa-list-ul" /><span>Taskboard</span></a></li>
                                    <li><a href="hostel.html"><i className="fa fa-bed" /><span>Hostel</span></a></li>
                                    <li><a href="transport.html"><i className="fa fa-truck" /><span>Transport</span></a></li>
                                    <li><a href="attendance.html"><i className="fa fa-calendar-check-o" /><span>Attendance</span></a></li>
                                    <li><a href="leave.html"><i className="fa fa-flag" /><span>Leave</span></a></li>
                                    <li><a href="setting.html"><i className="fa fa-gear" /><span>Settings</span></a></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>

            </>
        )
    }
}
export default MainLeftbar;
