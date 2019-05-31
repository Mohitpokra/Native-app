<template>
<CardView class="m-15" backgroundColor="#ffffff">
    <FlexboxLayout flexDirection="column" justifyContent="flex-start">
        <StackLayout class="boring p-10">
            <Label class="h3-card" text="Total Revenue"/>
            <ScrollView orientation="horizontal">
                <StackLayout orientation="horizontal">
                     <FlexboxLayout class="p-b-15" flexDirection="column" align-items="flex-start">
                        <Label class="card-number text-left" v-if="totalRevenue" :text="stringFormat(Math.floor(totalRevenue))"/>
                        <Label class="card-number text-left" v-else text="0"/>
                        <Label class="m-10 h4-card-block c-success-text" width="50%" v-if="diffRevenue > 0" :text="'+' + stringFormat(diffRevenue) + ' revenue'"/>
                        <Label class="m-10 h4-card-block c-danger" width="50%" v-if="diffRevenue < 0" :text="stringFormat(diffRevenue) + ' revenue'"/>
                    </FlexboxLayout>
                </StackLayout>
            </ScrollView>
        </StackLayout>
    </FlexboxLayout>
</CardView>
</template>

<script>
import {
    mapState
} from "vuex";
import currency from "~/mixins/currency.js";
export default {
    name: 'Homecustomer',
    mixins: [currency],
    computed: {
        ...mapState({
            totalRevenue: state => state.dashboard.totalRevenue,
            comparePeriodRevenue: state => state.dashboard.comparePeriodRevenue
        }),
        diffRevenue () {
            return Math.floor(Number(this.totalRevenue) - Number(this.comparePeriodRevenue));
        }
    },
    data() {
        return {

        }
    },
}
</script>
