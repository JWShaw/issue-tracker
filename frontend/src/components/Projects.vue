
<template>
<div>
  <h1>Projects</h1>
  <div v-bind:key="project.id" v-for="project in projects">
    <ProjectItem v-bind:project="project" />
  </div>
</div>
</template>

<script>
import axios from 'axios'
import ProjectItem from './ProjectItem.vue'

export default {
  name: "Projects",
  components: {
    ProjectItem
  },
  data() {
    return {
      projects: [],
    }
  },
  created() {
    axios.get('http://localhost:3000/projects')
      .then(res => {
        this.projects = res.data
        console.log(res.data)
      })
      .catch(err => console.log(err));
  }
}
</script>

