import React, { Component } from 'react';
class MainFooter extends Component {
    render() {
        return (
            <>
                {/* Start main footer */}
                <div className="section-body">
                    <footer className="footer mt-auto">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-6 col-sm-12">
                                    Copyright © 2019 <a href="https://themeforest.net/user/puffintheme/portfolio">PuffinTheme</a>.
                                </div>
                                <div className="col-md-6 col-sm-12 text-md-right">
                                    <ul className="list-inline mb-0">
                                        <li className="list-inline-item"><a href="../doc/index.html">Documentation</a></li>
                                        <li className="list-inline-item"><a href="javascript:void(0)">FAQ</a></li>
                                        <li className="list-inline-item"><a href="javascript:void(0)" className="btn btn-outline-primary btn-sm">Buy Now</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
            </>
        )
    }
}
export default MainFooter;
