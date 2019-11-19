import React from 'react';
import ReactDOM from 'react-dom';
import BaseComponent from '@BaseComponent';
import './Index.scss';

class Example extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                Hello Word!
            </div>
        );
    }
}
ReactDOM.render((
    <Example />
), document.getElementById('root'));
