<template>
    <CardView class="m-15" backgroundColor="#ffffff">
        <FlexboxLayout flexDirection="column" justifyContent="flex-start">
            <StackLayout class="boring p-10">
                <Label class="h3-card" text="Order"/>
            </StackLayout>

            <ScrollView orientation="horizontal">
                <StackLayout orientation="horizontal">
                    <FlexboxLayout width="170" class="card-bg p-b-15" flexDirection="column" align-items="flex-start">
                        <Label class="m-10 h4-card-block"  text="Total orders"/>
                        <Label class="card-number text-left" v-if="order && order.total" :text="stringFormat(order.total)"/>
                        <Label class="card-number text-left" v-else text="0"/>
                        <Label class="m-10 h4-card-block c-success-text" v-if="diffTotal > 0" width="50%" :text=" '+' + stringFormat(diffTotal) + ' orders'"/>
                        <Label class="m-10 h4-card-block c-danger" v-else-if="diffTotal < 0" width="50%" :text=" '-' + stringFormat(Math.abs(diffTotal)) + ' orders'"/>
                    </FlexboxLayout>
                    <FlexboxLayout width="170" class="p-b-15" flexDirection="column" align-items="flex-start">
                        <Label class="m-10 h4-card-block"  text="Completed orders"/>
                        <Label class="card-number text-left" v-if="completed" :text="stringFormat(completed)"/>
                        <Label class="card-number text-left" v-else text="0"/>
                        <Label class="m-10h4-card-block  c-success-text" v-if="diffCompleted > 0"  width="50%" :text="'+' + stringFormat(diffCompleted) + ' orders'"/>
                        <Label class="m-10 h4-card-block c-danger" v-else-if="diffCompleted < 0" width="50%" :text="  '-'+ stringFormat(Math.abs(diffCompleted)) + ' orders'"/>
                    </FlexboxLayout>
                    <FlexboxLayout width="170" class="card-bg p-b-15" flexDirection="column" align-items="flex-start">
                        <Label class="m-10 h4-card-block"  text="Open orders"/>
                        <Label class="card-number text-left" v-if="open" :text="stringFormat(open)"/>
                        <Label class="card-number text-left" v-else text="0"/>
                        <Label class="m-10 h4-card-block c-success-text" width="50%" v-if="diffOpen > 0" :text="'+' + stringFormat(diffOpen) + ' orders'"/>
                        <Label class="m-10 h4-card-block c-danger" width="50%" v-if="diffOpen < 0" :text=" '-' + stringFormat(Math.abs(diffOpen)) + ' orders'"/>
                    </FlexboxLayout>
                    <FlexboxLayout width="170" class="card-bg p-b-15" flexDirection="column" align-items="flex-start">
                        <Label class="m-10  h4-card-block"  text="Returned orders"/>
                        <Label class="card-number text-left" v-if="returned" :text="stringFormat(returned)"/>
                        <Label class="card-number text-left" v-else text="0"/>
                        <Label class="m-10 h4-card-block c-success-text" width="50%" v-if="diffReturned > 0" :text="'+' + stringFormat(diffReturned) + ' orders'"/>
                        <Label class="m-10 h4-card-block c-danger" width="50%" v-if="diffReturned < 0" :text=" '-' + stringFormat(Math.abs(diffReturned)) + ' orders'"/>
                    </FlexboxLayout>
                    <FlexboxLayout width="170" class="card-bg p-b-15" flexDirection="column" align-items="flex-start">
                        <Label class="m-10  h4-card-block"  text="Processing orders"/>
                        <Label class="card-number text-left" v-if="processing" :text="stringFormat(processing)"/>
                        <Label class="card-number text-left" v-else text="0"/>
                        <Label class="m-10 h4-card-block c-success-text" width="50%" v-if="diffProcessing > 0" :text="'+' + stringFormat(diffProcessing) + ' orders'"/>
                        <Label class="m-10 h4-card-block c-danger" width="50%" v-if="diffProcessing < 0" :text=" '-' + stringFormat(Math.abs(diffProcessing)) + ' orders'"/>
                    </FlexboxLayout>
                    <FlexboxLayout width="170" class="card-bg p-b-15" flexDirection="column" align-items="flex-start">
                        <Label class="m-10 h4-card-block"  text="Cancelled orders"/>
                        <Label class="card-number text-left" v-if="cancelled" :text="stringFormat(cancelled)"/>
                        <Label class="card-number text-left" v-else text="0"/>
                        <Label class="m-10 h4-card-block c-success-text" width="50%" v-if="diffCancelled > 0" :text="'+' + stringFormat(diffCancelled) + ' orders'"/>
                        <Label class="m-10 h4-card-block c-danger" width="50%" v-if="diffCancelled < 0" :text=" '-' + stringFormat(Math.abs(diffCancelled)) + ' orders'"/>
                    </FlexboxLayout>
                </StackLayout>
            </ScrollView>

            <Gridlayout rows="auto">
                <Carousel class="m-l-10" height="320" width="100%" pageChanged="myChangeEvent" pageTapped="mySelectedEvent" indicatorColorUnselected="#404553" indicatorColor="#007afc" finite="true" bounce="false" showIndicator="true" verticalAlignment="top" android:indicatorAnimation="swap">
                    <CarouselItem id="slide1" verticalAlignment="middle">
                        <Label class="h4-card-block m-10 text-left" text="Given Period order by status"/>

                        <RadPieChart v-if="orderPieGraphData && Boolean(orderPieGraphData.length)" height="200" allowAnimation="true" row="0">
                            <PieSeries v-tkPieSeries selectionMode="DataPoint" outerRadiusFactor="0.8" expandRadius="0.2" showLabels="true" valueProperty="count" legendLabel="title" :items="orderPieGraphData">
                                <PointLabelStyle v-tkPieLabelStyle margin="15"></PointLabelStyle>
                            </PieSeries>
                            <RadLegendView v-tkPieLegend position="Left" title="order" offsetOrigin="TopRight" width="110" enableSelection="true"></RadLegendView>
                        </RadPieChart>
                        <FlexboxLayout v-else justifyContent="center" height="200">
                            <FlexboxLayout flexDirection="column" justifyContent="center">
                                <Image src="~/images/no_data.png" height="36" width="36" stretch="aspectFit" />
                                <Label class="c-grey-dark h4 m-t-5" text="No data Found" />
                        </FlexboxLayout>
                        </FlexboxLayout>
                    </CarouselItem>

                    <CarouselItem id="slide2" verticalAlignm\ent="middle">
                        <Label class="h4-card-block m-10 text-left"  text="Compare period order by status"/>
                        <RadPieChart v-if="compareOrderPieGraphData && Boolean(compareOrderPieGraphData.length)" height="200" allowAnimation="true" row="0">
                            <PieSeries v-tkPieSeries selectionMode="DataPoint" outerRadiusFactor="0.8" expandRadius="0.2" showLabels="true" valueProperty="count" legendLabel="title" :items="compareOrderPieGraphData">
                                <PointLabelStyle v-tkPieLabelStyle margin="15"></PointLabelStyle>
                            </PieSeries>
                            <RadLegendView v-tkPieLegend position="Left" title="order" offsetOrigin="TopRight" width="110" enableSelection="true"></RadLegendView>
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
    name: 'Homeorder',
    mixins: [currency],
    computed: {
        ...mapState({
            order: state => state.dashboard.order,
            comparePeriodOrder: state => state.dashboard.comparePeriodOrder,
            compareOrderPieGraphData: state => state.dashboard.compareOrderPieGraphData,
            orderPieGraphData: state => state.dashboard.orderPieGraphData
        }),
        cancelled() {
            return Number(this.order.declined) + Number(this.order.failed) + Number(this.order.cancelled) + Number(this.order.cancelrequest);
        },
        open() {
            return Number(this.order.backordered) + Number(this.order.open) + Number(this.order.awaitingcall) + Number(this.order.paymentpending);
        },
        returned() {
            return Number(this.order.returned) + Number(this.order.rto);
        },
        processing() {
            return Number(this.order.processed) + Number(this.order.intransit) + Number(this.order.manifest);
        },
        completed() {
            return Number(this.order.complete);
        },
        diffCancelled() {
            return this.cancelled - (Number(this.comparePeriodOrder.declined) + Number(this.comparePeriodOrder.failed) + Number(this.comparePeriodOrder.cancelled) + Number(this.comparePeriodOrder.cancelrequest));
        },
        diffOpen() {
            return this.open - (Number(this.comparePeriodOrder.backordered) + Number(this.comparePeriodOrder.open) + Number(this.comparePeriodOrder.awaitingcall) + Number(this.comparePeriodOrder.paymentpending))
        },
        diffReturned() {
            return this.returned - (Number(this.comparePeriodOrder.returned) + Number(this.comparePeriodOrder.rto));
        },
        diffProcessing() {
            return this.processing - (Number(this.comparePeriodOrder.processed) + Number(this.comparePeriodOrder.intransit) + Number(this.comparePeriodOrder.manifest));
        },
        diffCompleted() {
            return this.completed - Number(this.comparePeriodOrder.complete);
        },
        diffTotal() {
            return this.order.total - this.comparePeriodOrder.total;
        }
    },
    data() {
        return {

        }
    },
}
</script>