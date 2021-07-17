<template>
  <div id="app">
    <MarkdownLoader />
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
    MarkdownLoader: () => import("./components/markdown/Loader.vue")
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
