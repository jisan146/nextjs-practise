import React, { Component } from 'react';

class ThemePanel extends Component {





    render() {

        return (


            <>
                {/* Start Theme panel do not add in project */}
                <div className="theme_div">
                    <div className="card">
                        <div className="card-body">
                            <ul className="list-group list-unstyled">
                                <li className="list-group-item mb-2">
                                    <p>Light Version</p>
                                    <a href="../university/index.html"><img src="/assets/images/themes/default.png" className="img-fluid" alt /></a>
                                </li>
                                <li className="list-group-item mb-2">
                                    <p>Dark Version</p>
                                    <a href="../university-dark/index.html"><img src="/assets/images/themes/dark.png" className="img-fluid" alt /></a>
                                </li>
                                <li className="list-group-item mb-2">
                                    <p>RTL Version</p>
                                    <a href="../university-rtl/index.html"><img src="/assets/images/themes/rtl.png" className="img-fluid" alt /></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

            </>

        )
    }
}

export default ThemePanel;
