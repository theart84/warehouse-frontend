<template>
  <div>
    <b-navbar class="bg-custom shadow" toggleable="lg" type="light" variant="faded" fixed="top">
      <b-navbar-brand :to="{name: 'home'}" class="text-white">Warehouse</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav :state="true">
        <b-navbar-nav class="ml-auto">
          <template v-if="isLoggedIn">
            <b-navbar-nav>
              <b-nav-form class="mr-4" @submit.prevent="onSubmit">
                <b-form-input
                    size="sm"
                    class="mr-sm-2"
                    placeholder="Поиск..."
                    v-model="searchInput"
                >
                </b-form-input>
                <b-button size="sm" class="my-2 my-sm-0" type="submit">Поиск</b-button>
              </b-nav-form>
              <b-nav-item><img class="avatar-image" src="https://placekitten.com/g/30/30"
                               alt="Kitten">&nbsp;{{ currentUser.username }}
              </b-nav-item>
              <b-nav-item :to="{name: 'information'}">Информация</b-nav-item>
              <b-nav-item :to="{name: 'content'}">Таблица</b-nav-item>
              <b-nav-item @click="logout">Выход</b-nav-item>
            </b-navbar-nav>
          </template>
          <template v-else>
            <b-nav-item>
              <router-link :to="{name: 'login'}" class="text-white">Авторизация</router-link>
            </b-nav-item>
            <b-nav-item>
              <router-link :to="{name: 'register'}" class="text-white">Регистрация</router-link>
            </b-nav-item>
          </template>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getterTypes, actionTypes } from '@/store/modules/auth';

import { actionTypes as actionTypesFromProduct } from '@/store/modules/product';

export default {
  name: 'WhTopBar',
  data() {
    return {
      searchInput: '',
      screenWidth: window.innerWidth > 700
    };
  },
  computed: {
    ...mapGetters({
      isLoggedIn: getterTypes.isLoggedIn,
      currentUser: getterTypes.currentUser,
    }),
  },
  methods: {
    logout() {
      this.$store.dispatch(actionTypes.logout).then(() => this.$router.push({ name: 'home' }));
    },
    onSubmit() {
      const requestURL = this.searchInput.split(' ').join('&');
      this.$store.dispatch(actionTypesFromProduct.searchProduct, requestURL)
        .then(() => {
          const path = this.$route.fullPath;
          if (path === '/search') {
            return;
          }
          this.$router.push({ name: 'search' });
        });
      this.searchInput = '';
      if (!this.screenWidth) {
        this.$root.$emit('bv::toggle::collapse', 'nav-collapse');
      }
    },
  },
};
</script>

<style scoped>
.bg-custom {
  background-color: #409EFF;
}

.navbar-light .navbar-nav .nav-link {
  color: #fff;
}

.navbar-light .navbar-nav .nav-link:hover {
  color: #ececec;
}

.avatar-image {
  border-radius: 50%;
}
</style>
