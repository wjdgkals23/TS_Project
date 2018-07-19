<template>
  <div id="app">
    <img src="./assets/logo.png">
    <button id="cmd" v-on:click="savepdf">Generate PDF</button>
    <router-view/>
  </div>
</template>

<script>
  import * as jspdf from 'jspdf'
export default {
  name: 'App',
  data: {
  },
  methods: {
    savepdf: function(){
      const doc = new jspdf();
      doc.fromHTML(document.getElementById('app'), 15, 15, {
        'width': 170
      });
      doc.save('sample-file.pdf');
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
