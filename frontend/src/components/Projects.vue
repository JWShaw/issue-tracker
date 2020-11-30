
<template>
<div>
  <h1>Projects</h1>
  <div v-bind:key="project.id" v-for="project in projects">
    <ProjectItem v-bind:project="project" />
  </div>
</div>
</template>

<script>
import ProjectItem from './ProjectItem.vue'

export default {
  name: "Projects",
  components: {
    ProjectItem
  },
  props: ["projects"]
}
</script>

