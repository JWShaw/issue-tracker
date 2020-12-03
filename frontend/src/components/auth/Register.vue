<template>
  <div class="b-container">
    <form @submit.prevent="registerUser">
      <input
        type="text"
        id="name"
        placeholder="Name"
        v-model="register.name"
        required
      />
      <input
        type="email"
        id="email"
        placeholder="Email"
        v-model="register.email"
        required
      />
      <input
        type="password"
        id="password"
        placeholder="Password"
        v-model="register.password"
        required
      />
      <button class="btn btn-primary" type="submit">
        Register
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      register: {
        name: "",
        email: "",
        password: ""
      }
    }
  },
  methods: {
    registerUser() {
      console.log(this.register)
      this.$store.dispatch('register', this.register)
      .then(() => this.$router.push('/'))
      .catch(error => console.log(error))
    }
  }
}
</script>