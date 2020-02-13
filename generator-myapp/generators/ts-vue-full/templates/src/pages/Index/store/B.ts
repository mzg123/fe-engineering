import { MutationTree, ActionTree, Module } from 'vuex';
import { RootState, BState } from './root-types';

const state: BState = {
    b: 'bbbb',
};

const mutations: MutationTree<BState> = {
    testB(state, payload) {
        window.alert(payload);
        state.b = state.b + payload
    }
};

const actions: ActionTree<BState, RootState> = {
    actionB({ dispatch }, params) {
        window.alert('B-action-tree');
        dispatch('A/testA', params, { root: true })
    }
}
const B: Module<BState, RootState> = {
    namespaced: true,
    state,
    mutations,
    actions
}
export default B;
