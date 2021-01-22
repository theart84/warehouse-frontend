<template>
  <div id="app">
    <wh-top-bar />
<!--    <wh-layout />-->
    <router-view/>
  </div>
</template>

<script>
import WhTopBar from '@/components/TopBar.vue';
// import WhLayout from '@/components/StartScreen.vue';
import {actionTypes} from "@/store/modules/auth";

export default {
  name: 'WhApp',
  components: {
    // WhLayout,
    WhTopBar,
  },
  mounted() {
    this.$store.dispatch(actionTypes.getCurrentUser);
  }
};
</script>

<style scoped>

</style>
