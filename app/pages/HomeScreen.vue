<template lang="html">
<Page actionBarHidden="true" backgroundColor="#d7dfec">
    <DockLayout stretchLastChild="true" class="bg-image">
            <Label dock="left" width="5%"/>
            <Label dock="top" height="50%"/>
            <Label dock="right" width="5%"/>
            <StackLayout dock="center" height="50%">
            <StackLayout orientation="horizontal" verticalAlignment="center">
            </StackLayout>
            <StackLayout class="margin">
                <Button class="btn btn-primary h3 w-500 c-white" text="Existing User Login here" @tap="goToLogin"/>
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
            this.$navigateTo(Login, {
                    transition: {
                        name: "slideLeft",
                        curve: "easeIn",
                        duration: 1000
                    }
            });
        }
    }
};
</script>

<style>
.m-1-card {
    margin: 20 10 10;
}

.bg-image {
    background-image: url("res://home");
     background-position: center; 
}

.margin {
    margin-top: 110;
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
