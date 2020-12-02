<template>
  <div class="project">
      <Issues v-bind:issues="issues"/>
  </div>
</template>

<script>
import Issues from '../components/Issues';
import axios from 'axios';

export default {
  components: {
    Issues
  },
  data() {
    return {
      project: {},
      issues: []
    }
  },
  created() {
    axios.get('http://localhost:3000/projects/' + this.$route.params.projId)
    .then((res) => {
        return this.project = res.data
    })
    .catch((err) => console.log(err));

    axios.get(
        'http://localhost:3000/projects/' + 
        this.$route.params.projId + 
        '/issues'
    ).then((res) => {
        return this.issues = res.data
    })
    .catch((err) => console.log(err));
  }
}
</script>