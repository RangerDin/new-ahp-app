import {h, Fragment} from 'preact';

import Label from 'components/common/Label';
import ComparisonSelect from '../ComparisonSelect';
import Error from '../Error';
import style from './style.scss';

const Comparison = ({name1, name2, value, error, onChange}) => (
    <div className={style.comparison__block}>
        <Label className={style.comparison__label}>
            {name1}
        </Label>
        <ComparisonSelect
            value={value}
            onChange={onChange}
        />
        <Label className={style.comparison__label}>
            {name2}
        </Label>
        {error && <Error>{error}</Error>}
    </div>
);

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
        <Fragment>
            <Label className={style.comparison__header}>{label}</Label>
            {comparisonWidgets}
        </Fragment>
    );
};

export default Comparisons;
