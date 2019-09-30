import {h} from 'preact';

import {Comparison} from './Comparison';
import {NAME_PLACEHOLDER} from 'constants/name';

export const ListOfComparisons = ({className, names, comparisons, setComparisons}) => {
    const comparisonWidgets = [];

    for (let i = 0; i < comparisons.length; i++) {
        for (let j = i + 1; j < comparisons.length; j++) {
            comparisonWidgets.push(
                <Comparison
                    key={`${i}_${j}`}
                    name1={names[i] || NAME_PLACEHOLDER}
                    name2={names[j] || NAME_PLACEHOLDER}
                    disabled={!names[i] || !names[j]}
                    value={comparisons[i][j]}
                    error=''
                    onChange={(value) => setComparisons(i, j, value)}
                />
            );
        }
    }

    return (
        <div className={className}>
            {comparisonWidgets}
        </div>
    );
};
