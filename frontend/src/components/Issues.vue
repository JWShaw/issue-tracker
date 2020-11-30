<template>
<div>
  <h4>
    {{ this.issues.length }} issues;
    {{ issues.filter((j) => !j.completed).length }} open;
    {{ issues.filter((j) => j.completed).length  }} closed
  </h4>
  <div v-bind:key="issue.id" v-for="issue in issues">
    <IssueItem v-bind:issue="issue" />
  </div>
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