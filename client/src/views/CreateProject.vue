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
    <b-form-group
      id="label-input-group"
      label="Labels:"
      label-for="label-input"
    >
      <b-form-tags
        id="label-input"
        v-model="labelNames"
        placeholder="Add labels..."
      ></b-form-tags>
    </b-form-group>
    <b-button type="submit" variant="primary">Create Project</b-button>
    <b-button variant="danger" href="#/projects">Cancel</b-button>
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
      labelNames: [],
    };
  },
  methods: {
    submit() {
      this.$http
        .post("/projects", this.project, {
          headers: { Authorization: `Bearer ${localStorage.jwt}` },
        })
        .then((res) => {
          this.labelNames.forEach((labelName) => {
            this.$http.post(
              `/projects/${res.data._id}/labels`,
              { name: labelName },
              { headers: { Authorization: `Bearer ${localStorage.jwt}` } }
            );
          });
        })
        .then(() => {
          this.$swal("Project created successfully!", {
            icon: "success",
            buttons: false,
            timer: 1500,
          });
          this.$router.push("../projects");
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
};
</script>