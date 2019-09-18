import {h} from 'preact';
import {BIBLIOGRAPHY_ANCHOR_PREFIX} from '../../constants/bibliography';
import style from './style.scss';

export const BibliographyLink = ({link}) => (
    <a
        className={style['bibliography-link']}
        href={`#${BIBLIOGRAPHY_ANCHOR_PREFIX}${link.order}`}
        title={link.text}
    >
        [{link.order}]
    </a>
);
