import React, { Component } from 'react';
import Headers from './layouts/Head'
import Script from './layouts/script'
import MainTopHeader from './layouts/MainTopHeader';
import RightbarSettingPanel from './layouts/RightbarSettingPanel';
import ThemePanel from './layouts/ThemePanel';
import QuickMenu from './layouts/QuickMenu';
import MainLeftbar from './layouts/MainLeftbar';
import PageHeader from './layouts/PageHeader';
import MainFooter from './layouts/MainFooter';
import cookie from 'react-cookies'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';



class MyApp extends Component {


    host = ""
    componentDidMount() {
       
        try {

            var host = cookie.load('host');
            this.host = host.host
            var loginInfo = cookie.load('loginInfo');
            //  alert(loginInfo.login)
            // alert(loginInfo.user_id)


            axios.defaults.headers = {
                user_id: loginInfo.user_id,
                Token: loginInfo.Token,
            }


            axios
                .post(this.host + '/req/v5/menu/menuReq/menuGet', {})
                .then(response => {
                   
                    var menu = []
                    menu.push(response.data[0])
                    menu.push(response.data[1])
    
                    this.setState({ menu: menu }, () => { });
                    this.setState({ redirect: loginInfo.login }, () => { });
                })
                .catch(error => {
                    console.log(error)
                    toast.error("Invalid Credentials", {
                        theme: "colored",
                        autoClose: 1000
                    })
                })

          

        }
        catch (ex) {
            console.log('app error')
            console.log(ex)
            const expires = new Date()
            expires.setDate(Date.now() + 1000 * 60 * 60 * 24 * 14)

            cookie.remove('host', { path: '/' })
            cookie.save('host', { host: 'http://localhost:2022/node' }, { path: '/', expires, maxAge: 1000 })
            cookie.remove('loginInfo', { path: '/' })

        }



    }

    constructor() {
        super()
        this.state = {
            redirect: 0,
            menu: []

        }
    }
    onchg = (event) => {

        var name = event.target.name;
        var value = event.target.value;
        this.setState({ [name]: value }, () => { });

    }
    submit = async e => {

        axios
            .post(this.host + '/login', this.state)
            .then(response => {
                this.setState({ redirect: 1 }, () => { });

                var menu = []
                menu.push(response.data[0])
                menu.push(response.data[1])

                this.setState({ menu: menu }, () => { });

                const expires = new Date()
                expires.setDate(Date.now() + 1000 * 60 * 60 * 24 * 14)
                cookie.save('loginInfo',
                    {
                        user_id: response.data[2][0].user_id,
                        Token: response.data[2][0].token,
                        login: response.data[2][0].login
                    }, { path: '/', expires, maxAge: 1000 })

                axios.defaults.headers = {
                    user_id: response.data[2][0].user_id,
                    Token: response.data[2][0].token,
                }

            })
            .catch(error => {
                toast.error("Invalid Credentials", {
                    theme: "colored",
                    autoClose: 1000
                })
            })
    }

    render() {
        const { Component, pageProps } = this.props




        return (
            <>
                <div>
                    <Headers></Headers>
                    <MainTopHeader></MainTopHeader>


                    {this.state.redirect == 0 ? <main className={"font-muli theme-cyan gradient"}>

                        <div className="auth option2">
                            <div className="auth_left">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="text-center">
                                            <a className="header-brand" href="index.html"><i className="fa fa-graduation-cap brand-logo" /></a>
                                            <div className="card-title mt-3">Login to your account</div>
                                            <button type="button" className="btn btn-facebook"><i className="fa fa-facebook mr-2" />Facebook</button>
                                            <button type="button" className="btn btn-google"><i className="fa fa-google mr-2" />Google</button>
                                            <h6 className="mt-3 mb-3">Or</h6>
                                        </div>
                                        <div className="form-group">
                                            <input type="text" className="form-control" id="userID" name="userID" onChange={this.onchg} aria-describedby="emailHelp" placeholder="Enter email" />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label"><a href="forgot-password.html" className="float-right small">I forgot password</a></label>
                                            <input type="password" className="form-control" id="password" name="password" onChange={this.onchg} placeholder="Password" />
                                        </div>
                                        <div className="form-group">
                                            <label className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input" />
                                                <span className="custom-control-label">Remember me</span>
                                            </label>
                                        </div>
                                        <div className="text-center">
                                            <button onClick={this.submit} className="btn btn-primary btn-block" >Sign in</button>
                                            <div className="text-muted mt-4">Don't have account yet? <a href="register.html">Sign up</a></div>
                                            <ToastContainer />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main> : <main className="">




                        <div id="main_content">
                            <RightbarSettingPanel></RightbarSettingPanel>
                            <ThemePanel></ThemePanel>
                            <QuickMenu></QuickMenu>
                            <MainLeftbar menu={this.state.menu}></MainLeftbar>

                            {/* Start project content area */}
                            <div className="page">
                                <PageHeader></PageHeader>
                                {/* Start Page title and tab */}
                                <Component {...pageProps}></Component>



                                <MainFooter></MainFooter>


                            </div>
                        </div>


                        <ToastContainer />

                    </main>}

                    <Script />
                </div>
            </>
        )
    }
}

export default MyApp