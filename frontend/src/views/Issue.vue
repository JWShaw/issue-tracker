<template>
  <div class="issue">
      <h1>{{ issue.title }}</h1>
      <div>
          {{ issue.description }}
      </div>
      <Comments v-bind:comments="comments"/>
  </div>
</template>

<script>
import Comments from '../components/Comments';
import axios from 'axios';

export default {
  components: {
      Comments
  },
  data() {
    return {
      issue: {},
      comments: []
    }
  },
  created() {
    axios.get(
        'http://localhost:3000/projects/' +
        this.$route.params.projId +
        '/issues/' + 
        this.$route.params.issueId
    ).then((res) => {
        return this.issue = res.data
    })
    .catch((err) => console.log(err))

    axios.get(
        'http://localhost:3000/projects/' +
        this.$route.params.projId +
        '/issues/' + 
        this.$route.params.issueId + 
        '/comments'
    ).then((res) => {
        return this.comments = res.data
    })
    .catch((err) => console.log(err))
  }
}
</script>