<template>
  <div class="indent-top">
    <div class="container">
      <div class="card mx-auto shadow-sm mt-5" style="max-width: 35rem;">
        <h1 class="text-center text-secondary mt-2">Авторизация</h1>
        <p class="text-center mt-3">
          <router-link class="text-secondary"
                       :to="{name: 'register'}"
          >
            Нужен аккаунт?
          </router-link>
        </p>
        <form @submit.prevent="onSubmit">
          <div class="form-group ml-3 mr-4">
            <label for="loginEmail">Электронный адрес</label>
            <input type="email"
                   class="form-control"
                   id="loginEmail"
                   required
                   v-model="email"
            >
          </div>
          <div class="form-group ml-3 mr-3">
            <label for="loginPassword">Пароль</label>
            <input type="password"
                   class="form-control"
                   id="loginPassword"
                   required
                   v-model="password"
            >
          </div>
          <div class="form-group ml-auto text-right mr-3">
            <button type="submit"
                    class="btn btn-primary"
                    :disabled="isSubmitting"
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
import { mapState } from 'vuex';

export default {
  name: 'WhLogin',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  computed: {
    ...mapState({
      isSubmitting: (state) => state.auth.isSubmitting,
      validationErrors: (state) => state.auth.validationErrors,
    }),
  },
  watch: {
    validationErrors: 'showError',
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
    showError() {
      if (this.validationErrors) {
        this.$bvToast.toast(`${this.validationErrors.message}`, {
          title: 'Information',
          solid: true,
          variant: 'danger',
        });
      }
    },
  },
};
</script>

<style scoped>

</style>
