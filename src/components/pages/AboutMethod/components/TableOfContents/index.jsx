import {h} from 'preact';

import style from './style.scss';
import {CONTENTS} from '../../constants/contents';

export const TableOfContents = () => (
    <ul className={style['table-of-contents']}>
        {
            CONTENTS.map((content) => (
                <li className={style['table-of-contents__item']} key={content.anchor}>
                    <a className={style['table-of-contents__link']} href={`#${content.anchor}`}>{content.name}</a>
                </li>
            ))
        }
    </ul>
);
