import {h} from 'preact';

import PageContainer from 'components/common/PageContainer';
import Header from './components/Header';
import MethodDescription from './components/MethodDescription';
import Question from './components/Question';
import Description from './components/Description';

const Home = () => (
    <PageContainer>
        <Header />
        <MethodDescription />
        <Question />
        <Description />
    </PageContainer>
);

export default Home;
