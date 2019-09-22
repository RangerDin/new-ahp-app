import {h} from 'preact';

import {WIDGET_TYPE} from 'constants/comparisons';
import cn from 'utils/classnames';
import style from './style.scss';
import {useContext} from 'preact/hooks';
import {TranslationContext} from 'utils/translation';

export const ComparisonTypeSelect = ({type, onChange}) => {
    const {t} = useContext(TranslationContext);

    return <div className={style['comparison-type-select']}>
        <button
            onClick={() => onChange(WIDGET_TYPE.LIST)}
            className={cn(
                style['comparison-type-select__option'],
                type === WIDGET_TYPE.LIST &&
                    style['comparison-type-select__option_active']
            )}
        >
            {t('home.list-of-comparisons.title')}
        </button>
        <button
            onClick={() => onChange(WIDGET_TYPE.MATRIX)}
            className={cn(
                style['comparison-type-select__option'],
                type === WIDGET_TYPE.MATRIX &&
                    style['comparison-type-select__option_active']
            )}
        >
            {t('home.comparison-matrix.title')}
        </button>
    </div>;
};
