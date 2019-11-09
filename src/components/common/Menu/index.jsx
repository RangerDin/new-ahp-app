import {h} from 'preact';

import {LinkToPage} from './components/LinkToPage';
import {ActionButton} from './components/ActionButton';
import {LinkToLegal} from './components/LinkToLegal';
import style from './style.scss';
import {loadSolutionFromFile} from 'utils/loading/file';
import {ThemeToggler} from './components/ThemeToggler';
import {Copyright} from './components/Copyright';
import {LanguageToggler} from './components/LanguageToggler';
import {TranslationContext} from 'utils/useTranslation';
import {useContext, useCallback} from 'preact/hooks';
import cn from 'utils/classnames';
import {MENU_ACTIONS} from 'constants/actions';

const wrongFormatAlert = () => {
    alert('Wrong file format!');
};

const Menu = ({isOpen, history, theme, toggleTheme}) => {
    const {t} = useContext(TranslationContext);
    const onLoadSolutionClick = useCallback(() => {
        loadSolutionFromFile((solution) => {
            if (!solution) {
                wrongFormatAlert();
                return;
            }

            const location = {
                state: {
                    action: MENU_ACTIONS.LOAD,
                    solution,
                },
                pathname: '/',
            };

            history.push(location);
        });
    }, [history]);

    return (
        <div className={cn(style['menu'], !isOpen && style['menu_hidden'])}>
            <LinkToPage
                history={history}
                href='/'
                state={{
                    action: MENU_ACTIONS.NEW,
                }}
                isAlwaysActive
            >
                {t('menu.new-solution')}
            </LinkToPage>
            <LinkToPage history={history} href='/about'>
                {t('menu.about-method')}
            </LinkToPage>
            <ActionButton onClick={onLoadSolutionClick}>
                {t('menu.load-solution')}
            </ActionButton>
            <ThemeToggler theme={theme} onToggleTheme={toggleTheme} />
            <LanguageToggler />
            <LinkToLegal
                className={style.menu__link_author}
                href='https://htype.me'
            >
                {t('site.made-by-htype')}
            </LinkToLegal>
            <Copyright />
        </div>
    );
};

export default Menu;
