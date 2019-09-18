import {h} from 'preact';

import Link from 'components/common/Link';
import Paragraph from 'components/pages/Home/components/Paragraph';
import style from './style.scss';

const MethodDescription = () => (
    <Paragraph className={style['method-description']}>
        The method is used to find among the set of objects the most
        acceptable one by certain parameters.{' '}
        <Link href='#'>Read more about the method</Link>.
    </Paragraph>
);

export default MethodDescription;
