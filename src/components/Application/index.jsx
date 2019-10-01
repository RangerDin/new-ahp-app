import {h} from 'preact';
import {createBrowserHistory} from 'history';
import Router from 'preact-router';

import Header from 'components/common/Header';
import Home from 'components/pages/Home';
import AboutMethod from 'components/pages/AboutMethod';
import {useTheme} from 'utils/useTheme';
import Footer from 'components/common/Footer';
import style from './style.scss';
import {TranslationContext, useTranslation} from 'utils/translation';

const history = createBrowserHistory();

const Application = () => {
    const {theme, toggleTheme} = useTheme();
    const translation = useTranslation();

    return (
        <div className={style['application']}>
            <TranslationContext.Provider value={translation}>
                <Header history={history} theme={theme} toggleTheme={toggleTheme} />
                <Router history={history}>
                    <Home path='/' history={history} />
                    <AboutMethod path='/about' />
                </Router>
                <Footer history={history} />
            </TranslationContext.Provider>
        </div>
    );
};

export default Application;
