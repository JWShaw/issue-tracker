<template>
  <a v-bind:href="'#/users/'+userId">{{ user.name }}</a>
</template>

<script>
import axios from 'axios'

export default {
  name: "Username",
  props: ["userId"],
  data() {
    return {
        user: {}
    }
  },
  created() {
    axios.get('http://localhost:3000/users/' + this.userId)
    .then((res) => {
        return this.user = res.data
    })
    .catch((err) => console.log(err));
  }
};
</script>
