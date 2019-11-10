import {h} from 'preact';

import cn from 'utils/classnames';
import style from './style.scss';
import {ComparisonInput} from './ComparisonInput';
import {NAME_PLACEHOLDER} from 'constants/name';
import {Table} from '../Table';

export const ComparisonMatrix = ({
    className,
    names,
    comparisons,
    disabled,
    setComparisons,
}) => {
    return (
        <div className={cn(className, style['comparison-matrix'])}>
            <Table
                className={cn(
                    style['comparison-matrix__table'],
                    style['table']
                )}
            >
                <Table.THead>
                    <Table.Tr>
                        <Table.Th
                            className={cn(
                                style['table__cell'],
                                style['table__cell_top-header']
                            )}
                        />
                        {comparisons.map((_, i) => {
                            const title = names[i] || NAME_PLACEHOLDER;

                            return (
                                <Table.RotatedTh
                                    key={i}
                                    className={cn(
                                        style['table__cell'],
                                        style['table__cell_top-header']
                                    )}
                                    title={title}
                                >
                                    {title}
                                </Table.RotatedTh>
                            );
                        })}
                    </Table.Tr>
                </Table.THead>
                <Table.TBody>
                    {comparisons.map((row, i) => (
                        <Table.Tr key={i}>
                            <Table.ThRight
                                className={cn(
                                    style['table__cell'],
                                    style['table__cell_right-header']
                                )}
                                title={names[i] || NAME_PLACEHOLDER}
                            >
                                {names[i] || NAME_PLACEHOLDER}
                            </Table.ThRight>
                            {row.map((cell, j) => {
                                const isDisabled = disabled || i == j;

                                return (
                                    <Table.Td
                                        key={j}
                                        className={cn(
                                            style['table__cell'],
                                            style['table__cell_value']
                                        )}
                                    >
                                        <ComparisonInput
                                            disabled={
                                                isDisabled ||
                                                !names[i] ||
                                                !names[j]
                                            }
                                            value={cell}
                                            onChange={(value) => {
                                                setComparisons(i, j, value);
                                            }}
                                        />
                                    </Table.Td>
                                );
                            })}
                        </Table.Tr>
                    ))}
                </Table.TBody>
            </Table>
        </div>
    );
};
