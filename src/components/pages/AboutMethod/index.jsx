import {h} from 'preact';
import PageContainer from 'components/common/PageContainer';
import PageHeader from 'components/common/PageHeader';
import {TableOfContents} from './components/TableOfContents';
import {Definition} from './components/Definition';
import {Applications} from './components/Applications';
import {Description} from './components/Description';
import {Bibliography} from './components/Bibliography';
import {Example} from './components/Example';

const AboutMethod = () => (
    <PageContainer>
        <PageHeader>About method</PageHeader>
        <TableOfContents />
        <Definition />
        <Applications />
        <Description />
        <Example />
        <Bibliography />
    </PageContainer>
);

export default AboutMethod;
