<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { onMounted } from 'vue'

export default {
  name: 'App',
  components: {
  },
  setup (props, context) {
    onMounted(async () => {
      console.log('mounted!')
    })
    function openBill () {
      console.log(context)
    }
    return {
      openBill
    }
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
