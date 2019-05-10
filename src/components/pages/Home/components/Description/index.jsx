import {h, Fragment} from 'preact';

import TextArea from 'components/common/TextArea';
import Label from 'components/common/Label';
import style from './style.scss';

const Description = () => (
    <Fragment>
        <Label className={style['description__label']}>
            Enter a description of the solution. For example: "Solution of one
            authoritative auto journalist"
        </Label>
        <TextArea
            className={style['description__textarea']}
            placeholder='Description of the solution'
        />
    </Fragment>
);

export default Description;
