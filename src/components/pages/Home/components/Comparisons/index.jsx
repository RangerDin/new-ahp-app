import {h, Fragment} from 'preact';

import Label from 'components/common/Label';
import ComparisonSelect from '../ComparisonSelect';
import Error from '../Error';
import style from './style.scss';

const parameterPairs = [
    {
        parameter1: 'parameter1',
        parameter2: 'parameter2',
    },
    {
        parameter1: 'parameter2',
        parameter2: 'parameter3',
    },
];

const errorMock = 'You must select an option';

const Comparisons = ({label}) => (
    <Fragment>
        <Label className={style.comparison__header}>{label}</Label>
        {parameterPairs.map(({parameter1, parameter2}) => (
            <div className={style.comparison__block}>
                <Label className={style.comparison__label}>{parameter1}</Label>
                <ComparisonSelect />
                <Label className={style.comparison__label}>{parameter2}</Label>
                {errorMock && <Error>{errorMock}</Error>}
            </div>
        ))}
    </Fragment>
);

export default Comparisons;
