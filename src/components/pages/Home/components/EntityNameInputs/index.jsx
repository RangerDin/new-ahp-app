import {h} from 'preact';
import NameInputs from '../NameInputs';

import style from './style.scss';
import {
    MAX_OBJECTS_COUNT,
    MIN_OBJECTS_COUNT,
    MIN_PARAMETERS_COUNT,
    MAX_PARAMETERS_COUNT,
} from 'constants/comparisons';

export const EntityNameInputs = ({
    objectNames,
    changeObjectName,
    deleteObjectName,
    addObjectName,
    parameterNames,
    changeParameterName,
    deleteParameterName,
    addParameterName,
}) => (
    <div className={style['name-inputs']}>
        <NameInputs
            className={style['name-inputs__objects']}
            names={objectNames}
            labelText='Enter the names of the objects you want to compare.'
            inputPlaceholder='Name of object'
            hasDeleteButton={objectNames.length > MIN_OBJECTS_COUNT}
            hasAddButton={objectNames.length < MAX_OBJECTS_COUNT}
            addButtonText='Add object'
            onNameChange={changeObjectName}
            onNameDelete={deleteObjectName}
            onNameAdd={addObjectName}
        />
        <NameInputs
            className={style['name-inputs__parameters']}
            names={parameterNames}
            labelText='Enter the names of the parameters by which you want to compare the objects.'
            inputPlaceholder='Name of parameter'
            hasDeleteButton={parameterNames.length > MIN_PARAMETERS_COUNT}
            hasAddButton={parameterNames.length < MAX_PARAMETERS_COUNT}
            addButtonText='Add parameter'
            onNameChange={changeParameterName}
            onNameDelete={deleteParameterName}
            onNameAdd={addParameterName}
        />
    </div>
);
