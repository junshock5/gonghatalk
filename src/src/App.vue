<template>
  <div id="app" class="ui container">
    <router-view></router-view>
  </div>
</template>

<script>
import feather from 'feather-icons';

export default {
  name: 'app',
  mounted() {
    feather.replace();
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<style src="./assets/semantic/semantic.css"></style>
