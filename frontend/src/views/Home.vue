<template>
  <div class="home">
    <Projects v-bind:projects="projects" />
  </div>
</template>

<script>
// @ is an alias to /src
import Projects from '../components/Projects';
import axios from 'axios';

export default {
  name: 'Home',
  components: {
    Projects
  },
  data() {
    return {
      projects: [],
    }
  },
  created() {
    axios.get('http://localhost:3000/projects')
      .then(res => {
        this.projects = res.data
        console.log(res.data)
      })
      .catch(err => console.log(err));
  }
}
</script>

<style>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  body {
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.4;
  }
  .btn {
    display: inline-block;
    border: none;
    background: #555;
    color: #fff;
    padding: 7px 20px;
    cursor: pointer;
  }
  .btn:hover {
    background: #666;
  }
</style>