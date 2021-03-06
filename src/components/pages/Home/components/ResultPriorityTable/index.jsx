import {h} from 'preact';

import Label from 'components/common/Label';
import style from './style.scss';
import {useContext} from 'preact/hooks';
import {TranslationContext} from 'utils/useTranslation';
import {NAME_PLACEHOLDER} from 'constants/name';
import {ErrorPopup} from 'components/common/ErrorPopup';

const ResultPriorityTable = ({overallRanking, objectNames, error}) => {
    const {t} = useContext(TranslationContext);

    if (!overallRanking) {
        return null;
    }

    return (
        <div className={style.result}>
            <Label className={style.result__header}>
                {t('home.result-priority-table.label')}
            </Label>
            <table className={style.result__table}>
                <tr>
                    <th>{t('home.result-priority-table.objects-title')}</th>
                    <th>{t('home.result-priority-table.priorities-title')}</th>
                </tr>
                {overallRanking.map((value, index) => {
                    const title = objectNames[index] || NAME_PLACEHOLDER;

                    return (
                        <tr key={value} className={style['result__object']}>
                            <td
                                title={title}
                                className={style['result__object-name']}
                            >
                                {title}
                            </td>
                            <td className={style['result__object-priority']}>
                                {value}
                            </td>
                        </tr>
                    );
                })}
            </table>
            <ErrorPopup className={style['result__error-popup']} isOpen={error}>
                {error}
            </ErrorPopup>
        </div>
    );
};

export default ResultPriorityTable;
