<template>
  <div class="flex-column align-items-start">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">{{ project.title }}</h5>
      <small>Created {{ new Date(project.createdAt).toLocaleDateString() }}</small>
    </div>

    <p class="mb-1">
      {{ project.description }}
    </p>

    <small>By <Username v-bind:userId="project.owner" /></small>
  </div>
</template>

<script>
import Username from './Username'

export default {
  name: "ProjectItem",
  components: {
    Username
  },
  props: ["project"],
};
</script>

<style scoped>
.project-item {
  margin: 5px;
}
</style>