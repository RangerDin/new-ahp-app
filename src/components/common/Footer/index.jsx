import {h} from 'preact';
import style from './style.scss';
import Link from '../Link';

const Footer = ({history}) => (
    <footer className={style['footer']}>
        <div className={style['footer__container']}>
            <div className={style['footer__copyright']}>© 2019 htype</div>
            <div className={style['footer__links']}>
                <Link className={style['footer__link']} href='https://htype.me'>
                    Made by htype
                </Link>
            </div>
        </div>
    </footer>
);

export default Footer;
