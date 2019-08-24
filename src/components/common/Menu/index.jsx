import {h} from 'preact';

import LinkToPage from './components/LinkToPage';
import ActionButton from './components/ActionButton';
import LinkToLegal from './components/LinkToLegal';
import style from './style.scss';
import {loadSolutionFromFile} from 'utils/loading/file';

const Menu = ({isOpen, history}) => {
    const onLoadSolutionClick = () => {
        loadSolutionFromFile((fileContentAsText) => {
            const loadedSolution = JSON.parse(fileContentAsText);
            const location = {
                state: {
                    action: 'load',
                    solution: loadedSolution,
                },
                pathname: '/',
            };

            history.push(location);
        });
    };

    return (
        <div className={style['menu']} hidden={!isOpen}>
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
            <ActionButton>Light theme</ActionButton>
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
