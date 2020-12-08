<template>
  <div id="app">
    <Header />
    <div class="container-fluid">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Header from './components/layout/Header.vue'
export default {
  name: 'app',
  components: {
    Header
  }  
}
</script>

<style>
.container-fluid {
  max-width: 1140px;
  margin-top: 1em;
}
</style>
