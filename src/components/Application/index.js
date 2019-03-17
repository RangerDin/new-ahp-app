import {h, Component} from 'preact';

import Header from 'components/Header';

export default class Clock extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <Header />
            </div>
        );
    }
}
