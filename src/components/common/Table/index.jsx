import {h} from 'preact';

import style from './style.scss';
import cn from 'utils/classnames';

const Tr = ({className, children}) => (
    <tr className={cn(style['table__tr'], className)}>{children}</tr>
);

const Td = ({className, children}) => (
    <td className={cn(style['table__td'], className)}>{children}</td>
);

const Th = ({className, children}) => (
    <th className={cn(style['table__th'], className)}>{children}</th>
);

const RotatedTh = ({className, children}) => (
    <th className={cn(style['table__th_rotated'], className)}>
        <div>{children}</div>
    </th>
);

const Caption = ({className, children}) => (
    <caption className={cn(style['table__caption'], className)}>
        {children}
    </caption>
);

const THead = ({className, children}) => (
    <thead className={className}>
        {children}
    </thead>
);

const TBody = ({className, children}) => (
    <tbody className={className}>
        {children}
    </tbody>
);

export const Table = ({className, children}) => (
    <table className={cn(style['table'], className)}>{children}</table>
);

Table.Tr = Tr;
Table.Td = Td;
Table.Th = Th;
Table.Caption = Caption;
Table.RotatedTh = RotatedTh;
Table.THead = THead;
Table.TBody = TBody;
