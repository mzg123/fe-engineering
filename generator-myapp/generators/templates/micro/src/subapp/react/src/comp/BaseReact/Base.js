import PubSub from '../PubSub/PubSub';
import RootManager from './util';

const Base = {
    getProps: () => this.props,

    getPubSub: () => {
        if (!this.pubsub) {
            this.pubsub = PubSub;
        }
        return this.pubsub;
    },

    getBBTNative: () => window.bbtNative || {},

    getState: () => this.state,
    /* getRefs() {
        return this["refs"];
    } */

    // root不保证一定有
    getRoot: () => RootManager.getRoot(),

    setRoot: () => {
        RootManager.setRoot(this);
    },

    setRootState: (state, cb) => {
        if (!this.getRoot()) {
            throw new Error('root is not defined!');
        }
        this.getRoot().setState(state, cb);
    },

    getRootState: () => {
        if (!this.getRoot()) {
            // throw new Error('root is not defined!');
            return null;
        }
        return this.getRoot().state;
    },

    getRootProps: () => {
        if (!this.getRoot()) {
            // throw new Error('root is not defined!');
            return null;
        }

        return this.getRoot().props;
    },

    /* getRootRefs() {
        if (!this.getRoot()) {
            // throw new Error('root is not defined!');
            return null;
        }

        return this.getRoot().refs;
    } */

    getRootObj: () => {
        if (!this.getRoot()) {
            // throw new Error('root is not defined!');
            return null;
        }

        return this.getRoot().obj;
    },

    clearRoot: (root) => {
        if (root === this) {
            return RootManager.clearRoot();
        }
        return false;
    },
};

export default Base;
