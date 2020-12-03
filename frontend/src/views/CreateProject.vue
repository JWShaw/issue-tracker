<template>
  <b-form @submit="submit">
    <b-form-group
      id="title-input-group"
      label="Project title:"
      label-for="title-input"
    >
      <b-form-input
        id="title-input"
        v-model="project.title"
        type="text"
        required
        placeholder="Enter title"
      ></b-form-input>
    </b-form-group>
    <b-form-group
      id="description-input-group"
      label="Project description:"
      label-for="description-input"
    >
      <b-form-textarea
        id="description-input"
        v-model="project.description"
        placeholder="Enter a description..."
        rows="3"
        max-rows="6"
      ></b-form-textarea>
    </b-form-group>
    <b-button type="submit" variant="primary">Create Project</b-button>
    <b-button variant="danger" href='#/projects'>Cancel</b-button>
  </b-form>
</template>

<script>
export default {
  data() {
    return {
      project: {
        title: "",
        description: "",
      },
    };
  },
  methods: {
    submit() {
      this.$http.post("http://localhost:3000/projects", this.project)
      .then(() => {
        this.$swal('Project created successfully!', {
            icon: "success",
            buttons: false,
            timer: 1500,
        })
        this.$router.push('../projects')
        return 
      })
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