
import { orderStatus } from '../../status/order';
import { fullStatus } from '../../status/common';
import { LOGIN_SUCCESS, LOGIN_FAILURE } from "../message.js";
import axios from '~/axios';
import Vue from 'nativescript-vue';
Vue.use(require('vue-moment'));

const state = {
    givenDate: {
        date1: +Vue.moment(),
        date2: +Vue.moment()
    },
    isMonthlyFilter: false,
    isWeeklyFilter: false,
    compare: true,
    compareDate: {
        date1: +Vue.moment().subtract(1, 'd'),
        date2: +Vue.moment().subtract(1, 'd'),
    },
    order: { ...orderStatus },
    product: {
        active: 0,
        hidden: 0,
        disable: 0,
        categories: 0
    },
    vendor: {
        active: 0,
        disable: 0,
        hidden: 0
    },
    customer: {
        active: 0,
        disable: 0,
        hidden: 0,
    },
    comparePeriodOrder: {
        ...orderStatus
    },
    comparePeriodProduct: {
        active: 0,
        hidden: 0,
        disable: 0,
        categories: 0
    },
    comparePeriodVendor: {
        active: 0,
        hidden: 0,
        disable: 0,
    },
    comparePeriodCustomer: {
        active: 0,
        hidden: 0,
        disable: 0,
    },
    totalProduct: {
        total: 0,
        active: 0,
        hidden: 0,
        disable: 0,
        categories: 0
    },
    totalVendor: {
        active: 0,
        disable: 0,
        hidden: 0
    },
    totalCustomer: {
        active: 0,
        disable: 0,
        hidden: 0
    },
    orderPieGraphData: [],
    totalVendorPieGraphData: [],
    totalProductPieGraphData: [],
    totalCustomerPieGraphData: [],
    productPieGraphData: [],
    customerPieGraphData: [],
    vendorPieGraphData: [],
    compareOrderPieGraphData: [],
    compareVendorPieGraphData: [],
    compareProductPieGraphData: [],
    compareCustomerPieGraphData: []
}

const getters = {

}


const mutations = {

    setMonthFilter(state, value) {
        state.isMonthlyFilter = value;
    },
    setWeekFilter(state, value){
        state.isWeeklyFilter = value;
    },
    setCompareFilter(state, payload) {
        state.compare = payload.compare;
    },
    setFilterDate(state, payload) {
        console.log("I am changign the date", payload);
        state.givenDate.date1 = payload.selectedDate.start;
        state.givenDate.date2 = payload.selectedDate.end;

        state.compareDate.date1 = payload.selectedCompareDate.start;
        state.compareDate.date2 = payload.selectedCompareDate.end;
    },
    setOrderStatus(state, payload) {
        if (payload.length === 0) {
            state.orderPieGraphData = categorizedOrderGraphData(state.order);
            return;
        }
        let total = 0;
        for (let status of payload) {
            let key = status.description.toLowerCase().replace(/\s/g, '');
            state.order[key] = status.count || 0;
            total = total + state.order[key]
        }
        let graphData = categorizedOrderGraphData(state.order);
        state.orderPieGraphData = graphData;
        state.order['total'] = total;
        // let total = 0;
        // let graphData = [];
        // for (let status of payload) {
        //     let key = status.description.toLowerCase().replace(/\s/g, '');
        //     total = total + status.count;
        //     if (status.count > 0) {
        //         let obj = {};
        //         obj.status = status.description;
        //         obj.count = Number(status.count);
        //         obj.title = `${status.description} ${status.count}`;
        //         graphData.push(obj);
        //     }
        //     state.order[key] = status.count;
        // }
        // state.orderPieGraphData = graphData;
        // state.order['total'] = total;
    },
    setProduct(state, payload) {
        state.product.active = payload.active || state.product.active;
        state.product.hidden = payload.hidden || state.product.hidden;
        state.product.disable = payload.disable || state.product.disable;
        state.product.categories = payload.categories || state.product.categories;

        if (!state.product.active && !state.product.hidden && !state.product.disable) {
            state.productPieGraphData = [];
            return;
        }

        let graph = [{
            status: 'Active',
            count: Number(state.product.active),
            title: `Active ${Number(state.product.active)}`

        },
        {
            status: 'Disable',
            count: Number(state.product.disable),
            title: `Disable ${Number(state.product.disable)}`

        },
        {
            status: 'Hidden',
            count: Number(state.product.hidden),
            title: `Hidden ${Number(state.product.hidden)}`

        }];

        state.productPieGraphData = graph;

    },
    setVendor(sate, payload) {
        if (payload.length === 0) {
            state.vendorPieGraphData = [];
            return;
        }
        let graphData = [];
        for (let obj of payload) {
            let key = fullStatus(obj.status);
            state.vendor[key] = obj.count || 0;
        }
        for (let key in state.vendor) {
            let data = {};
            data.status = key.charAt(0).toUpperCase() + key.slice(1);
            data.count = Number(state.vendor[key]);
            data.title = `${data.status} ${data.count}`;
            graphData.push(data);
        }
        state.vendorPieGraphData = graphData;
    },
    setCustomer(state, payload) {
        if (payload.length === 0) {
            state.customerPieGraphData = [];
            return;
        }
        let graphData = [];
        for (let obj of payload) {
            let key = fullStatus(obj.status);
            state.customer[key] = obj.count || 0;
        }
        for (let key in state.customer) {
            let data = {};
            data.status = key.charAt(0).toUpperCase() + key.slice(1);
            data.count = Number(state.customer[key]);
            data.title = `${data.status} ${data.count}`;
            graphData.push(data);
        }
        state.customerPieGraphData = graphData;
        // for (let obj of payload) {
        //     let key = fullStatus(obj.status);
        //     state.customer[key] = obj.count;
        // }
    },
    setTotalProduct(state, payload) {
        state.totalProduct.total = payload.total || 0;
        state.totalProduct.active = payload.active || 0;
        state.totalProduct.hidden = payload.hidden || 0;
        state.totalProduct.disable = payload.disable || 0;
        state.totalProduct.categories = payload.categories || 0;

        if (!state.totalProduct.total && !state.totalProduct.active && !state.totalProduct.hidden && !state.totalProduct.disable) {
            state.totalProductPieGraphData = graph;
            return;
        }

        let graph = [{
            status: 'Active',
            count: Number(payload.active),
            title: `Active ${Number(payload.active)}`

        },
        {
            status: 'Disable',
            count: Number(payload.disable),
            title: `Disable ${Number(payload.disable)}`

        },
        {
            status: 'Hidden',
            count: Number(payload.hidden),
            title: `Hidden ${Number(payload.hidden)}`

        }];

        state.totalProductPieGraphData = graph;

    },
    setTotalVendor(state, payload) {
        if (payload.length === 0) {
            state.totalVendorPieGraphData = [];
            return;
        }
        let graphData = [];
        for (let obj of payload) {
            let key = fullStatus(obj.status);
            state.totalVendor[key] = obj.count || 0;
        }
        for (let key in state.totalVendor) {
            let data = {};
            data.status = key.charAt(0).toUpperCase() + key.slice(1);
            data.count = Number(state.totalVendor[key]);
            data.title = `${data.status} ${data.count}`
            graphData.push(data);
        }
        state.totalVendorPieGraphData = graphData;
    },
    setTotalCustomer(state, payload) {
        if (payload.length === 0) {
            state.totalCustomerPieGraphData = [];
            return;
        }
        let graphData = [];
        for (let obj of payload) {
            let key = fullStatus(obj.status);
            state.totalCustomer[key] = obj.count || 0;
        }
        for (let key in state.totalCustomer) {
            let data = {};
            data.status = key.charAt(0).toUpperCase() + key.slice(1);
            data.count = Number(state.totalCustomer[key]);
            data.title = `${data.status} ${data.count}`
            graphData.push(data);
        }
        state.totalCustomerPieGraphData = graphData;
    },

    setCompareOrderStatus(state, payload) {

        if (payload.length === 0) {
            state.compareOrderPieGraphData = [];
            return;
        }
        let total = 0;
        for (let status of payload) {
            let key = status.description.toLowerCase().replace(/\s/g, '');
            state.comparePeriodOrder[key] = status.count || 0;
            total = total + state.comparePeriodOrder[key]
        }
        let graphData = categorizedOrderGraphData(state.comparePeriodOrder);
        state.compareOrderPieGraphData = graphData;
        state.comparePeriodOrder['total'] = total;

        // let total = 0;
        // let graphData = [];
        // for (let status of payload) {
        //     let key = status.description.toLowerCase().replace(/\s/g, '');
        //     total = total + status.count;
        //     if (status.count > 0) {
        //         let obj = {};
        //         obj.status = status.description;
        //         obj.count = Number(status.count);
        //         obj.title = `${status.description} ${status.count}`;
        //         graphData.push(obj);
        //     }
        //     state.comparePeriodOrder[key] = status.count;
        // }
        // state.compareOrderPieGraphData = graphData;
        // state.comparePeriodOrder['total'] = total;
    },

    setComparePeriodProduct(state, payload) {
        state.comparePeriodProduct.active = payload.active || state.comparePeriodProduct.active;
        state.comparePeriodProduct.hidden = payload.hidden || state.comparePeriodProduct.hidden;
        state.comparePeriodProduct.disable = payload.disable || state.comparePeriodProduct.disable;
        state.comparePeriodProduct.categories = payload.categories || state.comparePeriodProduct.categories;


        if (!state.comparePeriodProduct.active && !state.comparePeriodProduct.hidden && !state.comparePeriodProduct.disable) {
            state.compareProductPieGraphData = graph;
            return;
        }

        let graph = [{
            status: 'Active',
            count: Number(state.comparePeriodProduct.active),
            title: `Active ${Number(state.comparePeriodProduct.active)}`

        },
        {
            status: 'Disable',
            count: Number(state.comparePeriodProduct.disable),
            title: `Disable ${Number(state.comparePeriodProduct.disable)}`

        },
        {
            status: 'Hidden',
            count: Number(state.comparePeriodProduct.hidden),
            title: `Hidden ${Number(state.comparePeriodProduct.hidden)}`

        }];

        state.compareProductPieGraphData = graph;

    },
    setComparePeriodCustomer(state, payload) {

        if (payload.length === 0) {
            state.compareCustomerPieGraphData = [];
            return;
        }
        let graphData = [];
        for (let obj of payload) {
            let key = fullStatus(obj.status);
            state.comparePeriodCustomer[key] = obj.count || 0;
        }
        for (let key in state.comparePeriodCustomer) {
            let data = {};
            data.status = key.charAt(0).toUpperCase() + key.slice(1);
            data.count = Number(state.comparePeriodCustomer[key]);
            data.title = `${data.status} ${data.count}`
            graphData.push(data);
        }
        state.compareCustomerPieGraphData = graphData;
        // for (let obj of payload) {
        //     let key = fullStatus(obj.status);
        //     state.comparePeriodCustomer[key] = obj.count;
        // }

    },
    setComparePeriodVendor(state, payload) {
        if (payload.length === 0) {
            state.compareVendorPieGraphData = [];
            return;
        }
        let graphData = [];
        for (let obj of payload) {
            let key = fullStatus(obj.status);
            state.comparePeriodVendor[key] = obj.count || 0;
        }
        for (let key in state.comparePeriodVendor) {
            let data = {};
            data.status = key.charAt(0).toUpperCase() + key.slice(1);
            data.count = Number(state.comparePeriodVendor[key]);
            data.title = `${data.status} ${data.count}`
            graphData.push(data);
        }
        state.compareVendorPieGraphData = graphData;
    },
    resetData(state) {

        state.order = { ...orderStatus },
        state.product = resetproperties();
        state.customer = resetproperties();
        state.vendor = resetproperties();
        state.totalCustomer = resetproperties();
        state.totalProduct = resetproperties();
        state.totalVendor = resetproperties();
        state.comparePeriodOrder = { ...orderStatus };
        state.comparePeriodProduct = resetproperties();
        state.comparePeriodCustomer = resetproperties();
        state.comparePeriodVendor = resetproperties();
        state.orderPieGraphData = [];
        state.totalVendorPieGraphData = [];
        state.totalProductPieGraphData = [];
        state.totalCustomerPieGraphData = [];
        state.productPieGraphData = [];
        state.customerPieGraphData = [];
        state.vendorPieGraphData = [];
        state.compareOrderPieGraphData = [];
        state.compareVendorPieGraphData = [];
        state.compareProductPieGraphData = [];
        state.compareCustomerPieGraphData = [];
    }

}

function resetproperties() {
    return {
        active: 0,
        hidden: 0,
        disable: 0
    }
}

function categorizedOrderGraphData(order) {

    let cancelledOrder = Number(order.declined) + Number(order.failed) + Number(order.cancelled) + Number(order.cancelrequest);
    let openOrder = Number(order.backordered) + Number(order.open) + Number(order.awaitingcall) + Number(order.paymentpending);
    let returnOrder = Number(order.returned) + Number(order.rto);
    let processing = Number(order.processed) + Number(order.intransit) + Number(order.manifest);
    let completed = Number(order.complete);

    let graphData = [];

    if (!cancelledOrder && !openOrder && !returnOrder && !processing && !completed) {
        return graphData;
    }

    graphData = [{
        status: 'Cancelled',
        count: cancelledOrder,
        title: `Active ${cancelledOrder}`

    },
    {
        status: 'Open',
        count: openOrder,
        title: `Open ${openOrder}`

    },
    {
        status: 'Returned',
        count: returnOrder,
        title: `Returned ${returnOrder}`

    },
    {
        status: 'Processing',
        count: processing,
        title: `Processing ${processing}`

    },
    {
        status: 'Completed',
        count: completed,
        title: `Completed ${completed}`

    }];

    return graphData;

}

function defaultPieGraphStructure(data) {
    let graphData = [];
    for (let key in data) {
        let obj = {
            status: key.charAt(0).toUpperCase() + key.slice(1),
            count: 0,
            title: key.charAt(0).toUpperCase() + key.slice(1) + ' 0'
        }
        graphData.push(obj);
    }
    return graphData;
}

const actions = {
    async fetchGivenDateData({ dispatch, commit, state, rootstate }) {
        commit('resetData');
        await axios.get("/api/v1/graphs/data_points", { params: state.givenDate }).then(resp => {
            let data = resp.data;
            console.log("******************", data);
            commit('setOrderStatus', data.order);
            commit('setProduct', data.product[0]);
            commit('setVendor', data.vendor);
            commit('setCustomer', data.customer);
            commit('setTotalProduct', data.totalProduct[0]);
            commit('setTotalVendor', data.totalVendor);
            commit('setTotalCustomer', data.totalCustomer);
        }).catch(err => {
            let msg = errorMessage(error.response.data);
            commit('ui/resetIndicator', null, { root: true });
            commit('auth/loginFail', null, { root: true });
            commit('alert/error', msg, { root: true });
        })
    },
    fetchCompareDateData({ dispatch, commit, state, rootstate }) {
        if (state.compare) {
            axios.get("/api/v1/graphs/compare/data_points").then(resp => {
                let data = resp.data;
                commit('setCompareOrderStatus', data.order);
                commit('setComparePeriodProduct', data.product[0]);
                commit('setComparePeriodVendor', data.vendor);
                commit('setComparePeriodCustomer', data.customer);
            }).catch(error => {
                let msg = errorMessage(error.response.data);
                commit('alert/error', msg, { root: true });
                commit('ui/resetIndicator', null, { root: true });
                commit('auth/loginFail', null, { root: true });
            })
        }
    }

}

export const dashboard = {
    namespaced: true,
    state,
    actions,
    mutations
}