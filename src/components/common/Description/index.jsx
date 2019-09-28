import {h, Fragment} from 'preact';

import TextArea from 'components/common/TextArea';
import Label from 'components/common/Label';
import Error from 'components/common/Error';
import style from './style.scss';
import {useContext} from 'preact/hooks';
import {TranslationContext} from 'utils/translation';

const Description = ({value, setValue}) => {
    const {t} = useContext(TranslationContext);

    return <Fragment>
        <Label className={style['description__label']}>
            {t('home.description.label')}
        </Label>
        <TextArea
            value={value}
            onChange={(event) => setValue(event.target.value)}
            className={style['description__textarea']}
            placeholder={t('home.description.placeholder')}
        />
        <Error isVisible={!value}>{t('home.description.error')}</Error>
    </Fragment>;
};

export default Description;
