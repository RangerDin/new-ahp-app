import {h} from 'preact';

import cn from 'utils/classnames';
import style from './style.scss';
import {ComparisonInput} from './ComparisonInput';

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
                            className={cn(
                                style['table__cell'],
                                style['table__cell_top-header']
                            )}
                        >
                            <div>{names[i]}</div>
                        </td>
                    ))}
                </tr>
                {comparisons.map((row, i) => (
                    <tr>
                        <td
                            className={cn(
                                style['table__cell'],
                                style['table__cell_right-header']
                            )}
                        >
                            {names[i]}
                        </td>
                        {row.map((cell, j) => {
                            const isDisabled = disabled || i == j;

                            return (
                                <td
                                    className={cn(
                                        style['table__cell'],
                                        style['table__cell_value'],
                                        !isDisabled && style['table__cell_value-active']
                                    )}
                                >
                                    <ComparisonInput
                                        disabled={isDisabled}
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
