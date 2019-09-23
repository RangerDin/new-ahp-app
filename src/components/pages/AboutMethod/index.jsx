import {h} from 'preact';
import PageContainer from 'components/common/PageContainer';
import PageHeader from 'components/common/PageHeader';
import {TableOfContents} from './components/TableOfContents';
import {Definition} from './components/Definition';
import {Applications} from './components/Applications';
import {Description} from './components/Description';
import {Bibliography} from './components/Bibliography';
import {Example} from './components/Example';
import {useContext} from 'preact/hooks';
import {TranslationContext} from 'utils/translation';

const AboutMethod = () => {
    const {t} = useContext(TranslationContext);

    return (
        <PageContainer>
            <PageHeader>{t('about.title')}</PageHeader>
            <TableOfContents />
            <Definition />
            <Applications />
            <Description />
            <Example />
            <Bibliography />
        </PageContainer>
    );
};

export default AboutMethod;
