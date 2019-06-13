import {h} from 'preact';

import {COMPARISON_LABELS, COMPARISON_VALUES} from 'constants/comparisons';
import Select from '../Select';

const options = Object.keys(COMPARISON_VALUES).map((key) => ({
    label: COMPARISON_LABELS[COMPARISON_VALUES[key]],
    value: COMPARISON_VALUES[key],
}));

const ComparisonSelect = ({className, value, onChange}) => (
    <Select
        className={className}
        value={value}
        options={options}
        onChange={(event) => {
            const comparisonValue = parseFloat(event.target.value);

            onChange(comparisonValue);
        }}
    />
);

export default ComparisonSelect;
