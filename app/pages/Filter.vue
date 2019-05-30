<template lang="html">
<Page backgroundColor="#d7dfec">
    <ActionBar class="action-bar">
        <GridLayout class="m-x-15" width="100%" columns="auto, auto, *" rows="*">
            <Label class="fas vertical-middle t-30 m-r-10" :text="`fa-long-arrow-alt-left` | fonticon" col="0"  @tap="$navigateBack"/>
            <Label class="action-bar-title" text="Date Range Selector"  col="1"/>
            <Label class="h3 c-white m-t-12" text="SAVE"  horizontalAlignment="right" col="2"  @tap="apply"/>
        </GridLayout>
    </ActionBar>
    <TabView tabBackgroundColor="#957f48"  tabTextColor="#e2cb95" androidSelectedTabHighlightColor="rgba(255, 255, 255, 0.38)" selectedTabTextColor="#ffffff" @selectedIndexChange="tabChange">
        <TabViewItem title="DAY" class="h4">
            <ScrollView>
                <StackLayout>
                    <CardView class="m-15" backgroundColor="#ffffff">
                        <StackLayout>

                            <StackLayout class="boring p-card">
                                <StackLayout orientation="horizontal">
                                    <Label class="fa p-2 t-20 fa-lg m-r-5" v-show="!cb1" :text="`fa-circle` | fonticon"  @tap="checkBox1"/>
                                    <Label class="fa p-2 t-20 fa-lg c-primary m-r-5" v-show="cb1" :text="`fa-dot-circle` | fonticon" @tap="checkBox1"/>
                                    <StackLayout verticalAlignment="bottom">
                                        <Label verticalAlignment="bottom" class="h4-filter-block" text="Today"/>
                                        <Label class="h6 p-t-2" :text="showDate.date1"/>
                                    </StackLayout>
                                </StackLayout>
                                <StackLayout class="m-t-15" orientation="horizontal">
                                    <Label class="fa  p-2 t-20 fa-lg m-r-5" v-show="!cb2" :text="`fa-circle` | fonticon"  @tap="checkBox2"/>
                                    <Label class="fa  p-2 t-20 fa-lg c-primary m-r-5" v-show="cb2" :text="`fa-dot-circle` | fonticon" @tap="checkBox2"/>
                                    <StackLayout>
                                        <Label class="h4-filter-block" text="Yesterday"/>
                                        <Label class="h6 p-t-2" :text="showDate.date2"/>
                                    </StackLayout>
                                </StackLayout>
                            </StackLayout>

                            <StackLayout class="boring p-card">
                                <GridLayout class="m-b-12" rows="auto" columns="*">
                                    <Label class="h4-filter-block m-l-10" horizontalAlignment="left" text="Compare"/>
                                    <Switch  color="#957f48" backgroundColor="#404553" :checked="comapreBlock" horizontalAlignment="right" @checkedChange="comapreBlock = $event.value" />
                                </GridLayout>
                                <StackLayout v-show="comapreBlock" orientation="horizontal">
                                    <Label class="fa  p-2 t-20 fa-lg m-r-5" v-show="!cbCompare1" :text="`fa-circle` | fonticon"  @tap="compareCheckBox1"/>
                                    <Label class="fa  p-2 t-20 fa-lg c-primary m-r-5" v-show="cbCompare1" :text="`fa-dot-circle` | fonticon" @tap="compareCheckBox1"/>
                                    <StackLayout>
                                        <Label class="h4-filter-block" text="Previous Day"/>
                                        <Label class="h6 p-t-2" :text="showCompareDate.date1"/>
                                    </StackLayout>
                                </StackLayout>
                                <StackLayout v-show="comapreBlock" class="m-t-15  m-b-15" orientation="horizontal">
                                    <Label class="fa  p-2 t-20 fa-lg m-r-5" v-show="!cbCompare2" :text="`fa-circle` | fonticon"  @tap="compareCheckBox2"/>
                                    <Label class="fa  p-2 t-20 fa-lg c-primary m-r-5" v-show="cbCompare2" :text="`fa-dot-circle` | fonticon" @tap="compareCheckBox2"/>
                                    <StackLayout>
                                        <Label class="h4-filter-block" text="Same day last year"/>
                                        <Label class="h6  p-t-2" :text="showCompareDate.date2"/>
                                </StackLayout>
                                </StackLayout>
                            </StackLayout>

                        </StackLayout>
                </CardView>
                </StackLayout>
            </ScrollView>
        </TabViewItem>
        <TabViewItem title="WEEK" class="h4">
            <ScrollView>
                <StackLayout>
                    <CardView class="m-15" backgroundColor="#ffffff">
                        <StackLayout>
                            <StackLayout class="boring p-card">
                                <StackLayout orientation="horizontal">
                                    <Label class="fa  p-2 t-20 fa-lg m-r-5" v-show="!cb1" :text="`fa-circle` | fonticon"  @tap="checkBox1"/>
                                    <Label class="fa  p-2 t-20 fa-lg c-primary m-r-5" v-show="cb1" :text="`fa-dot-circle` | fonticon" @tap="checkBox1"/>
                                    <StackLayout>
                                        <Label verticalAlignment="bottom" class="h4-filter-block" text="Last 7 Days"/>
                                        <Label class="h6 p-t-2" :text="showDate.date1"/>
                                    </StackLayout>
                                </StackLayout>
                                <StackLayout class="m-t-15" orientation="horizontal">
                                    <Label class="fa  p-2 t-20 fa-lg m-r-5" v-show="!cb2" :text="`fa-circle` | fonticon"  @tap="checkBox2"/>
                                    <Label class="fa  p-2 t-20 fa-lg c-primary m-r-5" v-show="cb2" :text="`fa-dot-circle` | fonticon" @tap="checkBox2"/>
                                    <StackLayout>
                                        <Label class="h4-filter-block" text="This week"/>
                                        <Label class="h6  p-t-2" :text="showDate.date2"/>
                                     </StackLayout>
                                </StackLayout>
                                <StackLayout class="m-t-15" orientation="horizontal">
                                    <Label class="fa  p-2 t-20 fa-lg m-r-5" v-show="!cb3" :text="`fa-circle` | fonticon"  @tap="checkBox3"/>
                                    <Label class="fa  p-2 t-20 fa-lg c-primary m-r-5" v-show="cb3" :text="`fa-dot-circle` | fonticon" @tap="checkBox3"/>
                                        <StackLayout>
                                            <Label class="h4-filter-block" text="Last week"/>
                                            <Label class="h6  p-t-2" :text="showDate.date3"/>
                                          </StackLayout>
                                </StackLayout>
                             </StackLayout>

                            <StackLayout class="boring p-card">
                                <GridLayout class="m-b-12" rows="auto" columns="*">
                                    <Label class="h4-filter-block m-l-10" horizontalAlignment="left" text="Compare"/>
                                    <Switch :checked="comapreBlock" color="#957f48" backgroundColor="#404553" horizontalAlignment="right" @checkedChange="comapreBlock = $event.value" />
                                </GridLayout>
                                <StackLayout v-show="comapreBlock" orientation="horizontal">
                                    <Label class="fa  p-2 t-20 fa-lg m-r-5" v-show="!cbCompare1" :text="`fa-circle` | fonticon"  @tap="compareCheckBox1"/>
                                    <Label class="fa  p-2 t-20 fa-lg c-primary m-r-5" v-show="cbCompare1" :text="`fa-dot-circle` | fonticon" @tap="compareCheckBox1"/>
                                    <StackLayout>
                                        <Label class="h4-filter-block" text="Previous Period"/>
                                        <Label class="h6 p-t-2" :text="showCompareDate.date1"/>
                                    </StackLayout>
                                </StackLayout>
                                <StackLayout v-show="comapreBlock" class="m-t-15  m-b-15" orientation="horizontal">
                                    <Label class="fa  p-2 t-20 fa-lg m-r-5" v-show="!cbCompare2" :text="`fa-circle` | fonticon"  @tap="compareCheckBox2"/>
                                    <Label class="fa  p-2 t-20 fa-lg c-primary m-r-5" v-show="cbCompare2" :text="`fa-dot-circle` | fonticon" @tap="compareCheckBox2"/>
                                    <StackLayout>
                                        <Label class="h4-filter-block" text="Same period last year"/>
                                        <Label class="h6  p-t-2" :text="showCompareDate.date2"/>
                                    </StackLayout>
                                </StackLayout>
                            </StackLayout>

                        </StackLayout>
                     </CardView>
                </StackLayout>
            </ScrollView>
        </TabViewItem>

        <TabViewItem title="MONTH" class="h4">
            <ScrollView>
                <StackLayout>
                    <CardView class="m-15" backgroundColor="#ffffff">
                        <StackLayout>
                            <StackLayout class="boring p-card">
                                <StackLayout orientation="horizontal">
                                    <Label class="fa  p-2 t-20 fa-lg m-r-5" v-show="!cb1" :text="`fa-circle` | fonticon"  @tap="checkBox1"/>
                                    <Label class="fa  p-2 t-20 fa-lg c-primary m-r-5" v-show="cb1" :text="`fa-dot-circle` | fonticon" @tap="checkBox1"/>
                                    <StackLayout>
                                        <Label verticalAlignment="bottom" class="h4-filter-block" text="Last 30 Days"/>
                                        <Label class="h6 p-t-2" :text="showDate.date1"/>
                                    </StackLayout>
                                 </StackLayout>

                                <StackLayout class="m-t-15" orientation="horizontal">
                                    <Label class="fa  p-2 t-20 fa-lg m-r-5" v-show="!cb2" :text="`fa-circle` | fonticon"  @tap="checkBox2"/>
                                    <Label class="fa  p-2 t-20 fa-lg c-primary m-r-5" v-show="cb2" :text="`fa-dot-circle` | fonticon" @tap="checkBox2"/>
                                    <StackLayout>
                                        <Label class="h4-filter-block" text="This Month"/>
                                        <Label class="h6  p-t-2" :text="showDate.date2"/>
                                    </StackLayout>
                                </StackLayout>

                                <StackLayout class="m-t-15" orientation="horizontal">
                                    <Label class="fa  p-2 t-20 fa-lg m-r-5" v-show="!cb3" :text="`fa-circle` | fonticon"  @tap="checkBox3"/>
                                    <Label class="fa  p-2 t-20 fa-lg c-primary m-r-5" v-show="cb3" :text="`fa-dot-circle` | fonticon" @tap="checkBox3"/>
                                    <StackLayout>
                                        <Label class="h4-filter-block" text="Last Month"/>
                                        <Label class="h6  p-t-2" :text="showDate.date3"/>
                                    </StackLayout>
                                </StackLayout>
                            </StackLayout>

                            <StackLayout class="boring p-card">
                                <GridLayout class="m-b-12" rows="auto" columns="*">
                                    <Label class="h4-filter-block m-l-10" horizontalAlignment="left" text="Compare"/>
                                    <Switch color="#957f48" backgroundColor="#404553" :checked="comapreBlock" horizontalAlignment="right" @checkedChange="comapreBlock = $event.value" />
                                </GridLayout>
                                <StackLayout v-show="comapreBlock" orientation="horizontal">
                                    <Label class="fa  p-2 t-20 fa-lg m-r-5" v-show="!cbCompare1" :text="`fa-circle` | fonticon"  @tap="compareCheckBox1"/>
                                        <Label class="fa  p-2 t-20 fa-lg c-primary m-r-5" v-show="cbCompare1" :text="`fa-dot-circle` | fonticon" @tap="compareCheckBox1"/>
                                        <StackLayout>
                                            <Label class="h4-filter-block" text="Previous Period"/>
                                            <Label class="h6 p-t-2" :text="showCompareDate.date1"/>
                                        </StackLayout>
                                </StackLayout>
                                <StackLayout v-show="comapreBlock" class="m-t-15  m-b-15" orientation="horizontal">
                                    <Label class="fa  p-2 t-20 fa-lg m-r-5" v-show="!cbCompare2" :text="`fa-circle` | fonticon"  @tap="compareCheckBox2"/>
                                    <Label class="fa  p-2 t-20 fa-lg c-primary m-r-5" v-show="cbCompare2" :text="`fa-dot-circle` | fonticon" @tap="compareCheckBox2"/>
                                    <StackLayout>
                                        <Label class="h4-filter-block" text="Same period last year"/>
                                        <Label class="h6  p-t-2" :text="showCompareDate.date2"/>
                                    </StackLayout>
                                </StackLayout>
                            </StackLayout>
                        </StackLayout>
                    </CardView>
                </StackLayout>
            </ScrollView>
        </TabViewItem>

        <TabViewItem title="Custom" class="h4">
            <ScrollView>
                <StackLayout>
                    <CardView class="m-15" backgroundColor="#ffffff">
                        <StackLayout>

                            <StackLayout class="boring p-card">
                                <RadDataForm class="m-t-30" id="form-filter" :source="person" :metadata="personMetadata" @propertyValidated="onPropertyValidated">
                                    <TKEntityProperty v-tkDataFormProperty name="startDate">
                                        <TKPropertyEditor v-tkEntityPropertyEditor type="DatePicker">
                                            <TKPropertyEditorStyle v-tkPropertyEditorStyle labelTextColor="black" labelTextSize="14" labelFontName="Avenir"></TKPropertyEditorStyle>
                                        </TKPropertyEditor>
                                    </TKEntityProperty>
                                    <TKEntityProperty v-tkDataFormProperty name="endDate">
                                        <TKPropertyEditor v-tkEntityPropertyEditor type="DatePicker">
                                            <TKPropertyEditorStyle v-tkPropertyEditorStyle  labelTextColor="black" labelTextSize="14" labelFontName="Avenir"></TKPropertyEditorStyle>
                                        </TKPropertyEditor>
                                    </TKEntityProperty>
                                </RadDataForm>
                            </StackLayout>

                            <StackLayout class="boring p-card">
                                <GridLayout class="m-b-12" rows="auto" columns="*">
                                    <Label class="h4-filter-block m-l-10" horizontalAlignment="left" text="Compare"/>
                                    <Switch color="#957f48" backgroundColor="#404553" :checked="comapreBlock" horizontalAlignment="right" @checkedChange="comapreBlock = $event.value" />
                                </GridLayout>
                                <StackLayout v-show="comapreBlock" orientation="horizontal">
                                    <Label class="fa  p-2 t-20 fa-lg m-r-5" v-show="!cbCompare1" :text="`fa-circle` | fonticon"  @tap="compareCheckBox1"/>
                                    <Label class="fa  p-2 t-20 fa-lg c-primary m-r-5" v-show="cbCompare1" :text="`fa-dot-circle` | fonticon" @tap="compareCheckBox1"/>
                                    <StackLayout>
                                        <Label class="h4-filter-block" text="Previous Day"/>
                                         <Label class="h6 p-t-2" :text="showCompareDate.date1"/>
                                    </StackLayout>
                                  </StackLayout>
                                <StackLayout v-show="comapreBlock" class="m-t-15  m-b-15" orientation="horizontal">
                                    <Label class="fa  p-2 t-20 fa-lg m-r-5" v-show="!cbCompare2" :text="`fa-circle` | fonticon"  @tap="compareCheckBox1"/>
                                    <Label class="fa  p-2 t-20 fa-lg c-primary m-r-5" v-show="cbCompare2" :text="`fa-dot-circle` | fonticon" @tap="compareCheckBox1"/>
                                    <StackLayout>
                                        <Label class="h4-filter-block" text="Same day last year"/>
                                        <Label class="h6  p-t-2" :text="showCompareDate.date2"/>
                                     </StackLayout>
                                </StackLayout>
                            </StackLayout>
                        </StackLayout>
                    </CardView>
                    
                </StackLayout>
            </ScrollView>
        </TabViewItem>
    </TabView>
</Page>
</template>

<script>
import sideDrawer from "~/mixins/sideDrawer";
import {
    LinearAxis
} from "nativescript-ui-chart";
import TopActionBar from "~/components/layout/TopActionBar.vue";
import {
    EditorType,
    ValidationMode,
    CommitMode
} from "nativescript-ui-dataform";

import {
    mapState
} from "vuex";

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
    FILTER_ERROR,
    FILTER_SUCCESS,
    FILTER_OUTOF_RANGE
} from '../store/message.js';
import Home from "./Home";

export default {
    mixins: [sideDrawer],
    components: {
        TopActionBar
    },
    data() {
        return {
            errorMessage: null,
            foo: false,
            // To show radion button
            cb1: false,
            cb2: false,
            cb3: false,
            // To show compare block radion button
            cbCompare1: false,
            cbCompare2: false,
            cbCompare3: false,
            tabIndex: 0,
            actionBar: {
                title: "Date Range Selector"
            },
            // Date Which is displaying in html
            showDate: {
                date1: null,
                date2: null,
                date3: null
            },
            // Date Which is displayin in html compare Block
            showCompareDate: {
                date1: null,
                date2: null,
                date3: null,
            },
            // Selected date which need to be send in backend
            selectedDate: {
                start: null,
                end: null
            },
            // Selected compare date which need to be send in backend
            selectedCompareDate: {
                start: null,
                end: null
            },
            // Custome Date form
            person: {
                startDate: this.$moment().subtract(7, 'days'),
                endDate: this.$moment()
            },
            committedPerson: {
                startDate: +this.$moment().subtract(7, 'days'),
                endDate: +this.$moment()
            },
            personMetadata: {
                isReadOnly: false,
                commitMode: CommitMode.Immediate,
                validationMode: ValidationMode.Immediate,
                propertyAnnotations: [{
                        name: "startDate",
                        displayName: "Start Date",
                        index: 0,
                        editor: EditorType.DatePicker,
                        validators: [{
                            name: "NonEmpty"
                        }],
                    },
                    {
                        name: "endDate",
                        displayName: "End Date",
                        index: 1,
                        editor: EditorType.DatePicker,
                        validators: [{
                            name: "NonEmpty"
                        }],
                    }
                ]
            }
        };
    },
    watch: {
        erroMessage(newValue) {
            if (newValue) {
                feedback.error({
                    message: newValue
                });
            }
        },
        SuccessMessage(newValue) {
            feedback.success({
                message: newValue
            });
        }
    },
    computed: {
        ...mapState({
            state: state => state,
            activityIndicator: state => state.ui.activityIndicator,
            erroMessage: state => state.alert.errorMessage,
            SuccessMessage: state => state.alert.successMessage,
        }),
        comapreBlock: {
            get() {
                return this.$store.state.dashboard.compare;
            },
            set(newValue) {
                this.$store.commit('dashboard/setCompareFilter', {
                    compare: newValue
                })
            }
        }
    },
    methods: {
        onPropertyValidated({
            object,
            propertyName,
            entityProperty
        }) {
            const validatedValue = entityProperty.valueCandidate;
            const validationResult = entityProperty.isValid;
            if (!validationResult) {
                this.committedPerson[propertyName] = null;
            } else {
                alert(propertyName);
                this.committedPerson[propertyName] = +new Date(Number(validatedValue));
                alert(this.committedPerson[propertyName]);
                let diff = Number(this.$moment(this.committedPerson.endDate).diff(this.$moment(this.committedPerson.startDate), 'days')) + 1;
                alert(diff);
                // let diff = Number(this.$moment.duration(this.committedPerson.endDate - this.committedPerson.startDate).days());
                this.showCompareDate.date1 = `${this.$moment(this.committedPerson.startDate).subtract(diff, 'd').format('ddd MMM D')} - ${this.$moment(this.committedPerson.startDate).subtract(1, 'd').format('ddd MMM D')}`;
                this.showCompareDate.date2 = `${this.$moment(this.committedPerson.startDate).subtract(1, 'y').format('ddd MMM D')} - ${this.$moment(this.committedPerson.endDate).subtract(1, 'y').format('ddd MMM D')}`;
                this.selectedDate.start = +this.committedPerson.startDate;
                this.selectedDate.end = +this.committedPerson.endDate;
            }
        },
        tabChange(args) {
            this.tabIndex = args.value;
            this.cb1 = true;
            this.cb2 = false;
            this.cb3 = false;
            this.cbCompare1 = true;
            this.cbCompare2 = false;
            this.cbCompare3 = false;

            switch (this.tabIndex) {
                case 0:
                    this.showDate.date1 = this.$moment().format('ddd MMM D');
                    this.showDate.date2 = this.$moment().subtract(1, 'd').format('ddd MMM D');

                    // By default first checbox is selected
                    this.showCompareDate.date1 = this.$moment().subtract(1, 'd').format('ddd MMM D');
                    this.showCompareDate.date2 = this.$moment().subtract(1, 'y').format('ddd MMM D');

                    this.selectedDate.start = +this.$moment();
                    this.selectedDate.end = +this.$moment();

                    // this.selectedCompareDate.start = +this.$moment().subtract(1, 'd');
                    // this.selectedCompareDate.end = +this.$moment().subtract(1, 'd');
                    break;

                case 1:
                    this.showDate.date1 = `${this.$moment().subtract(7, 'd').add(1, 'd').format('ddd MMM D')} - ${this.$moment().format('ddd MMM D')}`;
                    this.showDate.date2 = `${this.$moment().startOf('week').format("ddd MMM D")} - ${this.$moment().format('ddd MMM D')}`;
                    this.showDate.date3 = `${this.$moment().subtract(7, 'd').startOf('week').format("ddd MMM D")} - ${this.$moment().startOf('week').subtract(1, 'd').format("ddd MMM D")}`;

                    // By default first checbox is selected
                    this.showCompareDate.date1 = `${this.$moment().subtract(14, 'd').add(1, 'd').format('ddd MMM D')} - ${this.$moment().subtract(7, 'd').format('ddd MMM D')}`;
                    this.showCompareDate.date2 = `${this.$moment().subtract(7, 'd').add(1, 'd').subtract(1, 'y').format('ddd MMM D')} - ${this.$moment().subtract(1, 'y').format('ddd MMM D')}`;

                    this.selectedDate.start = +this.$moment().subtract(7, 'd').add(1, 'd');
                    this.selectedDate.end = +this.$moment();

                    // this.selectCompareDate.start = +this.$moment().subtract(14, 'd');
                    // this.selectCompareDate.end = +this.$moment().subtract(7, 'd').subtract(1, 'd');
                    // console.log("start", this.selectCompareDate.start);
                    // console.log("end", this.selectCompareDate.end)

                    break;

                case 2:
                    this.showDate.date1 = `${this.$moment().subtract(30, 'd').add(1, 'd').format('ddd MMM D')} - ${this.$moment().format('ddd MMM D')}`;
                    this.showDate.date2 = `${this.$moment().startOf('month').format("ddd MMM D")} - ${this.$moment().format('ddd MMM D')}`;
                    this.showDate.date3 = `${this.$moment().subtract(1, 'months').startOf('month').format("ddd MMM D")} - ${this.$moment().startOf('month').subtract(1, 'd').format("ddd MMM D")}`;

                    // By default first checbox is selected
                    this.showCompareDate.date1 = `${this.$moment().subtract(60, 'd').add(1, 'd').format('ddd MMM D')} - ${this.$moment().subtract(30, 'd').format('ddd MMM D')}`;
                    this.showCompareDate.date2 = `${this.$moment().subtract(30, 'd').add(1, 'd').subtract(1, 'y').format('ddd MMM D')} - ${this.$moment().format('ddd MMM D')}`;

                    this.selectedDate.start = +this.$moment().subtract(30, 'd').add(1, 'd');
                    this.selectedDate.end = +this.$moment();

                    // this.selectCompareDate.start = +this.$moment().subtract(60, 'd');
                    // this.selectCompareDate.end = +this.$moment().subtract(30, 'd').subtract(1, 'd');

                    // console.log("start", this.selectCompareDate.start);
                    // console.log("end", this.selectCompareDate.end)

                    break;
                case 3:

                    this.committedPerson.startDate = +this.$moment().subtract(7, 'days');
                    this.committedPerson.endDate = +this.$moment();

                    // let diff = Number(this.$moment.duration(this.committedPerson.endDate - this.committedPerson.startDate).days());
                    let diff = Number(this.$moment(this.committedPerson.endDate).diff(this.$moment(this.committedPerson.startDate), 'days')) + 1;

                    this.showCompareDate.date1 = `${this.$moment(this.committedPerson.startDate).subtract(diff, 'd').format('ddd MMM D')} - ${this.$moment(this.committedPerson.startDate).subtract(1, 'd').format('ddd MMM D')}`;
                    this.showCompareDate.date2 = `${this.$moment(this.committedPerson.startDate).subtract(1, 'y').format('ddd MMM D')} - ${this.$moment(this.committedPerson.endDate).subtract(1, 'y').format('ddd MMM D')}`;

                    // By default first checbox is selected
                    this.selectedDate.start = this.committedPerson.startDate;
                    this.selectedDate.end = this.committedPerson.endDate;

                    this.selectedCompareDate.start = +this.$moment(this.committedPerson.startDate).subtract(diff, 'd');
                    this.selectedCompareDate.end = +this.$moment(this.committedPerson.startDate).subtract(1, 'd');
                    // console.log("start", this.selectCompareDate.start);
                    // console.log("end", this.selectCompareDate.end)

            }
        },
        chooseCompareDate() {
            if (this.cbCompare1) {
                switch (this.tabIndex) {
                    case 0:
                        this.selectedCompareDate.start = +this.$moment(this.selectedDate.start).subtract(1, 'd');
                        this.selectedCompareDate.end = +this.$moment(this.selectedDate.start).subtract(1, 'd');
                        break;
                    case 1:
                        this.selectedCompareDate.start = +this.$moment(this.selectedDate.start).subtract(7, 'd');
                        this.selectedCompareDate.end = +this.$moment(this.selectedDate.start).subtract(1, 'd');
                        break;
                    case 2:
                        this.selectedCompareDate.start = +this.$moment(this.selectedDate.start).subtract(30, 'd');
                        this.selectedCompareDate.end = +this.$moment(this.selectedDate.start).subtract(1, 'd');
                        break;
                    case 3:
                        // let diff = Number(this.$moment.duration(this.committedPerson.endDate - this.committedPerson.startDate).days());
                        let diff = this.$moment(this.committedPerson.endDate).diff(this.$moment(this.committedPerson.startDate), 'days') + 1;
                        this.selectedCompareDate.start = +this.$moment(this.committedPerson.startDate).subtract(diff, 'd');
                        this.selectedCompareDate.end = +this.$moment(this.committedPerson.startDate).subtract(1, 'd');

                }
            } else if (this.cbCompare2) {
                switch (this.tabIndex) {
                    case 0:
                        this.selectedCompareDate.start = +this.$moment(this.selectedDate.start).subtract(1, 'y');
                        this.selectedCompareDate.end = +this.$moment(this.selectedDate.start).subtract(1, 'y');
                        break;
                    case 1:
                        this.selectedCompareDate.start = +this.$moment(this.selectedDate.start).subtract(1, 'y');
                        this.selectedCompareDate.end = +this.$moment(this.selectedDate.end).subtract(1, 'y');
                        break;
                    case 2:
                        this.selectedCompareDate.start = +this.$moment(this.selectedDate.start).subtract(1, 'y');
                        this.selectedCompareDate.end = +this.$moment(this.selectedDate.end).subtract(1, 'y');
                        break;
                    case 3:
                        // let diff = Number(this.$moment.duration(this.committedPerson.endDate - this.committedPerson.startDate).days());
                        let diff = this.$moment(this.committedPerson.endDate).diff(this.$moment(this.committedPerson.startDate), 'days') + 1;
                        this.selectedCompareDate.start = +this.$moment(this.committedPerson.startDate).subtract(1, 'y');
                        this.selectedCompareDate.end = +this.$moment(this.committedPerson.end).subtract(1, 'y');

                }
            }
        },
        changeComparePeriod() {
            if (this.cb1) {
                switch (this.tabIndex) {
                    case 0:
                        this.showCompareDate.date1 = this.$moment().subtract(1, 'd').format('ddd MMM D');
                        this.showCompareDate.date2 = this.$moment().subtract(1, 'y').format('ddd MMM D');

                        this.selectedDate.start = +this.$moment();
                        this.selectedDate.end = +this.$moment();

                        break;
                    case 1:
                        this.showCompareDate.date1 = `${this.$moment().subtract(14, 'd').add(1, 'd').format('ddd MMM D')} - ${this.$moment().subtract(7, 'd').format('ddd MMM D')}`;
                        this.showCompareDate.date2 = `${this.$moment().subtract(7, 'd').add(1, 'd').subtract(1, 'y').format('ddd MMM D')} - ${this.$moment().subtract(1, 'y').format('ddd MMM D')}`;

                        this.selectedDate.start = +this.$moment().subtract(7, 'd').add(1, 'd');
                        this.selectedDate.end = +this.$moment();

                        break;
                    case 2:
                        this.showCompareDate.date1 = `${this.$moment().subtract(60, 'd').add(1, 'd').format('ddd MMM D')} - ${this.$moment().subtract(30, 'd').format('ddd MMM D')}`;
                        this.showCompareDate.date2 = `${this.$moment().subtract(30, 'd').add(1, 'd').subtract(1, 'y').format('ddd MMM D')} - ${this.$moment().subtract(1, 'y').format('ddd MMM D')}`;

                        this.selectedDate.start = +this.$moment().subtract(30, 'd').add(1, 'd');
                        this.selectedDate.end = +this.$moment();

                }
            } else if (this.cb2) {
                switch (this.tabIndex) {
                    case 0:
                        this.showCompareDate.date1 = this.$moment().subtract(1, 'd').subtract(1, 'd').format('ddd MMM D');
                        this.showCompareDate.date2 = this.$moment().subtract(1, 'd').subtract(1, 'y').format('ddd MMM D');

                        this.selectedDate.start = +this.$moment().subtract(1, 'd');
                        this.selectedDate.end = +this.$moment().subtract(1, 'd');
                        break;
                    case 1:
                        this.showCompareDate.date1 = `${this.$moment().startOf('week').subtract(7, 'd').format('ddd MMM D')} - ${this.$moment().startOf('week').subtract(1, 'd').format("ddd MMM D")}`;
                        this.showCompareDate.date2 = `${this.$moment().startOf('week').subtract(1, 'y').format("ddd MMM D")} - ${this.$moment().subtract(1, 'y').format('ddd MMM D')}`;

                        this.selectedDate.start = +this.$moment().startOf('week');
                        this.selectedDate.end = +this.$moment();
                        break;
                    case 2:
                        this.showCompareDate.date1 = `${this.$moment().startOf('month').subtract(1, 'M').format('ddd MMM D')} - ${this.$moment().startOf('month').subtract(1, 'd').format("ddd MMM D")}`;
                        this.showCompareDate.date2 = `${this.$moment().startOf('month').subtract(1, 'y').format("ddd MMM D")} - ${this.$moment().subtract(1, 'y').format('ddd MMM D')}`;

                        this.selectedDate.start = +this.$moment().startOf('month');
                        this.selectedDate.end = +this.$moment();
                }
            } else if (this.cb3) {
                switch (this.tabIndex) {
                    case 1:
                        this.showCompareDate.date1 = `${this.$moment().startOf('week').subtract(14, 'd').format('ddd MMM D')} - ${this.$moment().startOf('week').subtract(7, 'd').subtract(1, 'd').format("ddd MMM D")}`;
                        this.showCompareDate.date2 = `${this.$moment().startOf('week').subtract(7, 'd').subtract(1, 'y').format("ddd MMM D")} - ${this.$moment().startOf('week').subtract(1, 'd').subtract(1, 'y').format('ddd MMM D')}`;

                        this.selectedDate.start = +this.$moment().subtract(7, 'd').startOf('week');
                        this.selectedDate.end = +this.$moment().startOf('week').subtract(1, 'd');
                        break;
                    case 2:
                        this.showCompareDate.date1 = `${this.$moment().startOf('month').subtract(2, 'month').format('ddd MMM D')} - ${this.$moment().startOf('month').subtract(1, 'month').subtract(1, 'd').format("ddd MMM D")}`;
                        this.showCompareDate.date2 = `${this.$moment().startOf('month').subtract(1, 'month').startOf('month').subtract(1, 'y').format("ddd MMM D")} - ${this.$moment().startOf('month').subtract(1, 'month').endOf('month').subtract(1, 'y').format('ddd MMM D')}`;

                        this.selectedDate.start = +this.$moment().subtract(1, 'months').startOf('month');
                        this.selectedDate.end = +this.$moment().startOf('month').subtract(1, 'd');
                }
            }
        },
        checkBox1() {
            if (this.cb1) {
                this.cb1 = false;
                this.cb2 = true;
                this.cb3 = false;
                this.changeComparePeriod();
            } else {
                this.cb1 = true;
                this.cb2 = false;
                this.cb3 = false;
                this.changeComparePeriod();
            }
        },
        checkBox2() {
            if (this.cb2) {
                this.cb1 = false;
                this.cb2 = false;
                this.cb3 = true;
                this.changeComparePeriod();
            } else {
                this.cb2 = true;
                this.cb1 = false;
                this.cb3 = false;
                this.changeComparePeriod();
            }
        },
        checkBox3() {
            if (this.cb3) {
                this.cb2 = false;
                this.cb3 = false;
                this.cb1 = true;
                this.changeComparePeriod();
            } else {
                this.cb3 = true;
                this.cb1 = false;
                this.cb2 = false;
                this.changeComparePeriod();
            }
        },
        compareCheckBox1() {
            if (this.cbCompare1) {
                this.cbCompare1 = false;
                this.cbCompare2 = true;
            } else {
                this.cbCompare1 = true;
                this.cbCompare2 = false;
            }

        },
        compareCheckBox2() {
            if (this.cbCompare2) {
                this.cbCompare1 = true;
                this.cbCompare2 = false;
            } else {
                this.cbCompare2 = true;
                this.cbCompare1 = false;
            }
        },
        apply() {
            this.chooseCompareDate();

            if (this.selectedDate.end > +this.$moment() || this.selectedDate.start > +this.$moment) {
                feedback.error({
                    title: "Error",
                    message: FILTER_OUTOF_RANGE
                });
                return;
            }

            if (this.selectedDate.end < this.selectedDate.start) {
                this.errorMessage = FILTER_ERROR;
                return;
            } else {
                if (this.tabIndex == 2) {
                    if (this.cb2 || this.cb3) {
                        this.$store.commit('dashboard/setMonthFilter', true);
                        this.$store.commit('dashboard/setWeekFilter', false);
                    } else {
                        this.$store.commit('dashboard/setMonthFilter', false);
                    }
                } else if (this.tabIndex == 1) {
                    if (this.cb2 || this.cb3) {
                        this.$store.commit('dashboard/setWeekFilter', true);
                        this.$store.commit('dashboard/setMonthFilter', false);
                    } else {
                        this.$store.commit('dashboard/setWeekFilter', false);
                    }
                } else {
                    this.$store.commit('dashboard/setMonthFilter', false);
                }
                this.$store.commit("dashboard/setFilterDate", {
                    selectedDate: this.selectedDate,
                    selectedCompareDate: this.selectedCompareDate
                });
                this.$store.commit("alert/clean")
                this.$store.commit("alert/success", FILTER_SUCCESS);
                this.$navigateTo(Home);
            }

        }
    }
};
</script>

<style>
.p-card {
    padding: 20 10;
}

#form-filter {
    border-bottom-width: 1;
    border-bottom-color: transparent;
}
</style>
