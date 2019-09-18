import {h} from 'preact';
import {Paragraph} from '../Paragraph';
import {OL} from '../OL';
import {SectionHeader} from '../SectionHeader';
import {CONTENT_ANCHOR} from '../../constants/contents';
import {BIBLIOGRAPHY_LIST, BIBLIOGRAPHY_ANCHOR_PREFIX} from '../../constants/bibliography';
import {LI} from '../LI';

export const Bibliography = () => (
    <div>
        <SectionHeader anchor={CONTENT_ANCHOR.BIBLIOGRAPHY}>
            Bibliography
        </SectionHeader>
        <Paragraph>
            When creating the site, the following literature was used:
        </Paragraph>
        <OL>
            {BIBLIOGRAPHY_LIST.map((item) => (
                <LI><a id={`${BIBLIOGRAPHY_ANCHOR_PREFIX}${item.order}`} />
                    {item.text}
                </LI>
            ))}
        </OL>
    </div>
);
