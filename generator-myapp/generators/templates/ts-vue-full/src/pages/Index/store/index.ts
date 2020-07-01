import Vue from 'vue';
import Vuex, { StoreOptions, ActionTree, MutationTree } from 'vuex';
import { RootState } from './root-types';
import A from './A';
import B from './B';

Vue.use(Vuex);

const mutations: MutationTree<RootState> = {
    rootTest(state, payload) {
        state.root = state.root + payload;
    }
};
const state: RootState = {
    root: 'root9009',
};
const actions: ActionTree<RootState, RootState> = {
    ajaxRootTest(context, param) {
        return new Promise((resolve) => {
            context.commit('rootTest', 'ajaxRootTest');
            resolve(context.state.root);
        })
    }
};
const store: StoreOptions<RootState> = {
    state,
    mutations,
    actions,
    modules: {
        A,
        B,
    }
}

export default new Vuex.Store<RootState>(store);
