<template>
  <div id="app">
    <wh-top-bar />
    <router-view/>
  </div>
</template>

<script>
import WhTopBar from '@/components/TopBar.vue';
import {actionTypes} from "@/store/modules/auth";

export default {
  name: 'WhApp',
  components: {
    WhTopBar,
  },
  mounted() {
    this.$store.dispatch(actionTypes.getCurrentUser);
  }
};
</script>

<style>
.indent-top {
  padding-top: 50px;
}
</style>
