<template>
  <div class="indent-top">
    <div class="container">
      <div class="card mx-auto shadow-sm mt-5" style="max-width: 35rem;">
        <h1 class="text-center text-secondary mt-2">Регистрация</h1>
        <p class="text-center mt-3">
          <router-link class="text-secondary"
                       :to="{name: 'login'}"
          >
            Уже есть аккаунт?
          </router-link>
        </p>
        <form
            @submit.prevent="onSubmit"
            novalidate="true"
        >
          <div class="form-group ml-3 mr-4">
            <label for="emailRegister">Электронный адрес</label>
            <input type="email"
                   class="form-control"
                   id="emailRegister"
                   required
                   v-model.lazy="form.email"
            >
            <p class="validation" v-if="!emailIsValid">Введите корректный email</p>
          </div>
          <div class="form-group ml-3 mr-4">
            <label for="usernameRegister">Имя пользователя</label>
            <input type="text"
                   class="form-control"
                   id="usernameRegister"
                   required
                   v-model.lazy="form.username"
            >
            <p class="validation" v-if="!nameIsValid">Имя может содержать только буквы, пробел или дефис</p>

          </div>
          <div class="form-group ml-3 mr-3">
            <label for="passwordRegister">Пароль</label>
            <input type="password"
                   class="form-control"
                   id="passwordRegister"
                   required
                   v-model.lazy="form.password"
            >
            <p class="validation" v-if="!passIsValid">Пароль должен содержать строчные и прописные латинские буквы,
              цифры</p>
          </div>
          <div class="form-group ml-auto text-right mr-3">
            <button type="submit"
                    class="btn btn-primary"
                    disabled="disabled"
            >
              Регистрация не доступна
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {actionTypes} from "@/store/modules/auth";
import {mapState} from 'vuex';

export default {
  name: 'WhRegister',
  data() {
    return {
      form: {
        email: '',
        username: '',
        password: '',
      }
    };
  },
  computed: {
    ...mapState({
      validationErrors: state => state.auth.validationErrors,
    }),
    nameIsValid() {
      if (!this.form.username) {
        return true;
      }
      const pattern = /^[а-яА-ЯёЁa-zA-Z_-\s]+$/;
      return pattern.test(this.form.username);
    },
    emailIsValid() {
      if (!this.form.email) {
        return true;
      }
      const pattern = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
      return pattern.test(this.form.email);
    },
    passIsValid() {
      if (!this.form.password) {
        return true;
      }
      const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/;
      return pattern.test(this.form.password);
    },
    isDisabled() {
      return this.nameIsValid
          && this.emailIsValid
          && this.passIsValid
          && this.form.username
          && this.form.email
          && this.form.password
    }
  },
  watch: {
    validationErrors: 'showError',
  },
  methods: {
    onSubmit() {
      this.$store.dispatch(actionTypes.register, this.form).then(() => this.$router.push({name: 'login'}));
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
.validation {
  margin: 0;
  padding: 0;
  color: red;
  font-size: 14px;
}
</style>
