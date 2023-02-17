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
import PageTitleAndTab from './layouts/PageTitleAndTab';
import Table from './layouts/Table';
import Grid from './layouts/Grid';
import Profile from './layouts/Profile';
import Form from './layouts/Form';
class test extends Component {


    componentDidMount() {
        window.title = "Hello"
    }


    render() {

        return (


            <div>

                <Headers title="abc jisan"></Headers>

                <main>



                    <div id="main_content">
                        <MainTopHeader></MainTopHeader>
                        <RightbarSettingPanel></RightbarSettingPanel>
                        <ThemePanel></ThemePanel>
                        <QuickMenu></QuickMenu>
                        <MainLeftbar></MainLeftbar>
                        {/* Start project content area */}
                        <div className="page">
                            <PageHeader></PageHeader>
                            {/* Start Page title and tab */}
                            <div>
                                <PageTitleAndTab></PageTitleAndTab>
                                <div className="section-body mt-4">
                                    <div className="container-fluid">
                                        <div className="tab-content">
                                            <Table></Table>
                                            <Grid></Grid>
                                            <Profile></Profile>

                                            <div className="tab-pane" id="Form"> 
                                               <Form></Form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <MainFooter></MainFooter>


                        </div>
                    </div>



                    <Script />
                </main>


            </div>

        )
    }
}

export default test;
