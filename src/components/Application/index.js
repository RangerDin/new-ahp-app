import Router from 'preact-router';
import {h, Component} from 'preact';

import Header from 'components/Header';
import Home from 'components/pages/Home';
import MySolutions from 'components/pages/MySolutions';
import AboutMethod from 'components/pages/AboutMethod';

export default class Application extends Component {
    render() {
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
    }
}
