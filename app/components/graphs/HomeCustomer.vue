<template>
<CardView class="m-15" backgroundColor="#ffffff">
    <FlexboxLayout flexDirection="column" justifyContent="flex-start">
        <StackLayout class="boring p-10">
            <Label class="h3-card" text="Customers"/>
            </StackLayout>
            <ScrollView orientation="horizontal">
                <StackLayout orientation="horizontal">
                    <FlexboxLayout width="170" class="card-bg p-b-15" flexDirection="column" align-items="flex-start">
                        <Label class="m-10 h4-card-block"  text="Total Customers"/>
                        <Label class="card-number text-left" v-if="this.tillTotalVednor" :text="this.stringFormat(this.tillTotalVednor)"/>
                        <Label class="card-number text-left" v-else text="0"/>
                    </FlexboxLayout>
                    <FlexboxLayout width="170" class="card-bg" flexDirection="column" align-items="flex-start">
                        <Label class="m-10 h4-card-block"  text="Total Active customers"/>
                        <Label class="card-number text-left" v-if="this.totalCustomerDataPoints && this.totalCustomerDataPoints.active" :text="this.stringFormat(this.totalCustomerDataPoints.active)"/>
                        <Label class="card-number text-left" v-else text="0"/>
                    </FlexboxLayout>
                    <FlexboxLayout width="170" flexDirection="column" align-items="flex-start">
                        <Label class="m-10 h4-card-block"  text="Total Disable customers"/>
                        <Label class="card-number text-left" v-if="this.totalCustomerDataPoints && this.totalCustomerDataPoints.disable" :text="this.stringFormat(this.totalCustomerDataPoints.disable)"/>
                        <Label class="card-number text-left" v-else text="0"/>
                    </FlexboxLayout>
                    <FlexboxLayout width="170" class="card-bg" flexDirection="column" align-items="flex-start">
                        <Label class="m-10 h4-card-block"  text="Total Hidden customers"/>
                        <Label class="card-number text-left" v-if="this.totalCustomerDataPoints && this.totalCustomerDataPoints.hidden" :text="this.stringFormat(this.totalCustomerDataPoints.hidden)"/>
                        <Label class="card-number text-left" v-else text="0"/>
                    </FlexboxLayout>
                    <FlexboxLayout width="170" class="card-bg" flexDirection="column" align-items="flex-start">
                        <Label class="m-10 h4-card-block"  text="Total Unknown customers"/>
                        <Label class="card-number text-left" v-if="this.totalCustomerDataPoints && this.totalCustomerDataPoints.unknown" :text="this.stringFormat(this.totalCustomerDataPoints.unknown)"/>
                        <Label class="card-number text-left" v-else text="0"/>
                    </FlexboxLayout>
                </StackLayout>
            </ScrollView>
            <ScrollView orientation="horizontal">
                <StackLayout class="m-t-10" orientation="horizontal">
                    <FlexboxLayout width="170" class="card-bg p-b-15" flexDirection="column" align-items="flex-start">
                        <Label class="m-10 h4-card-block"  text="Active customers"/>
                        <Label class="card-number text-left" v-if="this.customer && this.customer.active" :text="this.stringFormat(this.customer.active)"/>
                        <Label class="card-number text-left" v-else text="0"/>
                        <Label class="m-10 h4-card-block c-success-text" v-if="diffActivecustomer > 0" width="50%" :text=" '+' + this.stringFormat(this.diffActivecustomer) + ' customers'"/>
                        <Label class="m-10 h4-card-block c-danger" v-else-if="diffActivecustomer < 0" width="50%" :text="this.stringFormat(this.diffActivecustomer) + ' customers'"/>
                    </FlexboxLayout>
                    <FlexboxLayout width="170" class="p-b-15" flexDirection="column" align-items="flex-start">
                        <Label class="m-10 h4-card-block"  text="Disable customers"/>
                        <Label class="card-number text-left" v-if="this.customer && this.customer.disable" :text="this.stringFormat(this.customer.disable)"/>
                        <Label class="card-number text-left" v-else text="0"/>
                        <Label class="m-10 h4-card-block c-success-text" v-if="this.diffDisablecustomer > 0"  width="50%" :text="'+' + this.stringFormat(this.diffDisablecustomer) + ' customers'"/>
                        <Label class="m-10 h4-card-block c-danger" v-else-if="this.diffDisablecustomer < 0" width="50%" :text="this.stringFormat(this.diffDisablecustomer) + ' customers'"/>
                    </FlexboxLayout>
                    <FlexboxLayout width="170" class="card-bg p-b-15" flexDirection="column" align-items="flex-start">
                        <Label class="m-10 h4-card-block"  text="Hidden customers"/>
                        <Label class="card-number text-left" v-if="this.customer && this.customer.hidden" :text="this.stringFormat(this.customer.hidden)"/>
                        <Label class="card-number text-left" v-else text="0"/>
                        <Label class="m-10 h4-card-block c-success-text" width="50%" v-if="this.diffHiddencustomer > 0" :text="'+' + this.stringFormat(this.diffHiddencustomer) + ' customers'"/>
                        <Label class="m-10 h4-card-block c-danger" width="50%" v-if="this.diffHiddencustomer < 0" :text="this.stringFormat(this.diffHiddencustomer) + ' customers'"/>
                    </FlexboxLayout>
                </StackLayout>
            </ScrollView>
            <Gridlayout rows="auto">
                <Carousel class="m-l-10" height="320" width="100%" pageChanged="myChangeEvent" pageTapped="mySelectedEvent" indicatorColorUnselected="#404553" indicatorColor="#007afc" finite="true" bounce="false" showIndicator="true" verticalAlignment="top" android:indicatorAnimation="swap">
                    <CarouselItem id="slide1" verticalAlignment="middle">
                        <Label class="h4-card-block m-10 text-left"  text="Total customer by Status"/>
                        <RadPieChart v-if="this.totalCustomerPieGraphData && Boolean(this.totalCustomerPieGraphData.length)" height="300" allowAnimation="true" row="0">
                            <PieSeries v-tkPieSeries selectionMode="DataPoint" outerRadiusFactor="0.8" expandRadius="0.2" showLabels="true" valueProperty="count" legendLabel="title" :items="this.totalCustomerPieGraphData">
                                <PointLabelStyle v-tkPieLabelStyle margin="15"></PointLabelStyle>
                            </PieSeries>
                            <RadLegendView v-tkPieLegend position="Left" title="customer" offsetOrigin="TopRight" width="110" enableSelection="true"></RadLegendView>
                        </RadPieChart>
                        <FlexboxLayout v-else justifyContent="center" height="300">
                            <FlexboxLayout flexDirection="column" justifyContent="center">
                                <Label class="c-danger" text="No data Found" />
                            </FlexboxLayout>
                        </FlexboxLayout>
                    </CarouselItem>
                    <CarouselItem  id="slide2" verticalAlignment="middle">
                        <Label class="h4-card-block m-10 text-left" text="customer by Status"/>

                        <RadPieChart v-if="this.customerPieGraphData && Boolean(this.customerPieGraphData.length)" height="300" allowAnimation="true" row="0">
                            <PieSeries v-tkPieSeries selectionMode="DataPoint" outerRadiusFactor="0.8" expandRadius="0.2" showLabels="true" valueProperty="count" legendLabel="title" :items="this.customerPieGraphData">
                                <PointLabelStyle v-tkPieLabelStyle margin="15"></PointLabelStyle>
                            </PieSeries>
                            <RadLegendView v-tkPieLegend position="Left" title="customer" offsetOrigin="TopRight" width="110" enableSelection="true"></RadLegendView>
                        </RadPieChart>

                        <FlexboxLayout v-else justifyContent="center" height="300">
                            <FlexboxLayout flexDirection="column" justifyContent="center">
                                <Label class="c-danger" text="No data Found" />
                            </FlexboxLayout>
                        </FlexboxLayout>

                    </CarouselItem>
                    <CarouselItem id="slide3" verticalAlignment="middle">
                        <Label class="h4-card-block m-10 text-left"  text="Compare Period customer by Status"/>
                        <RadPieChart v-if="this.totalCustomerPieGraphData && Boolean(this.compareCustomerPieGraphData.length)" height="300" allowAnimation="true" row="0">
                            <PieSeries v-tkPieSeries selectionMode="DataPoint" outerRadiusFactor="0.8" expandRadius="0.2" showLabels="true" valueProperty="count" legendLabel="title" :items="this.compareCustomerPieGraphData">
                                <PointLabelStyle v-tkPieLabelStyle margin="15"></PointLabelStyle>
                            </PieSeries>
                            <RadLegendView v-tkPieLegend position="Left" title="customer" offsetOrigin="TopRight" width="110" enableSelection="true"></RadLegendView>
                        </RadPieChart>
                        <FlexboxLayout v-else justifyContent="center" height="300">
                            <FlexboxLayout flexDirection="column" justifyContent="center">
                                <Label class="c-danger" text="No data Found" />
                            </FlexboxLayout>
                        </FlexboxLayout>
                    </CarouselItem>
                </Carousel>
            </Gridlayout>
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
            totalCustomerDataPoints: state => state.dashboard.totalCustomer,
            customer: state => state.dashboard.customer,
            comparePeriodCustomer: state => state.dashboard.comparePeriodCustomer,
            compareCustomerPieGraphData: state => state.dashboard.compareCustomerPieGraphData,
            customerPieGraphData: state => state.dashboard.customerPieGraphData,
            totalCustomerPieGraphData: state => state.dashboard.totalCustomerPieGraphData,

        }),
        diffActivecustomer() {
            return this.customer.active - this.comparePeriodCustomer.active;
        },
        diffDisablecustomer() {
            return this.customer.disable - this.comparePeriodCustomer.disable;
        },
        diffHiddencustomer() {
            return this.customer.hidden - this.comparePeriodCustomer.hidden;
        },
        currentTotalVednor() {
            let total = 0;
            for (let key in this.customer) {
                total = Number(this.customer[key]) + total;
            }
            return total;
        },
        compareTotalVednor() {
            let total = 0;
            for (let key in this.comparePeriodCustomer) {
                total = Number(this.comparePeriodCustomer[key]) + total;
            }
            return total;
        },
        tillTotalVednor() {
            let total = 0;
            for (let key in this.totalCustomerDataPoints) {
                total = Number(this.totalCustomerDataPoints[key]) + total;
            }
            return total;
        }

    },
    data() {
        return {

        }
    },
}
</script>
