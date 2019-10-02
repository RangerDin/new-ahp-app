import {h} from 'preact';
import NameInputs from '../NameInputs';

import style from './style.scss';
import {
    MAX_OBJECTS_COUNT,
    MIN_OBJECTS_COUNT,
    MIN_PARAMETERS_COUNT,
    MAX_PARAMETERS_COUNT,
} from 'constants/comparisons';
import {useContext} from 'preact/hooks';
import {TranslationContext} from 'utils/translation';

export const EntityNameInputs = ({
    objectNames,
    changeObjectName,
    deleteObjectName,
    addObjectName,
    parameterNames,
    changeParameterName,
    deleteParameterName,
    addParameterName,
}) => {
    const {t} = useContext(TranslationContext);

    return (
        <div className={style['name-inputs']}>
            <NameInputs
                className={style['name-inputs__objects']}
                names={objectNames}
                labelText={t('home.objects.names.label')}
                inputPlaceholder={t('home.objects.names.placeholder')}
                hasDeleteButton={objectNames.length > MIN_OBJECTS_COUNT}
                hasAddButton={objectNames.length < MAX_OBJECTS_COUNT}
                addButtonText={t('home.objects.names.add-button')}
                emptyNameError={t('home.objects.names.emptyError')}
                nonUniqueNameError={t('home.objects.names.nonUniqueError')}
                onNameChange={changeObjectName}
                onNameDelete={deleteObjectName}
                onNameAdd={addObjectName}
            />
            <NameInputs
                className={style['name-inputs__parameters']}
                names={parameterNames}
                labelText={t('home.parameters.names.label')}
                inputPlaceholder={t('home.parameters.names.placeholder')}
                hasDeleteButton={parameterNames.length > MIN_PARAMETERS_COUNT}
                hasAddButton={parameterNames.length < MAX_PARAMETERS_COUNT}
                addButtonText={t('home.parameters.names.add-button')}
                emptyNameError={t('home.parameters.names.emptyError')}
                nonUniqueNameError={t('home.parameters.names.nonUniqueError')}
                onNameChange={changeParameterName}
                onNameDelete={deleteParameterName}
                onNameAdd={addParameterName}
            />
        </div>
    );
};
