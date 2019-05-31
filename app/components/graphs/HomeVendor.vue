<template>
<CardView class="m-15" backgroundColor="#ffffff">
    <FlexboxLayout flexDirection="column" justifyContent="flex-start">
        <StackLayout class="boring p-10">
            <Label class="h3-card" text="Vendor"/>
        </StackLayout>
        <ScrollView orientation="horizontal">
            <StackLayout orientation="horizontal">
                <FlexboxLayout width="170" class="card-bg p-b-15" flexDirection="column" align-items="flex-start">
                    <Label class="m-10 h4-card-block"  text="Total vendors"/>
                    <Label class="card-number text-left" v-if="tillTotalVednor" :text="stringFormat(tillTotalVednor)"/>
                    <Label class="card-number text-left" v-else text="0"/>
                </FlexboxLayout>
                <FlexboxLayout width="170" class="card-bg" flexDirection="column" align-items="flex-start">
                    <Label class="m-10 h4-card-block"  text="Total active vendors"/>
                    <Label class="card-number text-left" v-if="totalVendorDataPoints && totalVendorDataPoints.active" :text="stringFormat(totalVendorDataPoints.active)"/>
                    <Label class="card-number text-left" v-else text="0"/>
                </FlexboxLayout>
                <FlexboxLayout width="170" flexDirection="column" align-items="flex-start">
                    <Label class="m-10 h4-card-block"  text="Total disable vendors"/>
                    <Label class="card-number text-left" v-if="totalVendorDataPoints && totalVendorDataPoints.disable" :text="stringFormat(totalVendorDataPoints.disable)"/>
                    <Label class="card-number text-left" v-else text="0"/>
                </FlexboxLayout>
                <FlexboxLayout width="170" class="card-bg" flexDirection="column" align-items="flex-start">
                    <Label class="m-10 h4-card-block"  text="Total hidden vendors"/>
                    <Label class="card-number text-left" v-if="totalVendorDataPoints && totalVendorDataPoints.hidden" :text="stringFormat(totalVendorDataPoints.hidden)"/>
                    <Label class="card-number text-left" v-else text="0"/>
                </FlexboxLayout>
            </StackLayout>
        </ScrollView>
        <ScrollView orientation="horizontal">
            <StackLayout class="m-t-10" orientation="horizontal">
                <FlexboxLayout width="170" class="card-bg p-b-15" flexDirection="column" align-items="flex-start">
                    <Label class="m-10 h4-card-block"  text="Active vendors"/>
                    <Label class="card-number text-left" v-if="vendor && vendor.active" :text="stringFormat(vendor.active)"/>
                    <Label class="card-number text-left" v-else text="0"/>
                    <Label class="m-10 h4-card-block c-success-text" v-if="diffActivevendor > 0" width="50%" :text=" '+' + stringFormat(diffActivevendor) + ' vendors'"/>
                    <Label class="m-10 h4-card-block c-danger" v-else-if="diffActivevendor < 0" width="50%" :text="stringFormat(diffActivevendor) + ' vendors'"/>
                </FlexboxLayout>
                <FlexboxLayout width="170" class="p-b-15" flexDirection="column" align-items="flex-start">
                    <Label class="m-10 h4-card-block"  text="Disable vendors"/>
                    <Label class="card-number text-left" v-if="vendor && vendor.disable" :text="stringFormat(vendor.disable)"/>
                    <Label class="card-number text-left" v-else text="0"/>
                    <Label class="m-10 h4-card-block c-success-text" v-if="diffDisablevendor > 0"  width="50%" :text="'+' + stringFormat(diffDisablevendor) + ' vendors'"/>
                    <Label class="m-10 h4-card-block c-danger" v-else-if="diffDisablevendor < 0" width="50%" :text="stringFormat(diffDisablevendor) + ' vendors'"/>
                </FlexboxLayout>
                <FlexboxLayout width="170" class="card-bg p-b-15" flexDirection="column" align-items="flex-start">
                    <Label class="m-10 h4-card-block"  text="Hidden vendors"/>
                    <Label class="card-number text-left" v-if="vendor && vendor.hidden" :text="stringFormat(vendor.hidden)"/>
                    <Label class="card-number text-left" v-else text="0"/>
                    <Label class="m-10 h4-card-block c-success-text" width="50%" v-if="diffHiddenvendor > 0" :text="'+' + stringFormat(diffHiddenvendor) + ' vendors'"/>
                    <Label class="m-10 h4-card-block c-danger" width="50%" v-if="diffHiddenvendor < 0" :text="stringFormat(diffHiddenvendor) + ' vendors'"/>
                </FlexboxLayout>
            </StackLayout>
        </ScrollView>
        <Gridlayout rows="auto">
            <Carousel class="m-l-10" height="320" width="100%" pageChanged="myChangeEvent" pageTapped="mySelectedEvent" indicatorColorUnselected="#404553" indicatorColor="#007afc" finite="true" bounce="false" showIndicator="true" verticalAlignment="top" android:indicatorAnimation="swap">
                <CarouselItem id="slide1" verticalAlignment="middle">
                    <Label class="h4-card-block m-10 text-left"  text="Total vendor by status"/>
                    <RadPieChart v-if="totalVendorPieGraphData && Boolean(totalVendorPieGraphData.length)" height="200" allowAnimation="true" row="0">
                        <PieSeries v-tkPieSeries selectionMode="DataPoint" outerRadiusFactor="0.8" expandRadius="0.2" showLabels="true" valueProperty="count" legendLabel="title" :items="totalVendorPieGraphData">
                            <PointLabelStyle v-tkPieLabelStyle margin="15"></PointLabelStyle>
                        </PieSeries>
                        <RadLegendView v-tkPieLegend position="Left" title="vendor" offsetOrigin="TopRight" width="110" enableSelection="true"></RadLegendView>
                    </RadPieChart>
                    <FlexboxLayout v-else justifyContent="center" height="200">
                            <FlexboxLayout flexDirection="column" justifyContent="center">
                                <Image src="~/images/no_data.png" height="36" width="36" stretch="aspectFit" />
                                <Label class="c-grey-dark h4 m-t-5" text="No data Found" />
                            </FlexboxLayout>
                        </FlexboxLayout>
                </CarouselItem>
                <CarouselItem  id="slide2" verticalAlignment="middle">
                    <Label class="h4-card-block m-10 text-left" text="Viven period vendor by status"/>

                    <RadPieChart v-if="vendorPieGraphData && Boolean(vendorPieGraphData.length)" height="200" allowAnimation="true" row="0">
                        <PieSeries v-tkPieSeries selectionMode="DataPoint" outerRadiusFactor="0.8" expandRadius="0.2" showLabels="true" valueProperty="count" legendLabel="title" :items="vendorPieGraphData">
                            <PointLabelStyle v-tkPieLabelStyle margin="15"></PointLabelStyle>
                        </PieSeries>
                        <RadLegendView v-tkPieLegend position="Left" title="vendor" offsetOrigin="TopRight" width="110" enableSelection="true"></RadLegendView>
                    </RadPieChart>
                    <FlexboxLayout v-else justifyContent="center" height="200">
                        <FlexboxLayout flexDirection="column" justifyContent="center">
                            <Image src="~/images/no_data.png" height="36" width="36" stretch="aspectFit" />
                            <Label class="c-grey-dark h4 m-t-5" text="No data Found" />
                        </FlexboxLayout>
                    </FlexboxLayout>
                </CarouselItem>
                <CarouselItem id="slide3" verticalAlignment="middle">
                    <Label class="h4-card-block m-10 text-left"  text="Compare period vendor by status"/>
                    <RadPieChart v-if="totalVendorPieGraphData && Boolean(compareVendorPieGraphData.length)" height="200" allowAnimation="true" row="0">
                        <PieSeries v-tkPieSeries selectionMode="DataPoint" outerRadiusFactor="0.8" expandRadius="0.2" showLabels="true" valueProperty="count" legendLabel="title" :items="compareVendorPieGraphData">
                            <PointLabelStyle v-tkPieLabelStyle margin="15"></PointLabelStyle>
                        </PieSeries>
                        <RadLegendView v-tkPieLegend position="Left" title="vendor" offsetOrigin="TopRight" width="110" enableSelection="true"></RadLegendView>
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
    name: 'Homevendor',
    mixins: [currency],
    computed: {
        ...mapState({
            totalVendorDataPoints: state => state.dashboard.totalVendor,
            vendor: state => state.dashboard.vendor,
            comparePeriodVendor: state => state.dashboard.comparePeriodVendor,
            compareVendorPieGraphData: state => state.dashboard.compareVendorPieGraphData,
            vendorPieGraphData: state => state.dashboard.vendorPieGraphData,
            totalVendorPieGraphData: state => state.dashboard.totalVendorPieGraphData,
  
        }),
        diffActivevendor() {
            return this.vendor.active - this.comparePeriodVendor.active;
        },
        diffDisablevendor() {
            return this.vendor.disable - this.comparePeriodVendor.disable;
        },
        diffHiddenvendor() {
            return this.vendor.hidden - this.comparePeriodVendor.hidden;
        },
        currentTotalVednor () {
              let total = 0;
              for(let key in this.vendor) {
                   total = Number(this.vendor[key]) + total;
              }
              return total;
        },
        compareTotalVednor () {
              let total = 0;
              for(let key in this.comparePeriodVendor) {
                   total = Number(this.comparePeriodVendor[key]) + total;
              }
              return total;
        },
        tillTotalVednor () {
              let total = 0;
              for(let key in this.totalVendorDataPoints) {
                   total = Number( this.totalVendorDataPoints[key]) + total;
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
