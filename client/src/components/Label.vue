<template>
  <span class="label">
    <b-badge>{{ this.label.name }}</b-badge>
  </span>
</template>

<script>
export default {
  name: "Label",
  data() {
    return {
      label: {},
    };
  },
  props: ["labelId", "projectId"],
  created() {
    this.$http
      .get(`/projects/${this.projectId}/labels/${this.labelId}`)
      .then((res) => {
        return (this.label = res.data);
      })
      .catch((err) => console.log(err));
  },
};
</script>

<style scoped>
.label {
  margin-right: 2px;
}
</style>