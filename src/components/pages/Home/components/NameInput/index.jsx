import {h, Fragment} from 'preact';

import Button from 'components/common/Button';
import cn from 'utils/classnames';
import Input from '../Input';
import style from './style.scss';

const NameInput = ({className, value, error, placeholder, onChange}) => (
    <Fragment>
        <Input
            className={cn(className, style.input)}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
        />
        {error && <div className={style.error}>{error}</div>}
        <Button className={style['delete-button']}>delete</Button>
    </Fragment>
);

export default NameInput;
