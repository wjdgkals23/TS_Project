<template>
  <div id="doc">
    <img :src="imgsrc" alt="" class="centered" style="z-index: -1; opacity: 0.4; width: 400px;">
    <div class="topcentered"><h1>{{ doc.title }}</h1></div>
    <div class="top-left">Top Left</div>
    <div class="top-right">Top Right</div>
    <div class="bottom-right">Bottom Right</div>
    <div class="centered">Centered</div>
  </div>
</template>

<script>
    export default {
        name: "DocModify",
      props: [ "doc" ],
      computed: {
          imgsrc: function() {
            console.log("../assets/" + this.doc.watermark);
            return "./images/"+ this.doc.watermark
          }
      }
    }
</script>

<style scoped>
  #doc{
    margin: 10px auto;
    width: 793px;
    height: 1122px;
    position: relative;
  }

  /* Bottom left text */
  .bottom-left {
    position: absolute;
    bottom: 8px;
    left: 16px;
  }

  /* Top left text */
  .top-left {
    position: absolute;
    top: 8px;
    left: 16px;
  }

  /* Top right text */
  .top-right {
    position: absolute;
    top: 8px;
    right: 16px;
  }

  /* Bottom right text */
  .bottom-right {
    position: absolute;
    bottom: 8px;
    right: 16px;
  }

  /* Centered text */
  .centered {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .topcentered {
    position: absolute;
    top: 50px;
    left: 50%;
    transform: translate(-50%, 0%);
  }
</style>
