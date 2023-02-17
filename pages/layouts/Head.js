import React, { Component } from 'react';
import Head from 'next/head'


class head extends Component {





    render() {

        return (


            <Head >
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                <meta http-equiv="X-UA-Compatible" content="ie=edge" />
                <link rel="icon" href="favicon.ico" type="image/x-icon" />



                <link rel="stylesheet" href="/assets/plugins/bootstrap/css/bootstrap.min.css" />
                <link rel="stylesheet" href="/assets/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css" />
                <link rel="stylesheet" href="/assets/plugins/dropify/css/dropify.min.css" />
                <link rel="stylesheet" href="/assets/plugins/summernote/dist/summernote.css" />
                <link rel="stylesheet" href="/assets/css/style.min.css" />
              
            </Head>

        )
    }
}

export default head; 
