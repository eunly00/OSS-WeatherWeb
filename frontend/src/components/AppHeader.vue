<template>
    <header class="glass-header">
      <button v-for="btn in buttons" :key="btn.type" @click="$emit('select-layer', btn.type)">
        {{ btn.label }}
      </button>
    </header>
  </template>
  
  <script>
  export default {
    data() {
      return {
        buttons: [
          { label: '현재기온', type: 'temp' },
          { label: '24시간내 강수량', type: 'rain' },
          { label: '풍량', type: 'wind' },
          { label: '습도', type: 'humidity' }
        ]
      }
    }
  }
  </script>
  
  <style scoped>
  .glass-header {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 1rem;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    color: black;
    font-weight: bold;
    margin-bottom: 10px;
  }
  button {
    background: rgba(255, 255, 255, 0.2);
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 1rem;
    cursor: pointer;
    transition: 0.3s;
  }
  button:hover {
    background: rgba(255, 255, 255, 0.4);
  }
  </style>
  