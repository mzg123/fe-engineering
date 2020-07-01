import React from 'react';
import axios from 'axios';
import BaseComponent from '@BaseComponent';

export default class Example extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            txt: 123,
        };
    }

    click() {
        this.setState({
            txt: `${this.state.txt}dd`,
        });
        axios.get('/admin/talent_grow/growth_value_list?page=1&pagesize=20&uid=u130347417', {
            credentials: 'include',
        }).then((response) => {
            console.log(response, 9999);
        });
    }

    render() {
        return (
            <div
                onClick={() => { this.click(); }}
            >
                {
                    this.state.txt
                }
            </div>
        );
    }
}
