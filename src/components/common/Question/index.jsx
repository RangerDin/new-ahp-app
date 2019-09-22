import {h, Fragment} from 'preact';

import Label from 'components/common/Label';
import Input from 'components/common/Input';
import Error from 'components/common/Error';
import style from './style.scss';
import {useContext} from 'preact/hooks';
import {TranslationContext} from 'utils/translation';

const Question = ({value, setValue}) => {
    const {t} = useContext(TranslationContext);

    return <Fragment>
        <Label className={style['question__label']}>
            {t('home.question.label')}
        </Label>
        <Input
            value={value}
            onChange={(event) => setValue(event.target.value)}
            className={style['question__input']}
            placeholder={t('home.question.placeholder')}
        />
        {!value && <Error>{t('home.question.error')}</Error>}
    </Fragment>;
};

export default Question;
