import {h} from 'preact';
import {createBrowserHistory} from 'history';
import Router from 'preact-router';

import Header from 'components/common/Header';
import Home from 'components/pages/Home';
import AboutMethod from 'components/pages/AboutMethod';
import {useTheme} from 'utils/useTheme';

const history = createBrowserHistory();

const Application = () => {
    const {theme, toggleTheme} = useTheme();

    return (
        <div>
            <Header history={history} theme={theme} toggleTheme={toggleTheme} />
            <Router history={history}>
                <Home path='/' history={history} />
                <AboutMethod path='/about' />
            </Router>
        </div>
    );
};

export default Application;
