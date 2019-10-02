import {h} from 'preact';

import cn from 'utils/classnames';
import style from './style.scss';
import {ComparisonInput} from './ComparisonInput';
import {NAME_PLACEHOLDER} from 'constants/name';

export const ComparisonMatrix = ({
    className,
    names,
    comparisons,
    disabled,
    setComparisons,
}) => {
    return (
        <div className={cn(className, style['comparison-matrix'])}>
            <table
                className={cn(
                    style['comparison-matrix__table'],
                    style['table']
                )}
            >
                <tr>
                    <td
                        className={cn(
                            style['table__cell'],
                            style['table__cell_top-header']
                        )}
                    />
                    {comparisons.map((_, i) => (
                        <td
                            key={i}
                            className={cn(
                                style['table__cell'],
                                style['table__cell_top-header']
                            )}
                            title={names[i] || NAME_PLACEHOLDER}
                        >
                            <div>{names[i] || NAME_PLACEHOLDER}</div>
                        </td>
                    ))}
                </tr>
                {comparisons.map((row, i) => (
                    <tr key={i}>
                        <td
                            className={cn(
                                style['table__cell'],
                                style['table__cell_right-header']
                            )}
                            title={names[i] || NAME_PLACEHOLDER}
                        >
                            {names[i] || NAME_PLACEHOLDER}
                        </td>
                        {row.map((cell, j) => {
                            const isDisabled = disabled || i == j;

                            return (
                                <td
                                    key={j}
                                    className={cn(
                                        style['table__cell'],
                                        style['table__cell_value'],
                                        !isDisabled && style['table__cell_value-active']
                                    )}
                                >
                                    <ComparisonInput
                                        disabled={isDisabled || !names[i] || !names[j]}
                                        value={cell}
                                        onChange={(value) => {
                                            setComparisons(i, j, value);
                                        }}
                                    />
                                </td>
                            );
                        })}
                    </tr>
                ))}
            </table>
        </div>
    );
};
