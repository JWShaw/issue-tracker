<template>
  <b-form @submit="submit">
    <b-form-group
      id="comment-input-group"
      label="Comment"
      label-for="comment-input"
    >
      <b-form-textarea
        id="comment-input"
        v-model="comment.text"
        placeholder="Enter a comment..."
        rows="3"
        max-rows="6"
      ></b-form-textarea>
    </b-form-group>
    <b-button type="submit" variant="primary">Submit Comment</b-button>
  </b-form>
</template>

<script>

export default {
  name: "CommentForm",
  data() {
    return {
      comment: {
        text: "",
      },
    };
  },
  methods: {
    submit() {
      this.$http.post(`http://localhost:3000/projects/${this.$route.params.projId}/issues/${this.$route.params.issueId}/comments`, this.comment)
      .then(() => this.$emit('update-view'))
      .catch((err) => {
        console.log(err);
        this.$swal('Error!', {
            icon: "error",
            buttons: false,
            timer: 1500,
        })
      })
    },
  },
};
</script>

