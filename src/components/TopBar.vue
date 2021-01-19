<template>
  <div>
    <b-navbar class="bg-custom" toggleable="lg" type="light" variant="faded">
      <b-navbar-brand :to="{name: 'home'}" class="text-white">Warehouse</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <template v-if="isLoggedIn">
            <b-nav-item-dropdown :text="currentUser.username" right>
<!--              <b-dropdown-item href="#">Account</b-dropdown-item>-->
              <b-dropdown-item @click="logout">Logout</b-dropdown-item>
            </b-nav-item-dropdown>
          </template>
          <template v-else>
            <b-nav-item>
              <router-link :to="{name: 'login'}" class="text-white">Sign in</router-link>
            </b-nav-item>
            <b-nav-item>
              <router-link :to="{name: 'register'}" class="text-white">Sign up</router-link>
            </b-nav-item>
          </template>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import {getterTypes} from '@/store/modules/authorization';
import {actionTypes} from '@/store/modules/authorization';

export default {
  name: 'WhTopBar',
  computed: {
    ...mapGetters({
      isLoggedIn: getterTypes.isLoggedIn,
      currentUser: getterTypes.currentUser
    }),
  },
  methods: {
    logout() {
      this.$store.dispatch(actionTypes.logout).then(() => this.$router.push({name: 'home'}));
    }
  }
};
</script>

<style scoped>
.bg-custom {
  background-color: #409EFF;
}
</style>
