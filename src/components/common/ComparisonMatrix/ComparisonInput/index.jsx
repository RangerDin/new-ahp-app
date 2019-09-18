import {h} from 'preact';
import {
    COMPARISON_VALUES,
    COMPARISON_VALUES_TO_STRING,
    SHORT_COMPARISON_VALUES_TO_LONG,
    SHORT_COMPARISON_PRECISION,
} from 'constants/comparisons';
import style from './style.scss';

export const ComparisonInput = ({disabled, value, onChange}) => {
    return (
        <select
            disabled={disabled}
            className={style['comparison-input']}
            value={value.toFixed(SHORT_COMPARISON_PRECISION)}
            onChange={(event) => {
                const comparisonValue = SHORT_COMPARISON_VALUES_TO_LONG[event.target.value];

                onChange(comparisonValue);
            }}
        >
            {Object.keys(COMPARISON_VALUES).map((comparisonName) => {
                const comparisonValue = COMPARISON_VALUES[comparisonName];
                const comparisonValueAsString =
                    COMPARISON_VALUES_TO_STRING[comparisonValue];

                return (
                    <option key={comparisonValue} value={comparisonValue.toFixed(SHORT_COMPARISON_PRECISION)}>
                        {comparisonValueAsString}
                    </option>
                );
            })}
        </select>
    );
};
