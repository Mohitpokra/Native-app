<template lang="html">
<RadSideDrawer ref="drawer" drawerLocation="Left" @drawerClosed="onDrawerClosed()" @drawerOpened="onDrawerOpened()" :gesturesEnabled="gesturesEnabled">
    <Page class="action-bar" ~drawerContent>
        <slot name="drawerContent"></slot>
    </Page>
    <Frame ~mainContent>
        <slot name="mainContent"></slot>
    </Frame>
</RadSideDrawer>
</template>

<script>
import sideDrawer from "~/mixins/sideDrawer";
export default {
    mixins: [sideDrawer]
};
</script>

<style lang="css">
</style>
