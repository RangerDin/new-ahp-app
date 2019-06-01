import {h, Fragment} from 'preact';

import Label from 'components/common/Label';
import Input from 'components/common/Input';
import Error from '../Error';
import style from './style.scss';

const errorMock = 'Question can\'t be empty';

const Question = () => (
    <Fragment>
        <Label className={style['question__label']}>
            Enter your question. For example: "Which Italian supercar is
            better?"
        </Label>
        <Input className={style['question__input']} placeholder='Question' />
        {errorMock && <Error>{errorMock}</Error>}
    </Fragment>
);

export default Question;
