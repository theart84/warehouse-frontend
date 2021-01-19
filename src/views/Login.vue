<template>
  <div>
    <div class="container">
      <div class="card mx-auto shadow-sm mt-5" style="max-width: 35rem;">
        <h1 class="text-center text-secondary mt-2">Sign in</h1>
        <p class="text-center mt-3">
          <router-link class="text-secondary"
                       :to="{name: 'register'}"
          >
            Need an account?
          </router-link>
        </p>
        <form @submit.prevent="onSubmit">
          <div class="form-group ml-3 mr-4">
            <label for="exampleInputEmail1">Email address</label>
            <input type="email" class="form-control" id="exampleInputEmail1"
                   aria-describedby="emailHelp" required v-model="email">
            <small id="emailHelp"
                   class="form-text text-muted"
            >We'll never share your email with anyone else.</small>
          </div>
          <div class="form-group ml-3 mr-3">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" class="form-control" id="exampleInputPassword1" required v-model="password">
          </div>
          <div class="form-group ml-auto text-right mr-3">
            <button type="submit" class="btn btn-primary" :disabled="isSubmitting">Submit</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {actionTypes} from '@/store/modules/authorization';
import {mapState} from 'vuex';
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
      isSubmitting: state => state.auth.isSubmitting
    })
  },
  methods: {
    onSubmit() {
      this.$store.dispatch(actionTypes.login, {
        email: this.email,
        password: this.password
      }).then(() => {
        this.$router.push({name: 'home'});
      });
    },
  },
};
</script>

<style scoped>

</style>
