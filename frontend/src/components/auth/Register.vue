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
import axios from 'axios'
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
    async registerUser() {
      try {
        const response = await axios.post('http://localhost:3000/users', this.register)
        console.log(response)
        const token = response.data.token
        if (token) {
          localStorage.setItem("jwt", token)
          this.$router.push("/")
          console.log("Registration successful.")
        } else {
          console.log("Registration unsuccessful.")
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>