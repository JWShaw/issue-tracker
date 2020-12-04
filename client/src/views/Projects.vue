<template>
  <div>
    <div class="d-flex w-100 align-items-center justify-content-between topbar">
      <h1>All Projects</h1>
      <b-button href="#/createproject">New Project</b-button>
    </div>
    <b-list-group v-bind:key="project.id" v-for="project in projects">
      <b-list-group-item v-bind:href="`#/projects/${project._id}`">
        <ProjectItem v-bind:project="project" />
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import ProjectItem from "../components/ProjectItem.vue";

export default {
  components: {
    ProjectItem,
  },
  data() {
    return {
      projects: [],
    };
  },
  created() {
    this.$http
      .get("/projects")
      .then((res) => {
        this.projects = res.data;
      })
      .catch((err) => console.log(err));
  },
};
</script>

<style scoped>
.topbar {
  margin-bottom: 1em;
}
</style>