import {h} from 'preact';
import LinkToPage from '../LinkToPage';
import style from './style.scss';

const Footer = ({history}) => (
    <footer className={style['footer']}>
        <div className={style['footer__container']}>
            <div className={style['footer__copyright']}>© 2019 htype</div>
            <div className={style['footer__links']}>
                <LinkToPage
                    className={style['footer__link']}
                    history={history}
                    href='https://htype.me'
                >
                    Made by htype
                </LinkToPage>
            </div>
        </div>
    </footer>
);

export default Footer;
