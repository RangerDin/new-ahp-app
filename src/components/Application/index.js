import {h} from 'preact';
import Router from 'preact-router';

import Header from 'components/common/Header';
import Home from 'components/pages/Home';
import AboutMethod from 'components/pages/AboutMethod';

const Application = () => {
    return (
        <div>
            <Header />
            <Router>
                <Home path='/' />
                <AboutMethod path='/about' />
            </Router>
        </div>
    );
};

export default Application;
