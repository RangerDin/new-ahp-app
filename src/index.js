import { h, render, Component } from 'preact';

class Clock extends Component {
    render() {
        const time = new Date().toLocaleTimeString();
        return <span>{time}</span>;
    }
}

render(<Clock />, document.body);
