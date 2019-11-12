import {h} from 'preact';

import {
    COMPARISON_INDEX,
    COMPARISON_INDEX_TO_LABEL,
} from 'constants/comparisons';
import Select from '../Select';
import cn from 'utils/classnames';
import style from './style.scss';
import {useContext} from 'preact/hooks';
import {TranslationContext} from 'utils/useTranslation';
import {useCallback} from 'react';

const getOptions = (t) =>
    Object.keys(COMPARISON_INDEX).map((name) => ({
        label: t(COMPARISON_INDEX_TO_LABEL[COMPARISON_INDEX[name]]),
        value: COMPARISON_INDEX[name],
    }));

const ComparisonSelect = ({className, value, disabled, onChange}) => {
    const {t} = useContext(TranslationContext);
    const onComparisonValueChange = useCallback(
        (event) => {
            const comparisonValue = Number(event.target.value);

            onChange(comparisonValue);
        },
        [onChange]
    );

    return (
        <Select
            disabled={disabled}
            className={cn(className, style['comparison-select'])}
            value={value}
            options={getOptions(t)}
            onChange={onComparisonValueChange}
        />
    );
};

export default ComparisonSelect;
