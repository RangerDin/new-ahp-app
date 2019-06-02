import {h} from 'preact';
import Router from 'preact-router';

import Header from 'components/common/Header';
import Home from 'components/pages/Home';
import MySolutions from 'components/pages/MySolutions';
import AboutMethod from 'components/pages/AboutMethod';

const Application = () => {
    return (
        <div>
            <Header />
            <Router>
                <Home path='/' />
                <MySolutions path='/solutions/my' />
                <AboutMethod path='/about' />
            </Router>
        </div>
    );
};

export default Application;
