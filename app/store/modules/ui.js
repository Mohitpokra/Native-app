const state = {
    activityIndicator: false,
    // gestures Enabled to show sideDrawer Data
    gesturesEnabled: false,
}

const mutations = {
    changeIndicator(state) {
        state.activityIndicator = !state.activityIndicator;
    },
    setIndicator(state) {
        state.activityIndicator = true;
    },
    resetIndicator(state) {
        state.activityIndicator = false;
    },
    setGesturesEnabled(state) {
        state.gesturesEnabled = true;
    },
    resetGesturesEnabled(state) {
        state.gesturesEnabled = false;
    }
}

export const ui = {
    namespaced: true,
    state,
    mutations
}