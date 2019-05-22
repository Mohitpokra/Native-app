<template>
<ScrollView class="bg-dark">
    <DockLayout stretchLastChild="true">
        <StackLayout dock="top">
            <GridLayout columns="40%, *" @tap="closeDrawer()">
                <Label col="1" class="action-bar-title" text="Shakedeal"/>
            </GridLayout>
            <StackLayout orientation="horizontal" class="m-b-15 m-t-8 p-20 bg-photo-container">
                <StackLayout
                  horizontalAlignment="left"
                  class="profile-photo-container"
                  width="80"
                  height="80"
                >
                    <Image
                      class="profile-photo text-center"
                      width="70"
                      height="70"
                      stretch="fill"
                      src="~/images/profile.png"
                    />
                </StackLayout>
                <StackLayout class="m-l-15" verticalAlignment="middle">
                    <Label class="h3 c-white" text="Jason Marz"/>
                </StackLayout>
                <StackLayout class="m-l-15" verticalAlignment="middle">
                </StackLayout>
            </StackLayout>
        </StackLayout>
        <GridLayout class="bg-trans" dock="bottom" columns="40%, *">
            <Label col="0" class="fas vertical-middle m-l-20" fontSize="16" :text="'fa-power-off' | fonticon"/>
            <Label col="1" class="drawer-text" text="Logout" @tap="logout()"/>
       </GridLayout>
      <ScrollView dock="center">
          <ListView for="page in pages" separatorColor="transparent">
              <v-template>
                  <GridLayout columns="40%, *" @tap="goToPage(page.component)">
                      <Label
                        col="0"
                        :class="`vertical-middle m-l-20 ${[page.iconClass]}`"
                        fontSize="16"
                        :text="page.text | fonticon"
                      />
                      <Label col="1" class="drawer-text" :text="page.name"/>
                  </GridLayout>
              </v-template>
          </ListView>
      </ScrollView>
  </DockLayout>
</ScrollView>
</template>

<script>
import sideDrawer from "~/mixins/sideDrawer";
import {
    Login
} from '../../router/index'
import {
    parse
} from "path";
export default {
    mixins: [sideDrawer],
    data() {
        return {
            // define our pages, making sure the component matches that defined in /app/router/index.js
            pages: [{
                name: "Dashboard",
                component: this.$routes.Home,
                iconClass: "fas",
                text: "fa-tachometer-alt"
            }]
        };
    },
    methods: {
        goToPage(pageComponent) {
            // use the manual navigation method
            this.$navigateTo(pageComponent);
            // and we probably want to close the drawer when changing pages
            this.closeDrawer();
        },
        goToProfile() {
            this.$navigateTo(this.$routes.Profile);
            this.closeDrawer();
        },
        logout() {
            this.closeDrawer();
            this.$store.commit("auth/loginFail");
            this.$store.commit("ui/resetGesturesEnabled");
            this.$navigateTo(this.$routes.Login);
        }
    }
};
</script>

<style>
.bg-dark {
    background-color: #404553
}

.bg-trans {
    background-color: rgba(255, 255, 255, 0.12);
}

.drawer-text {
    font-family: 'AvenirNextLTPro';
    font-size: 14;
    margin: 12 15;
    font-weight: 900;
    color: #ffffff;
}

.image-sub-text {
    font-size: 12;
    font-weight: 900;
    color: rgb(255, 255, 255, 0.5);
}

.action-bar-title {
    margin: 12 15;
    font-weight: 500;
    font-size: 18;
    font-family: 'AvenirNextLTPro';
    color: #ffffff;
}

.profile-photo-container {
    border-width: 1.5;
    border-color: transparent;
    border-radius: 50%;
    padding: 5;
    box-sizing: border-box;
}

.profile-photo {
    border-radius: 50%;
}

.bg-photo-container {
    background-color: rgb(0, 0, 0, 0.2);
}
</style>
