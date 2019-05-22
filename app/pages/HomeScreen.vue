<template lang="html">
<Page actionBarHidden="true" backgroundColor="#d7dfec">
    <DockLayout stretchLastChild="true" class="bg-image">
        <Label dock="left" width="10%"/>
            <Label dock="top" height="50%"/>
            <Label dock="right" width="10%"/>
            <StackLayout dock="center" height="50%">
            <StackLayout orientation="horizontal" verticalAlignment="center">
                <StackLayout class="m-20" verticalAlignment="center" orientation="horizontal">
                    <Image height="60" width="100" src="~/images/logo.png" />
                        <StackLayout verticalAlignment="center" orientation="vertical">
                        <Label class="h1 c-white" text="Shakedeal" />
                        <Label class="h6 c-l-white" text="Dashboard v1.0" />
                    </StackLayout>
                </StackLayout>
            </StackLayout>
            <StackLayout class="margin">
                <Button class="btn btn-outline outline-white" text="Existing User Login here" @tap="goToLogin"/>
            </StackLayout>
            </StackLayout>
        </DockLayout>       
    </Page>
</template>

<script>
import Login from "./Login";
import Home from "./Home";
import store from "../store"

export default {
    data() {
        return {}
    },
    computed: {},
    methods: {
        goToLogin() {
            this.$navigateTo(Login);
        }
    }
};
</script>

<style>
.m-1-card {
    margin: 20 10 10;
}

.bg-image {
    background-image: url("~/images/home.jpg");
}

.margin {
    margin-top: 40;
}

.c-l-white {
    color: rgb(255, 255, 255, 0.5);
}

.image-subheading {
    font-family: Avenir;
    font-size: 14px;
    font-weight: 500;
}

.f-dark {
    font-weight: 900;
}

.my-button:active {
    background-color: red;
    color: white;
}
</style>
