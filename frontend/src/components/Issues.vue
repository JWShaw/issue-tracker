<template>
<div>
  <div class="d-flex w-100 align-items-center justify-content-between topbar">
    <div>
      <h3>{{ project.title }}</h3>
      <par>
        {{ this.issues.length }} issues;
        {{ issues.filter((j) => !j.completed).length }} open;
        {{ issues.filter((j) => j.completed).length  }} closed
      </par>
    </div>
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
  props: ["issues", "project"]
}
</script>

<style scoped>
  .topbar {
    margin-bottom: 1em;
  }
</style>