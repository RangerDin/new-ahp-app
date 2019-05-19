import {h} from 'preact';

import PageContainer from 'components/common/PageContainer';
import Header from './components/Header';
import MethodDescription from './components/MethodDescription';
import Question from './components/Question';
import Description from './components/Description';
import NameInputs from './components/NameInputs';

const Home = () => (
    <PageContainer>
        <Header />
        <MethodDescription />
        <Question />
        <Description />
        <NameInputs
            labelText='Enter the names of the objects you want to compare.'
            inputPlaceholder='Name of object'
            addButtonText='Add object'
        />
        <NameInputs
            labelText='Enter the names of the parameters by which you want to compare the objects.'
            inputPlaceholder='Name of parameter'
            addButtonText='Add parameter'
        />
    </PageContainer>
);

export default Home;
