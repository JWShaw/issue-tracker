<template>
<div>
  <h3>Comments</h3>
  <b-list-group v-bind:key="comment.id" v-for="comment in comments">
    <b-list-group-item>
      <CommentItem v-bind:comment="comment" />
    </b-list-group-item>
  </b-list-group>
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