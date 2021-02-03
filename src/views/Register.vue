<template>
  <div class="indent-top">
    <div class="container">
      <div class="card mx-auto shadow-sm mt-5" style="max-width: 35rem;">
        <h1 class="text-center text-secondary mt-2">Авторизация</h1>
        <p class="text-center mt-3">
          <router-link class="text-secondary"
                       :to="{name: 'login'}"
          >
            Уже есть аккаунт?
          </router-link>
        </p>
        <form @submit.prevent="onSubmit">
          <div class="form-group ml-3 mr-4">
            <label for="emailRegister">Электронный адрес</label>
            <input type="email"
                   class="form-control"
                   id="emailRegister"
                   required
                   v-model="email"
            >
          </div>
          <div class="form-group ml-3 mr-4">
            <label for="usernameRegister">Имя пользователя</label>
            <input type="text"
                   class="form-control"
                   id="usernameRegister"
                   required
                   v-model="username"
            >
          </div>
          <div class="form-group ml-3 mr-3">
            <label for="passwordRegister">Пароль</label>
            <input type="password"
                   class="form-control"
                   id="passwordRegister"
                   required
                   v-model="password"
            >
          </div>
          <div class="form-group ml-auto text-right mr-3">
            <button type="submit"
                    class="btn btn-primary"
                    disabled="disabled"
            >
              Принять
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { actionTypes } from '@/store/modules/auth';

export default {
  name: 'WhRegister',
  data() {
    return {
      email: '',
      username: '',
      password: '',
    };
  },
  methods: {
    onSubmit() {
      this.$store.dispatch(actionTypes.login, {
        email: this.email,
        password: this.password,
      }).then(() => {
        this.$router.push({ name: 'information' });
      });
    },
  },
};
</script>

<style scoped>

</style>
