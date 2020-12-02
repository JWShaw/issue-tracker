<template>
  <div 
   v-bind:href="`#/projects/${$route.params.projId}/issues/${issue._id}`"
   class="flex-column align-items-start"
  >
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">{{ issue.title }}</h5>
      <small>Created {{ new Date(issue.createdAt).toLocaleDateString() }}</small>
    </div>

    <p class="mb-1">
      {{ issue.description }}
    </p>

    <small>By <Username v-bind:userId="issue.owner" /></small>
  </div>
</template>

<script>
import Username from './Username'

export default {
  name: "IssueItem",
  components: {
    Username
  },
  props: ["issue"],
};
</script>

