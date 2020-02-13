import { MutationTree, ActionTree, Module } from 'vuex';
import { RootState, AState } from './root-types';

const state: AState = {
    a: 'aaaa',
};

const mutations: MutationTree<AState> = {
    testA(state, payload) {
        state.a = state.a + payload
    }
};

const actions: ActionTree<AState, RootState> = {
    actionA({ dispatch }, params) {
        window.alert('B-action-tree');
        dispatch('A/testA', params, { root: true })
    },
    testA({ dispatch }, params) {
        window.alert('A');
    }
}
const A: Module<AState, RootState> = {
    namespaced: true,
    state,
    mutations,
    actions
}
export default A;
