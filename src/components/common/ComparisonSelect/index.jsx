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

const options = Object.keys(COMPARISON_VALUES).map((key) => ({
    label: COMPARISON_LABELS[COMPARISON_VALUES[key]],
    value: COMPARISON_VALUES[key].toFixed(SHORT_COMPARISON_PRECISION),
}));

const ComparisonSelect = ({className, value, onChange}) => (
    <Select
        className={cn(className, style['comparison-select'])}
        value={value.toFixed(SHORT_COMPARISON_PRECISION)}
        options={options}
        onChange={(event) => {
            const comparisonValue =
                SHORT_COMPARISON_VALUES_TO_LONG[event.target.value];

            onChange(comparisonValue);
        }}
    />
);

export default ComparisonSelect;
