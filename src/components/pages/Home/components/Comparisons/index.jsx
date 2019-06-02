import {h, Fragment} from 'preact';

import Label from 'components/common/Label';
import ComparisonSelect from '../ComparisonSelect';
import Error from '../Error';
import style from './style.scss';

const Comparisons = ({label, names, comparisons, setComparisons, error}) => {
    if (!comparisons.length) {
        return null;
    }

    return (
        <Fragment>
            <Label className={style.comparison__header}>{label}</Label>
            {comparisons.map(({first, second, value}, index) => (
                <div className={style.comparison__block}>
                    <Label className={style.comparison__label}>
                        {names[first]}
                    </Label>
                    <ComparisonSelect
                        value={value}
                        onChange={(event) => {
                            setComparisons([
                                ...comparisons.slice(0, index),
                                {
                                    first,
                                    second,
                                    value: event.target.value,
                                },
                                ...comparisons.slice(index + 1),
                            ]);
                        }}
                    />
                    <Label className={style.comparison__label}>
                        {names[second]}
                    </Label>
                    {error && <Error>{error}</Error>}
                </div>
            ))}
        </Fragment>
    );
};

export default Comparisons;
