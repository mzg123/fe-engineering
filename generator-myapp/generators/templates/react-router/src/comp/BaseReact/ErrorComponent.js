import React from 'react';
import BaseComponent from './BaseComponent';

class ErrorComponent extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            msg: '',
        };
    }

    componentDidCatch(error, info) {
        this.setState({
            hasError: true,
            msg: error.toString(),
        });
        console.log(info);
    }

    render() {
        if (this.state.hasError) {
            return <h1>{this.state.msg}</h1>;
        }
        return this.props.children;
    }
}


export default ErrorComponent;
