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
import axios from 'axios'
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
    async loginUser() {
      try {
        const response = await axios.post('http://localhost:3000/users/login', this.login)
        console.log(response)
        const token = response.data.token
        if (token) {
          localStorage.setItem("jwt", token)
          this.$router.push("/")
          console.log("Login Successful")
        } else {
          console.log("Login Unsuccessful")
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>