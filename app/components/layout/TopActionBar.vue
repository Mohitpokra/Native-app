<template>
    <ActionBar class="action-bar" @tap="openDrawer()">
      <GridLayout width="100%" columns="auto, *" rows="*">
        <Label class="fas vertical-middle t-25 m-r-10" :text="`fa-bars` | fonticon" />
        <Label class="action-bar-title m-l-20" :text="data.title"  col="1"></Label>
      </GridLayout>
    </ActionBar>
</template>

<script>
import sideDrawer from "~/mixins/sideDrawer";
export default {
    mixins: [sideDrawer],
    props: ['data']
}
</script>

<style scoped>

</style>