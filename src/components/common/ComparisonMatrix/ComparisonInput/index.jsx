import {h} from 'preact';
import {
    COMPARISON_INDEX,
    COMPARISON_INDEX_TO_STRING,
} from 'constants/comparisons';
import style from './style.scss';
import {useCallback} from 'preact/hooks';

export const ComparisonInput = ({disabled, value, onChange}) => {
    const onComparisonValueChange = useCallback(
        (event) => {
            const comparisonValue = Number(event.target.value);

            onChange(comparisonValue);
        },
        [onChange]
    );

    return (
        <select
            disabled={disabled}
            className={style['comparison-input']}
            value={value}
            onChange={onComparisonValueChange}
        >
            {Object.keys(COMPARISON_INDEX).map((name) => {
                const comparisonIndex = COMPARISON_INDEX[name];
                const comparisonValueAsString =
                    COMPARISON_INDEX_TO_STRING[comparisonIndex];

                return (
                    <option key={comparisonIndex} value={comparisonIndex}>
                        {comparisonValueAsString}
                    </option>
                );
            })}
        </select>
    );
};
