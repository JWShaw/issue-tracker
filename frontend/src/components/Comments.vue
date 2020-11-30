<template>
<div>
  <h4>Comments</h4>
  <div v-bind:key="comment.id" v-for="comment in comments">
    <CommentItem v-bind:comment="comment" />
  </div>
</div>
</template>

<script>
import CommentItem from './CommentItem.vue'

export default {
  name: "Comments",
  components: {
    CommentItem
  },
  props: ["comments"]
}
</script>