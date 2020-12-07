<template>
  <div>
    <div class="d-flex w-100 align-items-center justify-content-between topbar">
      <h1><Username v-bind:userId="this.$route.params.userId" />'s Profile</h1>
    </div>
  </div>
</template>

<script>
import Username from "../components/Username.vue";

export default {
  components: {
    Username,
  },
  data() {
    return {
      user: [],
    };
  },
};
</script>

<style scoped>
.topbar {
  margin-bottom: 1em;
}
</style>