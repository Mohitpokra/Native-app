const state = {
    type: null,
    errorMessage: null,
    successMessage: null,
}

const actions = {
    success({ commit }, message) {
        commit('success', message);
    },
    error({ commit }, message) {
        commit('error', message);
    },
    clean({ commit }, message) {
        commit('clear', message)
    }
}

const mutations = {
    success(state, message) {
        state.type = "alert-success";
        state.successMessage = message;
    },
    error(state, message) {
        state.type = "alert-error";
        state.errorMessage = message;
    },
    clean(state) {
        state.type = null;
        state.successMessage = null;
        state.errorMessage = null;
    }
}

export const alert = {
    namespaced: true,
    state,
    actions,
    mutations
}