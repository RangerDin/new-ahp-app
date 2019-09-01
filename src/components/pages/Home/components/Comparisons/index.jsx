import {h} from 'preact';

import Label from 'components/common/Label';
import style from './style.scss';
import {Comparison} from './Comparison';

const Comparisons = ({label, names, comparisons, setComparisons}) => {
    if (!comparisons.length || comparisons.length === 1) {
        return null;
    }

    const comparisonWidgets = [];
    for (let i = 0; i < comparisons.length; i++) {
        for (let j = i + 1; j < comparisons.length; j++) {
            comparisonWidgets.push(
                <Comparison
                    key={`${i}_${j}`}
                    name1={names[i]}
                    name2={names[j]}
                    value={comparisons[i][j]}
                    error=''
                    onChange={(value) => setComparisons(i, j, value)}
                />
            );
        }
    }

    return (
        <div className={style.comparisons}>
            <Label className={style.comparisons__header}>{label}</Label>
            {comparisonWidgets}
        </div>
    );
};

export default Comparisons;
