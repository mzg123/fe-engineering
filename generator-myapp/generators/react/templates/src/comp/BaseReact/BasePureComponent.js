import React from 'react';
import PubSub from '../PubSub/PubSub';
import RootManager from './util';
// import PropTypes from 'prop-types';
// import AC from '../appContext/appContext';


class BasePureComponent extends React.PureComponent {
    getProps() {
        return this.props;
    }

    getPubSub() {
        if (!this.pubsub) {
            this.pubsub = PubSub;
        }
        return this.pubsub;
    }

    getBBTNative() {
        return window.bbtNative || {};
    }

    getState() {
        return this.state;
    }

    /* getRefs() {
        return this["refs"];
    } */

    // root不保证一定有
    getRoot() {
        // if (this.props.root) {
        //    return this.props.root;
        // }
        return RootManager.getRoot();
    }

    setRoot() {
        RootManager.setRoot(this);
    }

    setRootState(state, cb) {
        if (!this.getRoot()) {
            throw new Error('root is not defined!');
        }
        this.getRoot().setState(state, cb);
    }

    getRootState() {
        if (!this.getRoot()) {
            // throw new Error('root is not defined!');
            return null;
        }
        return this.getRoot().state;
    }

    getRootProps() {
        if (!this.getRoot()) {
            // throw new Error('root is not defined!');
            return null;
        }

        return this.getRoot().props;
    }

    /* getRootRefs() {
        if (!this.getRoot()) {
            // throw new Error('root is not defined!');
            return null;
        }

        return this.getRoot().refs;
    } */

    getRootObj() {
        if (!this.getRoot()) {
            // throw new Error('root is not defined!');
            return null;
        }

        return this.getRoot().obj;
    }

    clearRoot(root) {
        if (root === this) {
            return RootManager.clearRoot();
        }
        return false;
    }
}

export default BasePureComponent;
