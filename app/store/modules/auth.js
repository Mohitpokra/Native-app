import axios from '~/axios';
import { setAuthToken } from '~/axios'
import * as appSettings from 'tns-core-modules/application-settings'
import jwtDecode from 'jwt-decode';
import { LOGIN_SUCCESS, LOGIN_FAILURE } from '../message';

const state = {
    isAuthenticate: false,
    firstName: null,
    email: null,
    token: appSettings.getString('token') || null,
    rememberMeCookies: appSettings.getBoolean('rememberMeCookies') || false
}

const getters = {
    currentUser: (state) => {
        let user = {
            name: state.firstName,
            email: state.email
        };
        return user;
    }
}

const mutations = {
    loginSuccess(state, payload) {
        state.isAuthenticate = true;
        state.firstName = String(payload.firstname || null);
        state.email = String(payload.email || null);
        state.token = String(payload.token || null);
        appSettings.setString('token', payload.token || null);
        appSettings.setBoolean('rememberMe', true);
    },
    loginFail(state) {
        state.isAuthenticate = false;
        state.firstName = null;
        state.email = null;
        setAuthToken.token = null;
        appSettings.setString('token', "");
        appSettings.setBoolean('rememberMeCookies', false);
    }
}

const actions = {
    jwtDecoder({dispatch, commit}, token) {
        let data = jwtDecode(token);
        data.token = token;
        commit('loginSuccess', data)
    },
    async login({ dispatch, commit, state, rootState }, payload) {
        commit('alert/clean', null, { root: true });
        await axios.post("/api/v1/customers/login", payload)
            .then(resp => {
                let data = jwtDecode(resp.data);
                data.token = resp.data;
                setAuthToken(data.token)
                commit('loginSuccess', data)
                commit('ui/resetIndicator', null, { root: true });
                commit('alert/success', LOGIN_SUCCESS, { root: true });
            })
            .catch(error => {
                commit('loginFail');
                let msg = errorMessage(error.response.data);
                commit('alert/error', msg, { root: true });
                commit('ui/resetIndicator', null, { root: true });
            })
    }
}

function errorMessage(data) {
    if (data.message) {
        return data.message;
    }
    return `"${Object.keys(data).join(' ')} valid value is required"`;
}

export const auth = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}