<template>
  <a v-if="userValid" v-bind:href="'#/users/' + userId">{{ user.name }}</a>
  <a v-else>Deleted User</a>
</template>

<script>

export default {
  name: "Username",
  props: ["userId"],
  data() {
    return {
      user: {},
      userValid: true,
    };
  },
  created() {
    this.$http
      .get("/users/" + this.userId)
      .then((res) => {
        return (this.user = res.data);
      })
      .catch(() => {
        this.userValid = false;
      });
  },
};
</script>
