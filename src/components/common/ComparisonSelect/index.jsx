import {h} from 'preact';

import {
    COMPARISON_LABELS,
    COMPARISON_VALUES,
    SHORT_COMPARISON_PRECISION,
    SHORT_COMPARISON_VALUES_TO_LONG,
} from 'constants/comparisons';
import Select from '../Select';
import cn from 'utils/classnames';
import style from './style.scss';
import {useContext} from 'preact/hooks';
import {TranslationContext} from 'utils/useTranslation';

const getOptions = (t) => Object.keys(COMPARISON_VALUES).map((key) => ({
    label: t(COMPARISON_LABELS[COMPARISON_VALUES[key]]),
    value: COMPARISON_VALUES[key].toFixed(SHORT_COMPARISON_PRECISION),
}));

const ComparisonSelect = ({className, value, disabled, onChange}) => {
    const {t} = useContext(TranslationContext);

    return <Select
        disabled={disabled}
        className={cn(className, style['comparison-select'])}
        value={value.toFixed(SHORT_COMPARISON_PRECISION)}
        options={getOptions(t)}
        onChange={(event) => {
            const comparisonValue =
                SHORT_COMPARISON_VALUES_TO_LONG[event.target.value];

            onChange(comparisonValue);
        }}
    />;
};

export default ComparisonSelect;
