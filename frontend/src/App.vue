<template>
  <div id="app">
    <AppHeader @select-layer="selectedLayer = $event" />
    <MapView :layer="selectedLayer" />
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue'
import MapView from './components/MapView.vue'

export default {
  name: 'App',
  components: { AppHeader, MapView },
  data() {
    return {
      selectedLayer: 'temp'
    }
  }
}
</script>

<style>
body {
  background: linear-gradient(to right, #a8edea, #fed6e3);
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 2rem;
}
#app {
  max-width: 1000px;
  margin: 0 auto;
}
</style>
