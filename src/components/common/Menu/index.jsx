import {h} from 'preact';

import {LinkToPage} from './components/LinkToPage';
import {ActionButton} from './components/ActionButton';
import {LinkToLegal} from './components/LinkToLegal';
import style from './style.scss';
import {loadSolutionFromFile, checkFileFormat} from 'utils/loading/file';
import {ThemeToggler} from './components/ThemeToggler';
import cn from 'utils/classnames';

const Menu = ({isOpen, history, theme, toggleTheme}) => {
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
                New solution
            </LinkToPage>
            <LinkToPage history={history} href='/about'>
                About method
            </LinkToPage>
            <ActionButton onClick={onLoadSolutionClick}>Load solution</ActionButton>
            <ThemeToggler theme={theme} onToggleTheme={toggleTheme} />
            <ActionButton>Русский язык</ActionButton>
            <LinkToLegal className={style.menu__link_author} href='#'>
                Made by htype
            </LinkToLegal>
            <LinkToLegal className={style.menu__link_icons8} href='#'>
                Icons by Icons8
            </LinkToLegal>
        </div>
    );
};

export default Menu;
