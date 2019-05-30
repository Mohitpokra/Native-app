<template lang="html">
<Page backgroundColor="#d7dfec">
    <TopActionBar :data="actionBar" />
    <ScrollView>
        <StackLayout>
            <CardView backgroundColor="#ffffff">
                <FlexboxLayout class="p-15" justifyContent="space-between">
                    <StackLayout class="m-l-10" @tap="goToFilter">
                        <Label class="date-header vt-align w-900" :text="givenDate"></Label>
                        <Label v-if="comapreBlock" class="compare-date-header vt-align" :text="'vs '+ compareDate"></Label>
                    </StackLayout>
                    <StackLayout orientation="horizontal">
                        <Label class="fas vertical-middle p-5 t-20 fa-sm" :text="`fa-chevron-left` | fonticon" @tap="setPrvFilter" />
                        <Label class="fas vertical-middle p-5 t-20 fa-sm m-l-40" :text="`fa-chevron-right` | fonticon" @tap="setFrwdFilter"/>
                    </StackLayout>
                </FlexboxLayout>
            </CardView>

            <Label row="0" class="m-t-15 m-b-5 m-l-15 h2-light" text="Dashboard" />

                <GridLayout row="auto">
                    <StackLayout row="0">
                        <HomeRevenue />
                    </StackLayout>
                    <ActivityIndicator color="#957f48" rowSpan="1" class="p-10" x borderRadius="50%" :visibility="activityIndicator ? 'visible' : 'collapsed'" height="50" width="50" busy="true"></ActivityIndicator>
                </GridLayout>

                <GridLayout row="auto">
                    <StackLayout row="0">
                        <HomeOrder />
                    </StackLayout>
                    <ActivityIndicator color="#957f48" rowSpan="1" class="p-10" x borderRadius="50%" :visibility="activityIndicator ? 'visible' : 'collapsed'" height="50" width="50" busy="true"></ActivityIndicator>
                </GridLayout>

                <GridLayout row="auto">
                    <StackLayout row="0">
                        <HomeProduct />
                    </StackLayout>
                    <ActivityIndicator color="#957f48" rowSpan="1" class="p-10" borderRadius="50%" :visibility="activityIndicator ? 'visible' : 'collapsed'" height="50" width="50" busy="true"></ActivityIndicator>
                </GridLayout>

                <GridLayout row="auto">
                    <StackLayout row="0">
                        <HomeCustomer />
                    </StackLayout>
                    <ActivityIndicator color="#957f48" rowSpan="1" class="p-10" borderRadius="50%" :visibility="activityIndicator ? 'visible' : 'collapsed'" height="50" width="50" busy="true"></ActivityIndicator>
                </GridLayout>

                <GridLayout row="auto">
                    <StackLayout row="0">
                        <HomeVendor />
                    </StackLayout>
                    <ActivityIndicator color="#957f48" rowSpan="1" class="p-10" borderRadius="50%" :visibility="activityIndicator ? 'visible' : 'collapsed'" height="50" width="50" busy="true"></ActivityIndicator>
                </GridLayout>
        </StackLayout>
    </ScrollView>
</Page>
</template>

<script>
import HomeOrder from '../components/graphs/HomeOrder.vue';
import HomeProduct from '../components/graphs/HomeProduct.vue';
import HomeVendor from '../components/graphs/HomeVendor.vue';
import HomeCustomer from '../components/graphs/HomeCustomer.vue';
import HomeRevenue from '../components/graphs/HomeRevenue.vue'
import Login from './Login';
import sideDrawer from "~/mixins/sideDrawer";
import TopActionBar from "~/components/layout/TopActionBar.vue";
import {
    Feedback,
    FeedbackType,
    FeedbackPosition
} from "nativescript-feedback";
import {
    Color
} from "tns-core-modules/color";
const feedback = new Feedback();
import {
    mapState
} from "vuex";
import {
    FILTER_ERROR,
    FILTER_SUCCESS,
    FILTER_OUTOF_RANGE,
    TOKEN_EXPIRED
} from '../store/message.js';
require("nativescript-ui-chart/vue");
export default {
    mixins: [sideDrawer],
    components: {
        TopActionBar,
        HomeOrder,
        HomeProduct,
        HomeVendor,
        HomeCustomer,
        HomeRevenue
    },
    data() {
        return {
            actionBar: {
                title: "Shakedeal"
            }
        };
    },
    computed: {
        ...mapState({
            state: state => state,
            activityIndicator: state => state.ui.activityIndicator
        }),
        givenDate() {
            if (Math.round(this.$store.state.dashboard.givenDate.date1 / 1000) === Math.round(this.$store.state.dashboard.givenDate.date2 / 1000)) {
                return `${this.$moment(Number(this.$store.state.dashboard.givenDate.date1)).format('YYYY ddd MMM D')}`;
            }
            return `${this.$moment(Number(this.$store.state.dashboard.givenDate.date1)).format('YYYY MMM D')} - ${this.$moment(Number(this.$store.state.dashboard.givenDate.date2)).format('YYYY MMM D')}`;
        },
        compareDate() {
            if (Math.round(this.$store.state.dashboard.compareDate.date1 / 1000) === Math.round(this.$store.state.dashboard.compareDate.date2 / 1000)) {
                return `${this.$moment(Number(this.$store.state.dashboard.compareDate.date1)).format('YYYY ddd MMM D')}`;
            }
            return `${this.$moment(Number(this.$store.state.dashboard.compareDate.date1)).format('YYYY MMM D')} - ${this.$moment(Number(this.$store.state.dashboard.compareDate.date2)).format('YYYY MMM D')}`
        },
        comapreBlock() {
            return this.$store.state.dashboard.compare;
        },
        isAuthenticate() {
            if (this.$store.state.isAuthenticate == false) {
                alert("Your token has been expired, Please login again");
                this.$store.commit("auth/loginFail");
                this.$store.commit("ui/resetIndicator");
                this.$store.commit("ui/resetGesturesEnabled");
                this.$store.comiit("dashboard/resetData");
                this.$store.commit("dashboard/resetDate");
                this.$navigateTo(Login, {
                    transition: {
                        name: "slideTop",
                        curve: "easeIn",
                        duration: 1000
                    }
                });
            }
            return this.$store.state.auth.isAuthenticate;
        }
    },
    mounted() {
        // Condition when login user using token
        if (this.$store.state.auth.token && !this.$store.state.auth.email) {
            this.$store.dispatch('auth/jwtDecoder', this.$store.state.auth.token);
        }

        // set alert
        if (this.$store.state.alert.successMessage) {
            this.$store.commit('ui/setIndicator');
            this.showSuccessPopUp(this.$store.state.alert.successMessage);
        }

        // fetch data
        this.$store.commit('ui/setIndicator');
        this.$store.dispatch("dashboard/fetchGivenDateData").then(resp => {
            this.$store.dispatch("dashboard/fetchCompareDateData").then(resp => {
                this.$store.commit('ui/resetIndicator');
            })
        })
    },
    methods: {
        setPrvFilter() {
            let payload = {
                selectedDate: {
                    start: null,
                    end: null
                },
                selectedCompareDate: {
                    start: null,
                    end: null
                }
            }
            let diff = Number(this.$moment(this.$store.state.dashboard.givenDate.date2).diff(this.$moment(this.$store.state.dashboard.givenDate.date1), 'days')) + 1;
            if (this.$store.state.dashboard.isMonthlyFilter) {
                //Condtion when monthly filter (only when this month and previous month condition is on) is active
                payload.selectedDate.start = +this.$moment(Number((this.$store.state.dashboard.givenDate.date1))).subtract(1, 'M');
                payload.selectedDate.end = +this.$moment(Number((this.$store.state.dashboard.givenDate.date1))).subtract(1, 'd');

                //Condition when user will search data beyond current date.
                if (payload.selectedDate.end > +this.$moment() && payload.selectedDate.start < +this.$moment()) {
                    payload.selectedDate.end = +this.$moment();
                }
                payload.selectedCompareDate.start = +this.$moment(Number((this.$store.state.dashboard.compareDate.date1))).subtract(1, 'd').startOf('month');
                payload.selectedCompareDate.end = +this.$moment(Number((this.$store.state.dashboard.compareDate.date1))).subtract(1, 'd');

            } else if (this.$store.state.dashboard.isWeeklyFilter) {

                //Condtion when Weekly filter (only when this week and previous Week condition is on) is active
                payload.selectedDate.start = +this.$moment(Number((this.$store.state.dashboard.givenDate.date1))).subtract(1, 'w');
                payload.selectedDate.end = +this.$moment(Number((this.$store.state.dashboard.givenDate.date1))).subtract(1, 'd');

                if (payload.selectedDate.end > +this.$moment() && payload.selectedDate.start < +this.$moment()) {
                    payload.selectedDate.end = +this.$moment();
                }

                payload.selectedCompareDate.start = +this.$moment(Number((this.$store.state.dashboard.compareDate.date1))).subtract(1, 'w');
                payload.selectedCompareDate.end = +this.$moment(Number((this.$store.state.dashboard.compareDate.date1))).subtract(1, 'd');

            } else if (diff < 1) {

                //Condtion when day filter (only when this day and day Week condition is on) is active
                payload.selectedDate.start = +this.$moment(Number((this.$store.state.dashboard.givenDate.date1))).subtract(1, 'd');
                payload.selectedDate.end = +this.$moment(Number((this.$store.state.dashboard.givenDate.date2))).subtract(1, 'd');
                payload.selectedCompareDate.start = +this.$moment(Number((this.$store.state.dashboard.compareDate.date1))).subtract(1, 'd');
                payload.selectedCompareDate.end = +this.$moment(Number((this.$store.state.dashboard.compareDate.date2))).subtract(1, 'd');
            } else {

                // condition for custom filter
                payload.selectedDate.start = +this.$moment(Number((this.$store.state.dashboard.givenDate.date1))).subtract(Number(diff), 'd');
                payload.selectedDate.end = +this.$moment(Number((this.$store.state.dashboard.givenDate.date1))).subtract(1, 'd');
                payload.selectedCompareDate.start = +this.$moment(Number((this.$store.state.dashboard.compareDate.date1))).subtract(Number(diff), 'd');
                payload.selectedCompareDate.end = +this.$moment(Number((this.$store.state.dashboard.compareDate.date1))).subtract(1, 'd');
            }

            // Show error when user want to show data or future date
            if (payload.selectedDate.end > +this.$moment() || payload.selectedCompareDate.end > +this.$moment) {
                feedback.error({
                    title: "Error",
                    message: FILTER_OUTOF_RANGE
                });
                return;
            }

            // commit and fetch data for selected period
            this.$store.commit('dashboard/setFilterDate', payload);
            this.$store.commit('dashboard/resetData');
            this.$store.commit('ui/setIndicator');
            this.$store.dispatch("dashboard/fetchGivenDateData").then(resp => {
                this.$store.dispatch("dashboard/fetchCompareDateData").then(resp => {
                    this.$store.commit('ui/resetIndicator');
                })
            })

        },
        setFrwdFilter() {
            let payload = {
                selectedDate: {
                    start: null,
                    end: null
                },
                selectedCompareDate: {
                    start: null,
                    end: null
                }
            }
            let diff = Number(this.$moment(this.$store.state.dashboard.givenDate.date2).diff(this.$moment(this.$store.state.dashboard.givenDate.date1), 'days')) + 1;
            if (this.$store.state.dashboard.isMonthlyFilter) {
                payload.selectedDate.start = +this.$moment(Number((this.$store.state.dashboard.givenDate.date2))).add(1, 'd');
                payload.selectedDate.end = +this.$moment(Number((this.$store.state.dashboard.givenDate.date2))).add(1, 'd').endOf('month');
                if (payload.selectedDate.end > +this.$moment() && payload.selectedDate.start < +this.$moment()) {
                    payload.selectedDate.end = +this.$moment();
                }
                payload.selectedCompareDate.start = +this.$moment(Number((this.$store.state.dashboard.compareDate.date2))).add(1, 'd');
                payload.selectedCompareDate.end = +this.$moment(Number((this.$store.state.dashboard.compareDate.date2))).add(1, 'd').endOf('month');
                if (payload.selectedCompareDate.end > +this.$moment().subtract(1, 'y')) {
                    payload.selectedCompareDate.end = +this.$moment().subtract(1, 'y');
                }
            } else if (this.$store.state.dashboard.isWeeklyFilter) {
                payload.selectedDate.start = +this.$moment(Number((this.$store.state.dashboard.givenDate.date2))).add(1, 'd');
                payload.selectedDate.end = +this.$moment(Number((this.$store.state.dashboard.givenDate.date2))).add(1, 'w');

                if (payload.selectedDate.end > +this.$moment() && payload.selectedDate.start < +this.$moment()) {
                    payload.selectedDate.end = +this.$moment();
                }

                payload.selectedCompareDate.start = +this.$moment(Number((this.$store.state.dashboard.compareDate.date2))).add(1, 'd');
                payload.selectedCompareDate.end = +this.$moment(Number((this.$store.state.dashboard.compareDate.date2))).add(1, 'w');

                if (payload.selectedCompareDate.end > +this.$moment().subtract(1, 'y')) {
                    payload.selectedCompareDate.end = +this.$moment().subtract(1, 'y');
                }

            } else if (diff < 1) {
                payload.selectedDate.start = +this.$moment(Number((this.$store.state.dashboard.givenDate.date1))).add(1, 'd');
                payload.selectedDate.end = +this.$moment(Number((this.$store.state.dashboard.givenDate.date2))).add(1, 'd');
                payload.selectedCompareDate.start = +this.$moment(Number((this.$store.state.dashboard.compareDate.date1))).add(1, 'd');
                payload.selectedCompareDate.end = +this.$moment(Number((this.$store.state.dashboard.compareDate.date2))).add(1, 'd');
            } else {
                payload.selectedDate.start = +this.$moment(Number((this.$store.state.dashboard.givenDate.date2))).add(1, 'd');
                payload.selectedDate.end = +this.$moment(Number((this.$store.state.dashboard.givenDate.date2))).add(Number(diff), 'd');
                payload.selectedCompareDate.start = +this.$moment(Number((this.$store.state.dashboard.compareDate.date2))).add(1, 'd');
                payload.selectedCompareDate.end = +this.$moment(Number((this.$store.state.dashboard.compareDate.date2))).add(Number(diff), 'd');
            }

            if (payload.selectedDate.end > +this.$moment() || payload.selectedCompareDate.end > +this.$moment) {
                feedback.error({
                    title: "Error",
                    message: FILTER_OUTOF_RANGE
                });
                return;
            }
            this.$store.commit('dashboard/setFilterDate', payload);
            this.$store.commit('ui/setIndicator');
            this.$store.dispatch("dashboard/fetchGivenDateData").then(resp => {
                this.$store.dispatch("dashboard/fetchCompareDateData").then(resp => {
                    this.$store.commit('ui/resetIndicator');
                })
            })

        },
        showSuccessPopUp(msg) {
            feedback.success({
                message: msg
            });
        },
        load() {
            this.$store.commit("ui/changeIndicator");
        },
        goToFilter() {
            this.$navigateTo(this.$routes.Filter, {
                transition: {
                    name: "slideLeft",
                    curve: "linear",
                    duration: 600
                }
            });
        }
    }
};
</script>

<style>
.boring {
    border-bottom-color: rgb(216, 216, 216, 0.4);
    border-bottom-width: 1;
}

.date-header {
    font-family: "AvenirNextLTPro";
    font-size: 14;
    font-weight: 900;
    color: #4a4a4a;
}

.compare-date-header {
    font-family: "AvenirNextLTPro";
    font-size: 12;
    font-weight: 300;
    color: #4a4a4a;
}

.vt-align {
    vertical-align: center;
}

.card-heading {
    font-size: 16;
    color: #6c798f;
    font-family: "AvenirNextLTPro";
    font-weight: 900;
}

.card-bg {
    background-color: rgb(216, 216, 216, 0.2);
}

.card-subText {
    font-family: "AvenirNextLTPro";
    font-size: 8px;
    font-weight: 500;
    color: #b4b4b4;
}
</style>
