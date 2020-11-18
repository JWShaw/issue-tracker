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
  padding: 3% 15%;
  max-width: 1140px;
}
</style>
