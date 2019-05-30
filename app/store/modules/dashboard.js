
import { orderStatus } from '../../status/order';
import { fullStatus } from '../../status/common';
import { LOGIN_SUCCESS, LOGIN_FAILURE } from "../message.js";
import axios from '~/axios';
import Vue from 'nativescript-vue';
import { stat } from 'fs';
Vue.use(require('vue-moment'));

const state = {
    givenDate: {
        date1: +Vue.moment(),
        date2: +Vue.moment()
    },
    totalRevenue: 0,
    comparePeriodRevenue: 0,
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
        disable: 0
    },
    category: {
        total: 0
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
    comparePeriodCategory: {
        total: 0
    },
    comparePeriodOrder: {
        ...orderStatus
    },
    comparePeriodProduct: {
        active: 0,
        hidden: 0,
        disable: 0
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
    totalCategory: {
        total: 0
    },
    totalProduct: {
        active: 0,
        hidden: 0,
        disable: 0,
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

const mutations = {
    resetDate(state) {
        state.givenDate.date1 = +Vue.moment();
        state.givenDate.date2 = +Vue.moment();
        state.compareDate.date1 = +Vue.moment().subtract(1, 'd');
        state.compareDate.date2 = +Vue.moment().subtract(1, 'd');
    },
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
    },
    setCategory(state, payload) {
        state.category.total = payload.total;
    },
    setProduct(state, payload) {
        if (payload.length === 0) {
            state.productPieGraphData = [];
            return;
        }
        let graphData = [];
        for (let obj of payload) {
            let key = fullStatus(obj.status);
            state.product[key] = obj.count || 0;
        }
        for (let key in state.product) {
            let data = {};
            data.status = key.charAt(0).toUpperCase() + key.slice(1);
            data.count = Number(state.product[key]);
            data.title = `${data.status} ${data.count}`;
            graphData.push(data);
        }
        state.productPieGraphData = graphData;
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
    },
    setTotalCategory(state, payload) {
       state.totalCategory.total = payload.total;
    },
    setTotalProduct(state, payload) {
        if (payload.length === 0) {
            state.totalProductPieGraphData = [];
            return;
        }
        let graphData = [];
        for (let obj of payload) {
            let key = fullStatus(obj.status);
            state.totalProduct[key] = obj.count || 0;
        }
        for (let key in state.totalProduct) {
            let data = {};
            data.status = key.charAt(0).toUpperCase() + key.slice(1);
            data.count = Number(state.totalProduct[key]);
            data.title = `${data.status} ${data.count}`;
            graphData.push(data);
        }
        state.totalProductPieGraphData = graphData;
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
    setTotalRevenue(state, payload) {
        state.totalRevenue = payload.total;
    },
    setComparePeriodCategory(state, payload) {
        state.comparePeriodCategory.total = payload.total;
    },
    setComparePeriodRevenue(state, payload) {
        state.comparePeriodRevenue = payload.total || 0;
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
    },

    setComparePeriodProduct(state, payload) {

        if (payload.length === 0) {
            state.compareProductPieGraphData = [];
            return;
        }
        let graphData = [];
        for (let obj of payload) {
            let key = fullStatus(obj.status);
            state.comparePeriodProduct[key] = obj.count || 0;
        }
        for (let key in state.comparePeriodProduct) {
            let data = {};
            data.status = key.charAt(0).toUpperCase() + key.slice(1);
            data.count = Number(state.comparePeriodProduct[key]);
            data.title = `${data.status} ${data.count}`;
            graphData.push(data);
        }
        state.compareProductPieGraphData = graphData;

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
        state.category.total = 0;
        state.customer = resetproperties();
        state.vendor = resetproperties();
        state.totalCategory.total = 0;
        state.totalCustomer = resetproperties();
        state.totalProduct = resetproperties();
        state.totalVendor = resetproperties();
        state.comparePeriodCategory.total = 0;
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
            commit('setOrderStatus', data.order);
            commit('setProduct', data.product);
            commit('setVendor', data.vendor);
            commit('setCategory', data.categories[0]);
            commit('setCustomer', data.customer);
            commit('setTotalRevenue', data.totalRevenue[0]);
            commit('setTotalCategory', data.totalCategories[0]);
            commit('setTotalProduct', data.totalProduct);
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
                commit('setComparePeriodRevenue', data.totalRevenue[0]);
                commit('setComparePeriodCategory', data.categories[0])
                commit('setComparePeriodProduct', data.product);
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