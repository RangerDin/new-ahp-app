import {h} from 'preact';

import Paragraph from 'components/common/Paragraph';
import PageContainer from 'components/common/PageContainer';
import PageHeader from './components/PageHeader';
import Title from './components/Title';

import style from './style.scss';

const MySolutions = () => (
    <PageContainer>
        <PageHeader />
        <Title href='#' className={style['my-solutions__title']}>
            First solution
        </Title>
        <Paragraph>
            Description of first solution.
        </Paragraph>
    </PageContainer>
);

export default MySolutions;
