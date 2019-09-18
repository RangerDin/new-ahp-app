import {h} from 'preact';
import {Table} from 'components/common/Table';

import style from './style.scss';

const SAATI_VALUES = [
    {
        value: 1,
        description: 'Objects are equally preferable',
    },
    {
        value: 3,
        description: 'One object is slightly preferable to another',
    },
    {
        value: 5,
        description: 'One object is much preferable to another',
    },
    {
        value: 7,
        description: 'One object is clearly preferable to another',
    },
    {
        value: 9,
        description: 'One object is absolutely superior to the other',
    },
];

export const SaatiScale = () => (
    <Table className={style['saati-scale']}>
        <Table.Caption>Saati scale</Table.Caption>
        <Table.THead>
            <Table.Tr>
                <Table.Th>Value</Table.Th>
                <Table.Th>Description</Table.Th>
            </Table.Tr>
            {SAATI_VALUES.map(({value, description}) => (
                <Table.Tr>
                    <Table.Td className={style['saati-scale__value']}>{value}</Table.Td>
                    <Table.Td>{description}</Table.Td>
                </Table.Tr>
            ))}
        </Table.THead>
    </Table>
);
