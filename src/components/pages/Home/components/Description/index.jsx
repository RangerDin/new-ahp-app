import {h, Fragment} from 'preact';

import TextArea from 'components/common/TextArea';
import Label from 'components/common/Label';
import Error from '../Error';
import style from './style.scss';

const Description = ({value, setValue}) => (
    <Fragment>
        <Label className={style['description__label']}>
            Enter a description of the solution. For example: "Solution of one
            authoritative auto journalist"
        </Label>
        <TextArea
            value={value}
            onChange={(event) => setValue(event.target.value)}
            className={style['description__textarea']}
            placeholder='Description of the solution'
        />
        {!value && <Error>Description can't be empty</Error>}
    </Fragment>
);

export default Description;
