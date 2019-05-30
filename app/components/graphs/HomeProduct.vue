<template>
<CardView class="m-15" backgroundColor="#ffffff">
    <FlexboxLayout flexDirection="column" justifyContent="flex-start">
        <StackLayout class=" p-10">
            <Label class="h3-card" text="Product and Categories"/>
        </StackLayout>
        <ScrollView orientation="horizontal">
            <StackLayout orientation="horizontal">
                <FlexboxLayout width="170" class="card-bg p-b-15" flexDirection="column" align-items="flex-start">
                    <Label class="m-10 h4-card-block"  text="Total products"/>
                    <Label class="card-number text-left" v-if="this.totalProduct" :text="this.stringFormat(totalProduct)"/>
                    <Label class="card-number text-left" v-else text="0"/>
                </FlexboxLayout>
                <FlexboxLayout width="170" flexDirection="column" align-items="flex-start">
                    <Label class="m-10 h4-card-block"  text="Total categories"/>
                    <Label class="card-number text-left" v-if="this.totalCategory && this.totalCategory.total"  :text="this.stringFormat(this.totalCategory.total)"/>
                    <Label class="card-number text-left" v-else  text="0"/>
                </FlexboxLayout>
                <FlexboxLayout width="170" class="card-bg" flexDirection="column" align-items="flex-start">
                    <Label class="m-10 h4-card-block"  text="Total active products"/>
                    <Label class="card-number text-left" v-if="this.totalProductDataPoints && this.totalProductDataPoints.active" :text="this.stringFormat(this.totalProductDataPoints.active)"/>
                    <Label class="card-number text-left" v-else text="0"/>
                </FlexboxLayout>
                <FlexboxLayout width="170" flexDirection="column" align-items="flex-start">
                    <Label class="m-10 h4-card-block"  text="Total disable products"/>
                    <Label class="card-number text-left" v-if="this.totalProductDataPoints && this.totalProductDataPoints.disable" :text="this.stringFormat(this.totalProductDataPoints.disable)"/>
                    <Label class="card-number text-left" v-else text="0"/>
                </FlexboxLayout>
                <FlexboxLayout width="170" class="card-bg" flexDirection="column" align-items="flex-start">
                    <Label class="m-10 h4-card-block"  text="Total hidden products"/>
                    <Label class="card-number text-left" v-if="this.totalProductDataPoints && this.totalProductDataPoints.hidden" :text="this.stringFormat(this.totalProductDataPoints.hidden)"/>
                    <Label class="card-number text-left" v-else text="0"/>
                </FlexboxLayout>
            </StackLayout>
        </ScrollView>
        <ScrollView orientation="horizontal">
            <StackLayout class="m-t-10" orientation="horizontal">
                <FlexboxLayout width="170" class="card-bg p-b-15" flexDirection="column" align-items="flex-start">
                    <Label class="m-10 h4-card-block"  text="Active products"/>
                    <Label class="card-number text-left" v-if="this.product && this.product.active" :text="this.stringFormat(this.product.active)"/>
                    <Label class="card-number text-left" v-else text="0"/>
                    <Label class="m-10 h4-card-block c-success-text" v-if="this.diffActiveProduct > 0" width="50%" :text=" '+' + this.stringFormat(this.diffActiveProduct) + ' products'"/>
                    <Label class="m-10 h4-card-block c-danger" v-else-if="this.diffActiveProduct < 0" width="50%" :text="this.stringFormat(this.diffActiveProduct) + ' products'"/>
                </FlexboxLayout>
                <FlexboxLayout width="170" class="p-b-15" flexDirection="column" align-items="flex-start">
                    <Label class="m-10 h4-card-block"  text="Disable products"/>
                    <Label class="card-number text-left" v-if="this.product && this.product.disable" :text="this.stringFormat(this.product.disable)"/>
                    <Label class="card-number text-left" v-else text="0"/>
                    <Label class="m-10 h4-card-block c-success-text" v-if="this.diffDisableProduct > 0"  width="50%" :text="'+' + this.stringFormat(this.diffDisableProduct) + ' products'"/>
                    <Label class="m-10 h4-card-block c-danger" v-else-if="this.diffDisableProduct < 0" width="50%" :text="this.stringFormat(this.diffDisableProduct) + ' products'"/>
                </FlexboxLayout>
                <FlexboxLayout width="170" class="card-bg p-b-15" flexDirection="column" align-items="flex-start">
                    <Label class="m-10 h4-card-block"  text="Hidden products"/>
                    <Label class="card-number text-left" v-if="this.product && this.product.hidden" :text="this.stringFormat(this.product.hidden)"/>
                    <Label class="card-number text-left" v-else text="0"/>
                    <Label class="m-10 h4-card-block c-success-text" width="50%" v-if="this.diffHiddenProduct > 0" :text="'+' + this.stringFormat(this.diffHiddenProduct) + ' products'"/>
                    <Label class="m-10 h4-card-block c-danger" width="50%" v-if="this.diffHiddenProduct < 0" :text="this.stringFormat(this.diffHiddenProduct) + ' products'"/>
                </FlexboxLayout>
                <FlexboxLayout width="170" flexDirection="column" align-items="flex-start">
                    <Label class="m-10 h4-card-block"  text="Categories"/>
                    <Label class="card-number text-left" v-if="this.category && this.category.total"  :text="this.stringFormat(this.category.total)"/>
                    <Label class="card-number text-left" v-else text="0"/>
                    <Label class="m-10 h4-card-block c-success-text" width="50%" v-if="this.diffCategories > 0" :text="'+' + this.stringFormat(this.diffCategories) + ' products'"/>
                    <Label class="m-10 h4-card-block c-danger" width="50%"  v-else-if="this.diffCategories < 0" :text="this.stringFormat(this.diffCategories) + ' products'"/>
                </FlexboxLayout>
            </StackLayout>
        </ScrollView>
        <Gridlayout rows="auto">
            <Carousel class="m-l-10" height="320" width="100%" pageChanged="myChangeEvent" pageTapped="mySelectedEvent" indicatorColorUnselected="#404553" indicatorColor="#007afc" finite="true" bounce="false" showIndicator="true" verticalAlignment="top" android:indicatorAnimation="swap">
                <CarouselItem id="slide1" verticalAlignment="middle">
                    <Label class="h4-card-block m-10 text-left"  text="Total product by status"/>
                        <RadPieChart v-if="Boolean(this.totalProductPieGraphData.length)" height="200" allowAnimation="true" row="0">
                            <PieSeries v-tkPieSeries selectionMode="DataPoint" outerRadiusFactor="0.8" expandRadius="0.2" showLabels="true" valueProperty="count" legendLabel="title" :items="this.totalProductPieGraphData">
                                <PointLabelStyle v-tkPieLabelStyle margin="15"></PointLabelStyle>
                            </PieSeries>
                            <RadLegendView v-tkPieLegend position="Left" title="Product" offsetOrigin="TopRight" width="110" enableSelection="true"></RadLegendView>
                        </RadPieChart>
                        <FlexboxLayout v-else justifyContent="center" height="200">
                            <FlexboxLayout flexDirection="column" justifyContent="center">
                                <Image src="~/images/no_data.png" height="36" width="36" stretch="aspectFit" />
                                <Label class="c-grey-dark h4 m-t-5" text="No data Found" />
                            </FlexboxLayout>
                        </FlexboxLayout>
                </CarouselItem>
                <CarouselItem id="slide2" verticalAlignment="middle">
                    <Label class="h4-card-block m-10 text-left" text="Give period product by status"/>

                    <RadPieChart v-if="Boolean(this.productPieGraphData.length)" height="200" allowAnimation="true" row="0">
                        <PieSeries v-tkPieSeries selectionMode="DataPoint" outerRadiusFactor="0.8" expandRadius="0.2" showLabels="true" valueProperty="count" legendLabel="title" :items="this.productPieGraphData">
                            <PointLabelStyle v-tkPieLabelStyle margin="15"></PointLabelStyle>
                        </PieSeries>
                        <RadLegendView v-tkPieLegend position="Left" title="Product" offsetOrigin="TopRight" width="110" enableSelection="true"></RadLegendView>
                    </RadPieChart>
                    <FlexboxLayout v-else justifyContent="center" height="200">
                        <FlexboxLayout flexDirection="column" justifyContent="center">
                            <Image src="~/images/no_data.png" height="36" width="36" stretch="aspectFit" />
                            <Label class="c-grey-dark h4 m-t-5" text="No data Found" />
                        </FlexboxLayout>
                    </FlexboxLayout>
                </CarouselItem>
                <CarouselItem id="slide3" verticalAlignment="middle">
                    <Label class="h4-card-block m-10 text-left"  text="Compare period product by status"/>
                    <RadPieChart v-if="Boolean(this.compareProductPieGraphData.length)" height="200" allowAnimation="true" row="0">
                        <PieSeries v-tkPieSeries selectionMode="DataPoint" outerRadiusFactor="0.8" expandRadius="0.2" showLabels="true" valueProperty="count" legendLabel="title" :items="this.compareProductPieGraphData">
                            <PointLabelStyle v-tkPieLabelStyle margin="15"></PointLabelStyle>
                        </PieSeries>
                        <RadLegendView v-tkPieLegend position="Left" title="Product" offsetOrigin="TopRight" width="110" enableSelection="true"></RadLegendView>
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
    name: 'HomeProduct',
    mixins: [currency],
    computed: {
        ...mapState({
            totalProductDataPoints: state => state.dashboard.totalProduct,
            product: state => state.dashboard.product,
            category: state => state.dashboard.category,
            comparePeriodProduct: state => state.dashboard.comparePeriodProduct,
            comparePeriodCategory: state => state.dashboard.comparePeriodCategory,
            totalProductPieGraphData: state => state.dashboard.totalProductPieGraphData,
            totalCategory: state => state.dashboard.totalCategory,
            compareProductPieGraphData: state => state.dashboard.compareProductPieGraphData,
            productPieGraphData: state => state.dashboard.productPieGraphData
        }),
        totalProduct () {
            let total = 0
            for(let key in this.totalProductDataPoints) {
                 total = total + this.totalProductDataPoints[key];
            }
            return total || 0;
        }, 
        diffActiveProduct() {
            return this.product.active - this.comparePeriodProduct.active;
        },
        diffCategories() {
            return Number(this.category.total) - Number(this.comparePeriodCategory.category);
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
