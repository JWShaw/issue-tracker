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
    <b-button type="submit" variant="primary">Create Issue</b-button>
    <b-button variant="danger" href=''>Cancel</b-button>
  </b-form>
</template>

<script>
import axios from 'axios'

export default {
  name: "CreateIssue",
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
      axios.post(`http://localhost:3000/projects/${this.$route.params.projId}/issues`, this.issue, {
        headers: {
          Authorization: `Bearer ${localStorage.jwt}`
        }
      })
      .then(() => {
        this.$swal('Issue created successfully!', {
            icon: "success",
            buttons: false,
            timer: 1500,
        })
        this.$router.push(`../${this.$route.params.projId}`)
        return 
      })
      .catch((err) => console.log(err));
    },
  },
};
</script>

