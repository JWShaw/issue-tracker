<template>
  <a v-bind:href="'#/users/' + userId">{{ user.name }}</a>
</template>

<script>

export default {
  name: "Username",
  props: ["userId"],
  data() {
    return {
      user: {},
    };
  },
  created() {
    this.$http
      .get("/users/" + this.userId)
      .then((res) => {
        return (this.user = res.data);
      })
      .catch((err) => console.log(err));
  },
};
</script>
