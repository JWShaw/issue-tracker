<template>
  <b-form @submit="submit">
    <b-form-group
      id="title-input-group"
      label="Issue title:"
      label-for="title-input"
    >
      <b-form-input
        id="title-input"
        v-model="issue.title"
        type="text"
        required
        placeholder="Enter title"
      ></b-form-input>
    </b-form-group>
    <b-form-group
      id="description-input-group"
      label="Issue description:"
      label-for="description-input"
    >
      <b-form-textarea
        id="description-input"
        v-model="issue.description"
        placeholder="Enter a description..."
        rows="3"
        max-rows="6"
      ></b-form-textarea>
    </b-form-group>
    <b-button type="submit" variant="primary">Update Issue</b-button>
    <b-button
      variant="danger"
      v-bind:href="`#/projects/${this.$route.params.projId}/issues/${this.$route.params.issueId}`"
      >Cancel</b-button
    >
  </b-form>
</template>

<script>
export default {
  data() {
    return {
      issue: {
        title: "",
        description: "",
      },
    };
  },
  methods: {
    submit() {
      this.$http
        .patch(
          `/projects/${this.$route.params.projId}/issues/${this.$route.params.issueId}`,
          this.issue,
          { headers: { Authorization: `Bearer ${localStorage.jwt}` } }
        )
        .then(() => {
          this.$swal("Issue edited successfully!", {
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
  created: async function () {
    const res = await this.$http.get(
      `/projects/${this.$route.params.projId}/issues/${this.$route.params.issueId}`
    );
    this.issue.title = res.data.title;
    this.issue.description = res.data.description;
  },
};
</script>