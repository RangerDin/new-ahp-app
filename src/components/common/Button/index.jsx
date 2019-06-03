import {h} from 'preact';

import style from './style.scss';

const Button = ({className, ...otherProps}) => (
    <button className={`${className} ${style.button}`} {...otherProps} />
);

export default Button;
