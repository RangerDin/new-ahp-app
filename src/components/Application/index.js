import { h, Component } from 'preact';
import style from './style.scss';

export default class Clock extends Component {
    constructor() {
        super();
        this.state = {
            date: new Date()
        };
    }

    componentDidMount() {
        setInterval(() => this.setState({ date: new Date() }), 1000);
    }

    render() {
        return (
            <span className={style.application}>
                Time: {this.state.date.toLocaleTimeString()}
            </span>
        );
    }
}
