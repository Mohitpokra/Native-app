<template>
<CardView class="m-15" backgroundColor="#ffffff">
    <FlexboxLayout flexDirection="column" justifyContent="flex-start">
        <StackLayout class=" p-10">
            <Label class="h3-card" text="Product and Categories"/>
        </StackLayout>
        <ScrollView orientation="horizontal">
            <StackLayout orientation="horizontal">
                <FlexboxLayout width="170" class="card-bg p-b-15" flexDirection="column" align-items="flex-start">
                    <Label class="m-10 h4-card-block"  text="Total Products"/>
                    <Label class="card-number text-left" v-if="this.totalProductDataPoints && this.totalProductDataPoints.total" :text="this.stringFormat(this.totalProductDataPoints.total)"/>
                    <Label class="card-number text-left" v-else text="0"/>
                </FlexboxLayout>
                <FlexboxLayout width="170" flexDirection="column" align-items="flex-start">
                    <Label class="m-10 h4-card-block"  text="Total Categories"/>
                    <Label class="card-number text-left" v-if="this.totalProductDataPoints && this.totalProductDataPoints.categories"  :text="this.stringFormat(this.totalProductDataPoints.categories)"/>
                    <Label class="card-number text-left" v-else  text="0"/>
                </FlexboxLayout>
                <FlexboxLayout width="170" class="card-bg" flexDirection="column" align-items="flex-start">
                    <Label class="m-10 h4-card-block"  text="Total Active Products"/>
                    <Label class="card-number text-left" v-if="this.totalProductDataPoints && this.totalProductDataPoints.active" :text="this.stringFormat(this.totalProductDataPoints.active)"/>
                    <Label class="card-number text-left" v-else text="0"/>
                </FlexboxLayout>
                <FlexboxLayout width="170" flexDirection="column" align-items="flex-start">
                    <Label class="m-10 h4-card-block"  text="Total Disable Products"/>
                    <Label class="card-number text-left" v-if="this.totalProductDataPoints && this.totalProductDataPoints.disable" :text="this.stringFormat(this.totalProductDataPoints.disable)"/>
                    <Label class="card-number text-left" v-else text="0"/>
                </FlexboxLayout>
                <FlexboxLayout width="170" class="card-bg" flexDirection="column" align-items="flex-start">
                    <Label class="m-10 h4-card-block"  text="Total Hidden Products"/>
                    <Label class="card-number text-left" v-if="this.totalProductDataPoints && this.totalProductDataPoints.hidden" :text="this.stringFormat(this.totalProductDataPoints.hidden)"/>
                    <Label class="card-number text-left" v-else text="0"/>
                </FlexboxLayout>
            </StackLayout>
        </ScrollView>
        <ScrollView orientation="horizontal">
            <StackLayout class="m-t-10" orientation="horizontal">
                <FlexboxLayout width="170" class="card-bg p-b-15" flexDirection="column" align-items="flex-start">
                    <Label class="m-10 h4-card-block"  text="Active Products"/>
                    <Label class="card-number text-left" v-if="this.product && this.product.active" :text="this.stringFormat(this.product.active)"/>
                    <Label class="card-number text-left" v-else text="0"/>
                    <Label class="m-10 h4-card-block c-success-text" v-if="this.diffActiveProduct > 0" width="50%" :text=" '+' + this.stringFormat(this.diffActiveProduct) + ' products'"/>
                    <Label class="m-10 h4-card-block c-danger" v-else-if="this.diffActiveProduct < 0" width="50%" :text="this.stringFormat(this.diffActiveProduct) + ' products'"/>
                </FlexboxLayout>
                <FlexboxLayout width="170" class="p-b-15" flexDirection="column" align-items="flex-start">
                    <Label class="m-10 h4-card-block"  text="Disable Products"/>
                    <Label class="card-number text-left" v-if="this.product && this.product.disable" :text="this.stringFormat(this.product.disable)"/>
                    <Label class="card-number text-left" v-else text="0"/>
                    <Label class="m-10 h4-card-block c-success-text" v-if="this.diffDisableProduct > 0"  width="50%" :text="'+' + this.stringFormat(this.diffDisableProduct) + ' products'"/>
                    <Label class="m-10 h4-card-block c-danger" v-else-if="this.diffDisableProduct < 0" width="50%" :text="this.stringFormat(this.diffDisableProduct) + ' products'"/>
                </FlexboxLayout>
                <FlexboxLayout width="170" class="card-bg p-b-15" flexDirection="column" align-items="flex-start">
                    <Label class="m-10 h4-card-block"  text="Hidden Products"/>
                    <Label class="card-number text-left" v-if="this.product && this.product.hidden" :text="this.stringFormat(this.product.hidden)"/>
                    <Label class="card-number text-left" v-else text="0"/>
                    <Label class="m-10 h4-card-block c-success-text" width="50%" v-if="this.diffHiddenProduct > 0" :text="'+' + this.stringFormat(this.diffHiddenProduct) + ' products'"/>
                    <Label class="m-10 h4-card-block c-danger" width="50%" v-if="this.diffHiddenProduct < 0" :text="this.stringFormat(this.diffHiddenProduct) + ' products'"/>
                </FlexboxLayout>
                <FlexboxLayout width="170" flexDirection="column" align-items="flex-start">
                    <Label class="m-10 h4-card-block"  text="Categories"/>
                    <Label class="card-number text-left" v-if="this.product && this.product.categories"  :text="this.stringFormat(this.product.categories)"/>
                    <Label class="card-number text-left" v-else text="0"/>
                    <Label class="m-10 h4-card-block c-success-text" width="50%" v-if="this.diffCategories > 0" :text="'+' + this.stringFormat(this.diffCategories) + ' products'"/>
                    <Label class="m-10 h4-card-block c-danger" width="50%"  v-else-if="this.diffCategories < 0" :text="this.stringFormat(this.diffCategories) + ' products'"/>
                </FlexboxLayout>
            </StackLayout>
        </ScrollView>
        <Gridlayout rows="auto">
            <Carousel class="m-l-10" height="320" width="100%" pageChanged="myChangeEvent" pageTapped="mySelectedEvent" indicatorColorUnselected="#404553" indicatorColor="#007afc" finite="true" bounce="false" showIndicator="true" verticalAlignment="top" android:indicatorAnimation="swap">
                <CarouselItem id="slide1" verticalAlignment="middle">
                    <Label class="h4-card-block m-10 text-left"  text="Total Product by Status"/>
                        <RadPieChart v-if="Boolean(this.totalProductPieGraphData.length)" height="300" allowAnimation="true" row="0">
                            <PieSeries v-tkPieSeries selectionMode="DataPoint" outerRadiusFactor="0.8" expandRadius="0.2" showLabels="true" valueProperty="count" legendLabel="title" :items="this.totalProductPieGraphData">
                                <PointLabelStyle v-tkPieLabelStyle margin="15"></PointLabelStyle>
                            </PieSeries>
                            <RadLegendView v-tkPieLegend position="Left" title="Product" offsetOrigin="TopRight" width="110" enableSelection="true"></RadLegendView>
                        </RadPieChart>
                        <FlexboxLayout v-else justifyContent="center" height="300">
                            <FlexboxLayout flexDirection="column" justifyContent="center">
                                <Label class="c-danger" text="No data Found" />
                            </FlexboxLayout>
                        </FlexboxLayout>
                </CarouselItem>
                <CarouselItem id="slide2" verticalAlignment="middle">
                    <Label class="h4-card-block m-10 text-left" text="Product by Status"/>

                    <RadPieChart v-if="Boolean(this.productPieGraphData.length)" height="300" allowAnimation="true" row="0">
                        <PieSeries v-tkPieSeries selectionMode="DataPoint" outerRadiusFactor="0.8" expandRadius="0.2" showLabels="true" valueProperty="count" legendLabel="title" :items="this.productPieGraphData">
                            <PointLabelStyle v-tkPieLabelStyle margin="15"></PointLabelStyle>
                        </PieSeries>
                        <RadLegendView v-tkPieLegend position="Left" title="Product" offsetOrigin="TopRight" width="110" enableSelection="true"></RadLegendView>
                    </RadPieChart>
                    <FlexboxLayout v-else justifyContent="center" height="300">
                        <FlexboxLayout flexDirection="column" justifyContent="center">
                            <Label class="c-danger" text="No data Found" />
                        </FlexboxLayout>
                    </FlexboxLayout>
                </CarouselItem>
                <CarouselItem id="slide3" verticalAlignment="middle">
                    <Label class="h4-card-block m-10 text-left"  text="Compare Period Product by Status"/>
                    <RadPieChart v-if="Boolean(this.compareProductPieGraphData.length)" height="300" allowAnimation="true" row="0">
                        <PieSeries v-tkPieSeries selectionMode="DataPoint" outerRadiusFactor="0.8" expandRadius="0.2" showLabels="true" valueProperty="count" legendLabel="title" :items="this.compareProductPieGraphData">
                            <PointLabelStyle v-tkPieLabelStyle margin="15"></PointLabelStyle>
                        </PieSeries>
                        <RadLegendView v-tkPieLegend position="Left" title="Product" offsetOrigin="TopRight" width="110" enableSelection="true"></RadLegendView>
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
    name: 'HomeProduct',
    mixins: [currency],
    computed: {
        ...mapState({
            totalProductDataPoints: state => state.dashboard.totalProduct,
            product: state => state.dashboard.product,
            comparePeriodProduct: state => state.dashboard.comparePeriodProduct,
            totalProductPieGraphData: state => state.dashboard.totalProductPieGraphData,
            compareProductPieGraphData: state => state.dashboard.compareProductPieGraphData,
            productPieGraphData: state => state.dashboard.productPieGraphData
        }),
        diffActiveProduct() {
            return this.product.active - this.comparePeriodProduct.active;
        },
        diffCategories() {
            return Number(this.product.categories) - Number(this.comparePeriodProduct.categories);
        },
        diffDisableProduct() {
            return this.product.disable - this.comparePeriodProduct.disable;
        },
        diffHiddenProduct() {
            return this.product.hidden - this.comparePeriodProduct.hidden;
        }

    },
    data() {
        return {

        }
    },
}
</script>
