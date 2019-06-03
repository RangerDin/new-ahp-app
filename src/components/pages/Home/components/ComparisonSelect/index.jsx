import {h} from 'preact';

import {COMPARISON_OPTION_LABELS} from 'constants/comparisons';
import Select from '../Select';

const options = Object.keys(COMPARISON_OPTION_LABELS).map((key) => ({
    label: COMPARISON_OPTION_LABELS[key],
    value: COMPARISON_OPTION_LABELS[key],
}));

const ComparisonSelect = ({className, value, onChange}) => (
    <Select
        className={className}
        value={value}
        options={options}
        onChange={onChange}
    />
);

export default ComparisonSelect;
