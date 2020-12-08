<template>
  <div
    v-bind:href="`#/projects/${$route.params.projId}/issues/${issue._id}`"
    class="flex-column align-items-start"
  >
    <div class="d-flex w-100 justify-content-between">
      <div>
        <h5 class="mb-1">{{ issue.title }}</h5>
        <Label
          v-for="labelId in issue.labels"
          :key="labelId"
          v-bind:labelId="labelId"
          v-bind:projectId="$route.params.projId"
        />
      </div>
      <div>
        <small
          >Created {{ new Date(issue.createdAt).toLocaleDateString() }}</small
        >
      </div>
    </div>

    <p class="mb-1">
      {{ issue.description }}
    </p>

    <small>By <Username v-bind:userId="issue.owner" /></small>
  </div>
</template>

<script>
import Username from "./Username";
import Label from "./Label";

export default {
  name: "IssueItem",
  components: {
    Username,
    Label,
  },
  props: ["issue"],
};
</script>

