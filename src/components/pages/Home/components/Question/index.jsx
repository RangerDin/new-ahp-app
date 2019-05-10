import {h, Fragment} from 'preact';

import Label from 'components/common/Label';
import Input from 'components/common/Input';
import style from './style.scss';

const Question = () => (
    <Fragment>
        <Label className={style['question__label']}>
            Enter your question. For example: "Which Italian supercar is
            better?"
        </Label>
        <Input
            className={style['question__input']}
            placeholder='Question'
        />
    </Fragment>
);

export default Question;
