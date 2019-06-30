import {h, Fragment} from 'preact';
import {useEffect, useState} from 'preact/hooks';

import Paragraph from 'components/common/Paragraph';
import PageContainer from 'components/common/PageContainer';
import PageHeader from './components/PageHeader';
import Title from './components/Title';

import style from './style.scss';
import {loadAllSolutionsFromLocalhost} from 'utils/saving/localhost';

const MySolutions = () => {
    const [solutions, setSolutions] = useState([]);

    useEffect(() => {
        const savedSolutions = loadAllSolutionsFromLocalhost();

        setSolutions(savedSolutions);
    }, []);

    return (
        <PageContainer>
            <PageHeader />
            {solutions.map((solution) => (
                <Fragment>
                    <Title href={`/solutions/my/${solution.question}`} className={style['my-solutions__title']}>
                        {solution.question}
                    </Title>
                    <Paragraph>
                        {solution.description}
                    </Paragraph>
                </Fragment>
            ))}
        </PageContainer>
    );
};

export default MySolutions;
