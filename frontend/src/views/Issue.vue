<template>
  <div class="issue">
    <h1>{{ issue.title }}</h1>
    <div>
      {{ issue.description }}
    </div>

    <b-button
      v-bind:href="
        '#/projects/' +
        $route.params.projId +
        '/issues/' +
        $route.params.issueId +
        '/edit'
      "
      v-if="this.$store.getters.isLoggedIn"
    >
      Edit Issue
    </b-button>
    <b-button
      @click="deleteIssue"
      v-if="this.$store.getters.isLoggedIn"
      variant="danger"
    >
      Delete Issue
    </b-button>
    <hr />
    <CommentForm v-if="this.$store.getters.isLoggedIn" />
    <div class="comments">
      <h3>Comments</h3>
      <b-list-group v-bind:key="comment.id" v-for="comment in comments">
        <b-list-group-item>
          <CommentItem v-bind:comment="comment" />
        </b-list-group-item>
      </b-list-group>
    </div>
  </div>
</template>

<script>
import CommentForm from "../components/CommentForm";
import CommentItem from "../components/CommentItem";

export default {
  components: {
    CommentForm,
    CommentItem
  },
  data() {
    return {
      issue: {},
      comments: [],
      componentKey: 0,
    };
  },
  methods: {
    deleteIssue() {
      this.$http
        .delete(
          `http://localhost:3000/projects/${this.$route.params.projId}/issues/${this.issue._id}`
        )
        .then(() => {
          this.$swal("Issue deleted successfully!", {
            icon: "success",
            buttons: false,
            timer: 1500,
          });
          this.$router.push("../");
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
    forceRerender() {
      this.componentKey += 1;
    },
  },
  created() {
    this.$http
      .get(
        "http://localhost:3000/projects/" +
          this.$route.params.projId +
          "/issues/" +
          this.$route.params.issueId
      )
      .then((res) => {
        return (this.issue = res.data);
      })
      .catch((err) => console.log(err));

    this.forceRerender();
  },
  updated() {
    this.$http
      .get(
        "http://localhost:3000/projects/" +
          this.$route.params.projId +
          "/issues/" +
          this.$route.params.issueId +
          "/comments"
      )
      .then((res) => {
        return (this.comments = res.data);
      })
      .catch((err) => console.log(err));
  },
};
</script>

<style scoped>
.comments {
  margin-top: 5em;
}
</style>