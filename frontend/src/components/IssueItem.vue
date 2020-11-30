<template>
  <a v-bind:href="'#/projects/'+ $route.params.projId + '/issues/' + issue._id">
    <b-card
      v-bind:title="issue.title"
      class="mb-2"
    >
      <b-card-text>
        {{ issue.description }}
      </b-card-text>
    </b-card>
  </a>
</template>

<script>
export default {
  name: "IssueItem",
  props: ["issue"],
};
</script>

<style scoped>
.issue-item {
  margin: 5px;
}
</style>