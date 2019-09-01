import {h, Fragment} from 'preact';

import Label from 'components/common/Label';
import Input from 'components/common/Input';
import Error from 'components/common/Error';
import style from './style.scss';

const Question = ({value, setValue}) => (
    <Fragment>
        <Label className={style['question__label']}>
            Enter your question. For example: "Which Italian supercar is
            better?"
        </Label>
        <Input
            value={value}
            onChange={(event) => setValue(event.target.value)}
            className={style['question__input']}
            placeholder='Question'
        />
        {!value && <Error>Question can't be empty</Error>}
    </Fragment>
);

export default Question;
