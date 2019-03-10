import { h, render, Component } from 'preact';

class Clock extends Component {
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
        return <span>Time: {this.state.date.toLocaleTimeString()}</span>;
    }
}

let root;

const initialize = () => {
    root = render(<Clock />, document.body, root);
};

initialize();

if (module.hot) {
    module.hot.accept('./', () => requestAnimationFrame(initialize));
}
