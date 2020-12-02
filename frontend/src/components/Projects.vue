
<template>
<div>
  <div class="d-flex w-100 justify-content-between topbar">
    <h4>All Projects</h4>
    <b-button href="#/createproject">New Project</b-button>
  </div>
  <b-list-group v-bind:key="project.id" v-for="project in projects">
    <b-list-group-item 
     v-bind:href="`#/projects/${project._id}`"
    >
      <ProjectItem v-bind:project="project" />
    </b-list-group-item>
  </b-list-group>
</div>
</template>

<script>
import ProjectItem from './ProjectItem.vue'
import axios from 'axios'

export default {
  name: "Projects",
  components: {
    ProjectItem
  },
  data() {
    return {
      projects: []
    }
  },
  created() {
    axios.get('http://localhost:3000/projects')
      .then(res => {
        this.projects = res.data
      })
      .catch(err => console.log(err));
  }
}
</script>

<style scoped>
  .topbar {
    margin-bottom: 1em;
  }
</style>