import {h} from 'preact';
import {useState} from 'preact/hooks';

import Label from 'components/common/Label';
import style from './style.scss';
import {ComparisonTypeSelect} from './ComparisonTypeSelect';
import {WIDGET_TYPE} from 'constants/comparisons';
import {ListOfComparisons} from './ListOfComparisons';
import {ComparisonMatrix} from './ComparisonMatrix';
import cn from 'utils/classnames';

const Comparisons = ({label, names, comparisons, setComparisons}) => {
    if (!comparisons.length || comparisons.length === 1) {
        return null;
    }

    const [type, setType] = useState(WIDGET_TYPE.LIST);

    return (
        <div className={style.comparisons}>
            <Label className={style.comparisons__header}>{label}</Label>
            <ComparisonTypeSelect type={type} onChange={setType} />
            <div className={style.comparisons__widgets}>
                <div className={style['comparisons__widgets-container']}>
                    <ListOfComparisons
                        className={cn(
                            style.comparisons__list,
                            type === WIDGET_TYPE.LIST && style.comparisons__list_active
                        )}
                        names={names}
                        comparisons={comparisons}
                        setComparisons={setComparisons}
                    />
                    <ComparisonMatrix
                        className={cn(
                            style.comparisons__matrix,
                            type === WIDGET_TYPE.MATRIX &&
                                style.comparisons__matrix_active
                        )}
                        names={names}
                        comparisons={comparisons}
                        setComparisons={setComparisons}
                    />
                </div>
            </div>
        </div>
    );
};

export default Comparisons;
