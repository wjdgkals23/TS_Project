<template>
  <div id="app">
    <img src="./assets/logo.png">
    <button id="cmd" v-on:click="savepdf">Generate PDF</button>
    <router-view/>
  </div>
</template>

<script>
  import * as jspdf from 'jspdf'
  import html2canvas from 'html2canvas'
export default {
  name: 'App',
  created() {
    this.$http({
      method: 'get',
      url: '/user'
    }).then(function(response){
        console.log(response);
    })
  },
  methods: {
    savepdf: function(){
      const doc = new jspdf();
      var element = document.getElementById("#app");
      html2canvas(document.querySelector("#app")).then(canvas =>{
        var image = canvas.toDataURL("image/png");
        doc.addImage(image, 'JPEG', 15,40, 100, 100)
        doc.save("simple_test.pdf")
        });
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
