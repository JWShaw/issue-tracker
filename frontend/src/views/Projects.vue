<template>
  <div class="projects">
    <b-button href="#/createproject">New Project</b-button>
    <Projects />
  </div>
</template>

<script>
import Projects from '../components/Projects';

export default {
  components: {
    Projects
  }
}
</script>