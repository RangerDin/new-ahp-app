import {h, Fragment} from 'preact';

import TextArea from 'components/common/TextArea';
import Label from 'components/common/Label';
import Error from '../Error';
import style from './style.scss';

const errorMock = 'Description can\'t be empty';

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
        {errorMock && <Error>{errorMock}</Error>}
    </Fragment>
);

export default Description;
