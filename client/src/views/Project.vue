<template>
  <div class="project">
    <div class="d-flex w-100 align-items-center justify-content-between topbar">
      <div>
        <h3>{{ project.title }}</h3>
        <p>
          {{ this.issues.length }} issues;
          {{ issues.filter((j) => !j.completed).length }} open;
          {{ issues.filter((j) => j.completed).length }} closed
        </p>
      </div>
      <b-button
        v-bind:href="'#/projects/' + $route.params.projId + '/createissue'"
      >
        Create Issue
      </b-button>
      <b-button
        v-bind:href="'#/projects/' + $route.params.projId + '/edit'"
        v-if="this.$store.getters.isLoggedIn"
      >
        Edit Project
      </b-button>
      <b-button
        @click="deleteProject"
        v-if="this.$store.getters.isLoggedIn"
        variant="danger"
      >
        Delete Project
      </b-button>
    </div>
    <b-list-group v-bind:key="issue.id" v-for="issue in issues">
      <b-list-group-item
        v-bind:href="`#/projects/${$route.params.projId}/issues/${issue._id}`"
        class="flex-column align-items-start"
      >
        <IssueItem v-bind:issue="issue" />
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import IssueItem from "../components/IssueItem";

export default {
  components: {
    IssueItem,
  },
  data() {
    return {
      project: {},
      issues: [],
    };
  },
  methods: {
    deleteProject() {
      this.$http
        .delete(`/projects/${this.project._id}`, {
          headers: { Authorization: `Bearer ${localStorage.jwt}` },
        })
        .then(() => {
          this.$swal("Project deleted successfully!", {
            icon: "success",
            buttons: false,
            timer: 1500,
          });
          this.$router.push("./");
          return;
        })
        .catch((err) => {
          console.log(err);
          this.$swal("Error!", {
            icon: "error",
            buttons: false,
            timer: 1500,
          });
        });
    },
  },
  created() {
    this.$http
      .get("/projects/" + this.$route.params.projId)
      .then((res) => {
        return (this.project = res.data);
      })
      .catch((err) => console.log(err));

    this.$http
      .get(
        "/projects/" +
          this.$route.params.projId +
          "/issues"
      )
      .then((res) => {
        return (this.issues = res.data);
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