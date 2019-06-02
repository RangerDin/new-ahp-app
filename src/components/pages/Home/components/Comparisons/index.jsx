import {h, Fragment} from 'preact';

import Label from 'components/common/Label';
import ComparisonSelect from '../ComparisonSelect';
import Error from '../Error';
import style from './style.scss';

const Comparisons = ({label, comparisons, setComparisons, error}) => (
    <Fragment>
        <Label className={style.comparison__header}>{label}</Label>
        {comparisons.map(({parameter1, parameter2, value}) => (
            <div className={style.comparison__block}>
                <Label className={style.comparison__label}>{parameter1}</Label>
                <ComparisonSelect
                    value={value}
                    onChange={(newValue, index) => {
                        setComparisons([
                            ...comparisons.slice(0, index),
                            {
                                parameter1,
                                parameter2,
                                value: newValue,
                            },
                            ...comparisons.slice(index),
                        ]);
                    }}
                />
                <Label className={style.comparison__label}>{parameter2}</Label>
                {error && <Error>{error}</Error>}
            </div>
        ))}
    </Fragment>
);

export default Comparisons;
