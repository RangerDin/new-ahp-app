import {h} from 'preact';

import style from './style.scss';
import {CONTENTS} from '../../constants/contents';
import {useContext} from 'preact/hooks';
import {TranslationContext} from 'utils/useTranslation';

export const TableOfContents = () => {
    const {t} = useContext(TranslationContext);

    return (
        <ul className={style['table-of-contents']}>
            {CONTENTS.map((content) => (
                <li
                    className={style['table-of-contents__item']}
                    key={content.anchor}
                >
                    <a
                        className={style['table-of-contents__link']}
                        href={`#${content.anchor}`}
                    >
                        {t(content.name)}
                    </a>
                </li>
            ))}
        </ul>
    );
};
