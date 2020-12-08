<template>
  <div class="home">
    <h1>Welcome to IssueTracker™</h1>
    <h2>A Dr. Jiang Software Gang™ Product</h2>
    Click the "Projects" link to start tracking issues like a pro! 
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
  },
  methods: {
    logout: function () {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/");
      });
    },
  },
};
</script>