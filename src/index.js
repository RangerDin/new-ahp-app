import { h, render } from 'preact';

import Application from 'components/Application';

let root;

const initialize = () => {
    root = render(<Application />, document.body, root);
};

initialize();

if (module.hot) {
    module.hot.accept('./', () => requestAnimationFrame(initialize));
}
