<template>
<div>
  <div class="d-flex w-100 justify-content-between topbar">
    <h4>
      {{ this.issues.length }} issues;
      {{ issues.filter((j) => !j.completed).length }} open;
      {{ issues.filter((j) => j.completed).length  }} closed
    </h4>
    <b-button v-bind:href="'#/projects/'+$route.params.projId+'/createissue'">Create Issue</b-button>
  </div>
  <b-list-group v-bind:key="issue.id" v-for="issue in issues">
    <b-list-group-item 
     v-bind:href="`#/projects/${$route.params.projId}/issues/${issue._id}`"
     class="flex-column align-items-start"
    >
    <IssueItem v-bind:issue="issue" />
    </b-list-group-item>
  </b-list-group>
</div>
</template>

<script>
import IssueItem from './IssueItem.vue'

export default {
  name: "Issues",
  components: {
    IssueItem
  },
  props: ["issues"]
}
</script>

<style scoped>
  .topbar {
    margin-bottom: 1em;
  }
</style>