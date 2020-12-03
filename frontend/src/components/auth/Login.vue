<template>
  <div class="b-container">
    <form @submit.prevent="loginUser">
      <input
        type="email"
        id="email"
        placeholder="Email"
        v-model="login.email"
        required
      />
      <input
        type="password"
        id="password"
        placeholder="Password"
        v-model="login.password"
        required
      />
      <button class="btn btn-primary" type="submit">
        Log In
      </button>
    </form>
  </div>
</template>

<script>

export default {
  data() {
    return {
      login: {
        email: "",
        password: ""
      }
    }
  },
  methods: {
    loginUser() {
      this.$store.dispatch('login', this.login)
      .then(() => this.$router.push('/'))
      .catch(error => console.log(error))
    }
  }
}
</script>