import {h} from 'preact';
import {Table} from 'components/common/Table';

import style from './style.scss';
import {useContext} from 'preact/hooks';
import {TranslationContext} from 'utils/translation';

const SAATI_VALUES = [
    {
        value: 1,
        description: 'comparisons.description.1',
    },
    {
        value: 3,
        description: 'comparisons.description.2',
    },
    {
        value: 5,
        description: 'comparisons.description.3',
    },
    {
        value: 7,
        description: 'comparisons.description.4',
    },
    {
        value: 9,
        description: 'comparisons.description.5',
    },
];

export const SaatiScale = () => {
    const {t} = useContext(TranslationContext);

    return (
        <Table className={style['saati-scale']}>
            <Table.Caption>{t('about.description.saati-scale-title')}</Table.Caption>
            <Table.THead>
                <Table.Tr>
                    <Table.Th>{t('about.description.saati-scale-value')}</Table.Th>
                    <Table.Th>{t('about.description.saati-scale-description')}</Table.Th>
                </Table.Tr>
                {SAATI_VALUES.map(({value, description}) => (
                    <Table.Tr>
                        <Table.Td className={style['saati-scale__value']}>{value}</Table.Td>
                        <Table.Td>{t(description)}</Table.Td>
                    </Table.Tr>
                ))}
            </Table.THead>
        </Table>
    );
};
