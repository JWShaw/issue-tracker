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
    <b-button-group>
      <b-button type="submit" variant="primary">Update Project</b-button>
      <b-button
        variant="danger"
        v-bind:href="`#/projects/${this.$route.params.projId}`"
        >Cancel</b-button
      >
    </b-button-group>
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
      existingLabels: [],
    };
  },
  methods: {
    submit() {
      this.$http
        .patch(`/projects/${this.$route.params.projId}`, this.project, {
          headers: { Authorization: `Bearer ${localStorage.jwt}` },
        })
        .then(() => {
          this.labelNames.forEach((labelName) => {
            if (!this.existingLabels.includes(labelName)) {
              this.addLabel(labelName)
            }
          });
          this.existingLabels.forEach((label) => {
            if (!this.labelNames.includes(label.name)) {
              this.removeLabel(label)
            }
          })
        })
        .then(() => {
          this.$swal("Project edited successfully!", {
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
    removeLabel(label) {
      this.$http.delete(
        `/projects/${this.$route.params.projId}/labels/${label._id}`,
        { headers: { Authorization: `Bearer ${localStorage.jwt}` } }
      );
    },
    addLabel(labelName) {
      this.$http.post(
        `/projects/${this.$route.params.projId}/labels`,
        { name: labelName },
        { headers: { Authorization: `Bearer ${localStorage.jwt}` } }
      );
    },
  },
  created: async function () {
    const res1 = await this.$http.get(`/projects/${this.$route.params.projId}`);
    this.project.title = res1.data.title;
    this.project.description = res1.data.description;

    const res2 = await this.$http.get(
      `/projects/${this.$route.params.projId}/labels`
    );
    this.labelNames = res2.data.map((label) => label.name);
    this.existingLabels = res2.data;
  },
};
</script>
