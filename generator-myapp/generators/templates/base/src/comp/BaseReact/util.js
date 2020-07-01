window.$$BBT_APP_CONTEXT = new Map();
class AppContext {
    static get(key) {
        return window.$$BBT_APP_CONTEXT.get(key);
    }

    static set(key, root) {
        window.$$BBT_APP_CONTEXT.set(key, root);
    }

    static delete(key) {
        return window.$$BBT_APP_CONTEXT.delete(key);
    }
}

class RootManager {
    static getKey() {
        return 'PageRoot';
    }

    static getRoot() {
        return AppContext.get(this.getKey());
    }

    static setRoot(root) {
        AppContext.set(this.getKey(), root);
    }

    static clearRoot() {
        return AppContext.delete(this.getKey());
    }
}

function copyProperties(t, source) {
    const target = t;
    const keys = Reflect.ownKeys(source);
    keys.forEach((key) => {
        if (key !== 'constructor' && key !== 'prototype' && key !== 'name') {
            //const desc = Object.getOwnPropertyDescriptor(source, key);
            //Object.defineProperty(target, key, desc);
            target[key] = source[key].bind(target.constructor);
        }
    });
}

function Mix(target, mixin) {
    const result = target;

    copyProperties(result, mixin);

    return result;
}


export { Mix };
export default RootManager;
