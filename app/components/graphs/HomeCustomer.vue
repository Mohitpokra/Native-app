<template>
<CardView class="m-15" backgroundColor="#ffffff">
    <FlexboxLayout flexDirection="column" justifyContent="flex-start">
        <StackLayout class="boring p-10">
            <Label class="h3-card" text="Customers"/>
            </StackLayout>
            <ScrollView orientation="horizontal">
                <StackLayout orientation="horizontal">
                    <FlexboxLayout width="170" class="card-bg p-b-15" flexDirection="column" align-items="flex-start">
                        <Label class="m-10 h4-card-block"  text="Total customers"/>
                        <Label class="card-number text-left" v-if="tillTotalVednor" :text="stringFormat(tillTotalVednor)"/>
                        <Label class="card-number text-left" v-else text="0"/>
                    </FlexboxLayout>
                    <FlexboxLayout width="170" class="card-bg" flexDirection="column" align-items="flex-start">
                        <Label class="m-10 h4-card-block"  text="Total active customers"/>
                        <Label class="card-number text-left" v-if="totalCustomerDataPoints && totalCustomerDataPoints.active" :text="stringFormat(totalCustomerDataPoints.active)"/>
                        <Label class="card-number text-left" v-else text="0"/>
                    </FlexboxLayout>
                    <FlexboxLayout width="170" flexDirection="column" align-items="flex-start">
                        <Label class="m-10 h4-card-block"  text="Total disable customers"/>
                        <Label class="card-number text-left" v-if="totalCustomerDataPoints && totalCustomerDataPoints.disable" :text="stringFormat(totalCustomerDataPoints.disable)"/>
                        <Label class="card-number text-left" v-else text="0"/>
                    </FlexboxLayout>
                    <FlexboxLayout width="170" class="card-bg" flexDirection="column" align-items="flex-start">
                        <Label class="m-10 h4-card-block"  text="Total hidden customers"/>
                        <Label class="card-number text-left" v-if="totalCustomerDataPoints && totalCustomerDataPoints.hidden" :text="stringFormat(totalCustomerDataPoints.hidden)"/>
                        <Label class="card-number text-left" v-else text="0"/>
                    </FlexboxLayout>
                    <FlexboxLayout width="170" class="card-bg" flexDirection="column" align-items="flex-start">
                        <Label class="m-10 h4-card-block"  text="Total unknown customers"/>
                        <Label class="card-number text-left" v-if="totalCustomerDataPoints && totalCustomerDataPoints.unknown" :text="stringFormat(totalCustomerDataPoints.unknown)"/>
                        <Label class="card-number text-left" v-else text="0"/>
                    </FlexboxLayout>
                </StackLayout>
            </ScrollView>
            <ScrollView orientation="horizontal">
                <StackLayout class="m-t-10" orientation="horizontal">
                    <FlexboxLayout width="170" class="card-bg p-b-15" flexDirection="column" align-items="flex-start">
                        <Label class="m-10 h4-card-block"  text="Active customers"/>
                        <Label class="card-number text-left" v-if="customer && customer.active" :text="stringFormat(customer.active)"/>
                        <Label class="card-number text-left" v-else text="0"/>
                        <Label class="m-10 h4-card-block c-success-text" v-if="diffActivecustomer > 0" width="50%" :text=" '+' + stringFormat(diffActivecustomer) + ' customers'"/>
                        <Label class="m-10 h4-card-block c-danger" v-else-if="diffActivecustomer < 0" width="50%" :text="stringFormat(diffActivecustomer) + ' customers'"/>
                    </FlexboxLayout>
                    <FlexboxLayout width="170" class="p-b-15" flexDirection="column" align-items="flex-start">
                        <Label class="m-10 h4-card-block"  text="Disable customers"/>
                        <Label class="card-number text-left" v-if="customer && customer.disable" :text="stringFormat(customer.disable)"/>
                        <Label class="card-number text-left" v-else text="0"/>
                        <Label class="m-10 h4-card-block c-success-text" v-if="diffDisablecustomer > 0"  width="50%" :text="'+' + stringFormat(diffDisablecustomer) + ' customers'"/>
                        <Label class="m-10 h4-card-block c-danger" v-else-if="diffDisablecustomer < 0" width="50%" :text="stringFormat(diffDisablecustomer) + ' customers'"/>
                    </FlexboxLayout>
                    <FlexboxLayout width="170" class="card-bg p-b-15" flexDirection="column" align-items="flex-start">
                        <Label class="m-10 h4-card-block"  text="Hidden customers"/>
                        <Label class="card-number text-left" v-if="customer && customer.hidden" :text="stringFormat(customer.hidden)"/>
                        <Label class="card-number text-left" v-else text="0"/>
                        <Label class="m-10 h4-card-block c-success-text" width="50%" v-if="diffHiddencustomer > 0" :text="'+' + stringFormat(diffHiddencustomer) + ' customers'"/>
                        <Label class="m-10 h4-card-block c-danger" width="50%" v-if="diffHiddencustomer < 0" :text="stringFormat(diffHiddencustomer) + ' customers'"/>
                    </FlexboxLayout>
                </StackLayout>
            </ScrollView>
            <Gridlayout rows="auto">
                <Carousel class="m-l-10" height="320" width="100%" pageChanged="myChangeEvent" pageTapped="mySelectedEvent" indicatorColorUnselected="#404553" indicatorColor="#007afc" finite="true" bounce="false" showIndicator="true" verticalAlignment="top" android:indicatorAnimation="swap">
                    <CarouselItem id="slide1" verticalAlignment="middle">
                        <Label class="h4-card-block m-10 text-left"  text="Total customer by status"/>
                        <RadPieChart v-if="totalCustomerPieGraphData && Boolean(totalCustomerPieGraphData.length)" height="200" allowAnimation="true" row="0">
                            <PieSeries v-tkPieSeries selectionMode="DataPoint" outerRadiusFactor="0.8" expandRadius="0.2" showLabels="true" valueProperty="count" legendLabel="title" :items="totalCustomerPieGraphData">
                                <PointLabelStyle v-tkPieLabelStyle margin="15"></PointLabelStyle>
                            </PieSeries>
                            <RadLegendView v-tkPieLegend position="Left" title="customer" offsetOrigin="TopRight" width="110" enableSelection="true"></RadLegendView>
                        </RadPieChart>
                        <FlexboxLayout v-else justifyContent="center" height="200">
                            <FlexboxLayout flexDirection="column" justifyContent="center">
                                <Image src="~/images/no_data.png" height="36" width="36" stretch="aspectFit" />
                                <Label class="c-grey-dark h4 m-t-5" text="No data Found" />
                            </FlexboxLayout>
                        </FlexboxLayout>
                    </CarouselItem>
                    <CarouselItem  id="slide2" verticalAlignment="middle">
                        <Label class="h4-card-block m-10 text-left" text="Given period customer by status"/>

                        <RadPieChart v-if="customerPieGraphData && Boolean(customerPieGraphData.length)" height="200" allowAnimation="true" row="0">
                            <PieSeries v-tkPieSeries selectionMode="DataPoint" outerRadiusFactor="0.8" expandRadius="0.2" showLabels="true" valueProperty="count" legendLabel="title" :items="customerPieGraphData">
                                <PointLabelStyle v-tkPieLabelStyle margin="15"></PointLabelStyle>
                            </PieSeries>
                            <RadLegendView v-tkPieLegend position="Left" title="customer" offsetOrigin="TopRight" width="110" enableSelection="true"></RadLegendView>
                        </RadPieChart>

                        <FlexboxLayout v-else justifyContent="center" height="200">
                            <FlexboxLayout flexDirection="column" justifyContent="center">
                                <Image src="~/images/no_data.png" height="36" width="36" stretch="aspectFit" />
                                <Label class="c-grey-dark h4 m-t-5" text="No data Found" />
                            </FlexboxLayout>
                        </FlexboxLayout>

                    </CarouselItem>
                    <CarouselItem id="slide3" verticalAlignment="middle">
                        <Label class="h4-card-block m-10 text-left"  text="Compare period customer by status"/>
                        <RadPieChart v-if="totalCustomerPieGraphData && Boolean(compareCustomerPieGraphData.length)" height="200" allowAnimation="true" row="0">
                            <PieSeries v-tkPieSeries selectionMode="DataPoint" outerRadiusFactor="0.8" expandRadius="0.2" showLabels="true" valueProperty="count" legendLabel="title" :items="compareCustomerPieGraphData">
                                <PointLabelStyle v-tkPieLabelStyle margin="15"></PointLabelStyle>
                            </PieSeries>
                            <RadLegendView v-tkPieLegend position="Left" title="customer" offsetOrigin="TopRight" width="110" enableSelection="true"></RadLegendView>
                        </RadPieChart>
                        <FlexboxLayout v-else justifyContent="center" height="200">
                            <FlexboxLayout flexDirection="column" justifyContent="center">
                                <Image src="~/images/no_data.png" height="36" width="36" stretch="aspectFit" />
                                <Label class="c-grey-dark h4 m-t-5" text="No data Found" />
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
