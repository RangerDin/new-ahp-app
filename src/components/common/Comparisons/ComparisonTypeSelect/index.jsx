import {h} from 'preact';

import {WIDGET_TYPE} from 'constants/comparisons';
import cn from 'utils/classnames';
import style from './style.scss';

export const ComparisonTypeSelect = ({type, onChange}) => (
    <div className={style['comparison-type-select']}>
        <button
            onClick={() => onChange(WIDGET_TYPE.LIST)}
            className={cn(
                style['comparison-type-select__option'],
                type === WIDGET_TYPE.LIST &&
                    style['comparison-type-select__option_active']
            )}
        >
            list of comparisons
        </button>
        <button
            onClick={() => onChange(WIDGET_TYPE.MATRIX)}
            className={cn(
                style['comparison-type-select__option'],
                type === WIDGET_TYPE.MATRIX &&
                    style['comparison-type-select__option_active']
            )}
        >
            comparison matrix
        </button>
    </div>
);
