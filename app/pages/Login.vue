<template lang="html">
<Page backgroundColor="#d7dfec">
    <ActionBar class="action-bar">
        <GridLayout width="100%" columns="auto, *" rows="*">
            <Label class="action-bar-title m-l-20" text="Login"  col="1"></Label>
        </GridLayout>
    </ActionBar>
    <ScrollView>
        <CardView class="m-10">
            <GridLayout row="auto auto">
                <StackLayout row="0">
                    <StackLayout class="m-t-17 text-center">
                        <Label class="m-15 card-text" textWrap="true" text="If you’re an existing user please login to access the dashboard."></Label>
                        <Image horizontalAlignment="center" stretch="none" src="~/images/login.png" />>
                    </StackLayout>
                    <StackLayout>
                        <RadDataForm class="m-t-30" :source="person" :metadata="personMetadata" @propertyValidated="onPropertyValidated" />
                    </StackLayout>
                    <StackLayout>
                        <Button class="btn btn-primary" text="Login" @tap="login"></Button>
                    </StackLayout>
                </StackLayout>
                <ActivityIndicator class="p-10" color="#be8600" backgroundColor="rgba(0, 0, 0, 0.4)" borderRadius="50%" :visibility="activityIndicator ? 'visible' : 'collapsed'" height="100" width="100" busy="true" rowSpan="2"></ActivityIndicator>
            </GridLayout>
        </CardView>
    </ScrollView>
</Page>
</template>

<script>
import TopActionBar from "~/components/layout/TopActionBar.vue";
import Home from "./Home";
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
    EditorType,
    ValidationMode,
    CommitMode
} from "nativescript-ui-dataform";
import {
    format
} from "url";

export default {
    components: {
        TopActionBar
    },
    data() {
        return {
            actionBar: {
                title: "Login"
            },
            committedPerson: {
                email: null,
                password: null
            },
            errorMessage: null,
            person: {
                email: "",
                password: ""
            },
            personMetadata: {
                isReadOnly: false,
                commitMode: CommitMode.Immediate,
                validationMode: ValidationMode.Immediate,
                propertyAnnotations: [{
                        name: "email",
                        displayName: "Email",
                        index: 1,
                        editor: EditorType.Email,
                        validators: [{
                                name: "email",
                                params: {
                                    regEx: "/^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/",
                                    errorMessage: "Please provide a valid email."
                                }
                            },
                            {
                                name: "NonEmpty"
                            }
                        ]
                    },
                    {
                        name: "password",
                        displayName: "Password",
                        index: 1,
                        editor: EditorType.Password,
                        validators: [{
                                name: "MinimumLength",
                                params: {
                                    length: 6
                                }
                            },
                            {
                                name: "MaximumLength",
                                params: {
                                    length: 20
                                }
                            },
                            {
                                name: "NonEmpty"
                            }
                        ]
                    }
                ]
            }
        };
    },
    computed: {
        ...mapState({
            state: state => state,
            activityIndicator: state => state.ui.activityIndicator,
            isAuthenticate: state => state.auth.isAuthenticate
        }),
        loginError: {
            get() {
                if (!this.$store.state.alert.errorMessage) {
                    feedback.error({
                        title: "Error",
                        message: this.$store.state.alert.errorMessage
                    });
                }
                console.log("what is goi on");
                this.$store.commit('alert/clean');
                return this.$store.state.alert.errorMessage;
            }
        }
    },
    methods: {
        errorPopUp() {
            feedback.error({
                message: this.errorMessage
            });
        },
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
                this.committedPerson[propertyName] = validatedValue;
            }
        },
        login() {
            let formData = {
                email: this.committedPerson.email,
                password: this.committedPerson.password
            };
            if (formData.email && formData.password) {
                this.$store.commit("ui/setIndicator");
                this.$store.dispatch("auth/login", formData).then(resp => {
                    if (this.isAuthenticate) {
                        this.$navigateTo(Home);
                    }
                });
            } else if (!formData.password && !formData.email) {
                this.errorMessage = "Please provide valid value of Email & Password";
                this.errorPopUp();
            } else if (!formData.email) {
                this.errorMessage = "Please provide valid Email";
                this.errorPopUp();
            } else if (!format.password) {
                this.errorMessage = "Please provide valid Password";
                this.errorPopUp();
            } else {
                this.errorMessage = "Please provide valid fields";
                this.errorPopUp();
            }
        }
    }
};
</script>

<style>
.m-1-card {
    margin: 20 10 10;
}

.image-heading {
    font-size: 19px;
    font-weight: 900;
}

.image-subheading {
    font-family: Avenir;
    font-size: 14px;
    font-weight: 500;
}

.f-dark {
    font-weight: 900;
}
</style>
