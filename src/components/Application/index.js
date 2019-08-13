import {h} from 'preact';
import {createBrowserHistory} from 'history';
import Router from 'preact-router';

import Header from 'components/common/Header';
import Home from 'components/pages/Home';
import AboutMethod from 'components/pages/AboutMethod';

const history = createBrowserHistory();

const Application = () => {
    return (
        <div>
            <Header history={history} />
            <Router history={history}>
                <Home path='/' history={history} />
                <AboutMethod path='/about' />
            </Router>
        </div>
    );
};

export default Application;
