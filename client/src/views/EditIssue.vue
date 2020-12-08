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

    <!-- Adapted from the Bootstrap Vue documentation example -->
    <b-form-group label="Labels:">
      <b-form-tags v-model="chosenLabels" add-on-change no-outer-focus>
        <template
          v-slot="{ tags, inputAttrs, inputHandlers, disabled, removeTag }"
        >
          <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
            <li v-for="tag in tags" :key="tag" class="list-inline-item">
              <b-form-tag
                @remove="removeTag(tag)"
                :title="tag"
                :disabled="disabled"
                variant="info"
                >{{ tag }}</b-form-tag
              >
            </li>
          </ul>
          <b-form-select
            v-bind="inputAttrs"
            v-on="inputHandlers"
            :disabled="disabled || availableOptions.length === 0"
            :options="availableOptions"
          >
            <template #first>
              <!-- This is required to prevent bugs with Safari -->
              <option disabled value="">Choose a label...</option>
            </template>
          </b-form-select>
        </template>
      </b-form-tags>
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
        labels: [],
      },
      labelObjects: [],
      chosenLabels: [],
      options: [],
    };
  },
  methods: {
    submit() {

      this.labelObjects.forEach((labelObject) => {
        if (this.chosenLabels.includes(labelObject.name)) {
          this.issue.labels.push(labelObject._id)
        }
      })

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

    const res2 = await this.$http
      .get(`/projects/${this.$route.params.projId}/labels`)
    this.labelObjects = res2.data
    this.options = this.labelObjects.map(labelObject => labelObject.name)
    // this.chosenLabels = this.labelObjects
    //   .filter((labelObject) => res.data.labels.includes(labelObject._id))
    //   .map(labelObject => labelObject.name)
    // this.options = this.labelObjects
    //   .map(labelObject => labelObject.name)
    //   .filter(labelName => !this.chosenLabels.includes(labelName))
  },
  computed: {
    availableOptions() {
      return this.options.filter(
        (opt) => this.chosenLabels.indexOf(opt) === -1
      );
    },
  },
};
</script>