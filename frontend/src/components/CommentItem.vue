<template>
    <div>
        <Username v-bind:userId="comment.owner" />
        {{ comment.text }}
    </div>
</template>

<script>
import Username from './Username.vue'

export default {
  name: "CommentItem",
  components: {
      Username
  },
  props: ["comment"],
};
</script>

<style scoped>
.issue-item {
  margin: 5px;
}
</style>