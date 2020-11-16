<template>
  <div class="project-item">
    <b-card
      v-bind:title="project.title"
      class="mb-2"
    >
      <b-card-text>
        {{ project.description }}
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "ProjectItem",
  props: ["project"],
};
</script>

<style scoped>
.project-item {
  margin: 5px;
}
</style>