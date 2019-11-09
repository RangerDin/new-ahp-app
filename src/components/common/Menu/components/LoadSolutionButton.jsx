import {h} from 'preact';
import {ActionButton} from './ActionButton';
import {TranslationContext} from 'utils/useTranslation';
import {useCallback, useContext} from 'preact/hooks';
import {loadSolutionFromFile} from 'utils/loading/file';
import {MENU_ACTIONS} from 'constants/actions';

const wrongFormatAlert = () => {
    alert('Wrong file format!');
};

export const LoadSolutionButton = ({history}) => {
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
        <ActionButton onClick={onLoadSolutionClick}>
            {t('menu.load-solution')}
        </ActionButton>
    );
};
