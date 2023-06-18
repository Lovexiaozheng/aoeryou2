<template>
  <div id="App">
    <Headers />
    <div id="view">
      <router-view />
    </div>
  </div>
</template>
  
<script>

import Headers from './components/Headers.vue'
import Login from './components/Login.vue'

export default {
  name: 'App',
  components: {
    Headers,
    Login
  }
}
</script>
  
<style>
#view {

  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
  