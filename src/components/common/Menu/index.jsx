import {h} from 'preact';

import {LinkToPage} from './components/LinkToPage';
import {ActionButton} from './components/ActionButton';
import {LinkToLegal} from './components/LinkToLegal';
import style from './style.scss';
import {loadSolutionFromFile, checkFileFormat} from 'utils/loading/file';
import {ThemeToggler} from './components/ThemeToggler';
import {Copyright} from './components/Copyright';
import {LanguageToggler} from './components/LanguageToggler';
import {TranslationContext} from 'utils/useTranslation';
import {useContext} from 'preact/hooks';
import cn from 'utils/classnames';

const Menu = ({isOpen, history, theme, toggleTheme}) => {
    const {t} = useContext(TranslationContext);
    const onLoadSolutionClick = () => {
        const wrongFormatAlert = () => {
            alert('Wrong file format!');
        };

        loadSolutionFromFile((fileContentAsText) => {
            try {
                const loadedSolution = JSON.parse(fileContentAsText);

                if (!checkFileFormat(loadedSolution)) {
                    wrongFormatAlert();
                    return;
                }

                const location = {
                    state: {
                        action: 'load',
                        solution: loadedSolution,
                    },
                    pathname: '/',
                };

                history.push(location);
            } catch (e) {
                wrongFormatAlert();
            }
        });
    };

    return (
        <div className={cn(style['menu'], !isOpen && style['menu_hidden'])}>
            <LinkToPage
                history={history}
                href='/'
                state={{
                    action: 'new',
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
