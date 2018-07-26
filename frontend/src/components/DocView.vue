<template>
  <div>
    <div id="doc">
      <img :src="imgsrc" alt="" class="centered" style="z-index: -1; opacity: 0.4; width: 50%;">
      <div class="top-centered">{{ doc.title }}</div>
      <div class="top-left">제 {{ doc.id }} 호</div>
      <div class="centered">{{ doc.content }}</div>
      <div class="bottom-centered-up">{{ doc.company }}</div>
      <div class="bottom-centered">{{ datestring }}</div>
    </div>
    <v-btn color="green darken-1">저장</v-btn>
  </div>
</template>

<script>
  import _ from 'lodash'
  export default {
    name: "DocModify",
    props: [ "doc" ],
    data() {
      return {
        title: "",
        content: "",
        date: "",
        type: "",
        watermark: ""
      }
    },
    computed: {
      imgsrc: function() {
        return "./images/"+ this.doc.watermark
      },
      datestring: function() {
        var str = this.doc.date.slice(0,10);
        var temp = str.split("-");
        return temp[0] + "년 " + temp[1] + "월 " + temp[2] + "일"
      }
    }
  }
</script>

<style scoped>
  #doc{
    box-shadow: 2px 2px 2px 2px #888888;
    margin: 10px auto;
    width: 398px;
    height: 561px;
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
    top: 18px;
    left: 26px;
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
    width: 300px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .top-centered {
    position: absolute;
    top: 100px;
    left: 50%;
    transform: translate(-50%, 0%);
  }

  .bottom-centered {
    position: absolute;
    bottom: 100px;
    left: 50%;
    font-weight: bold;
    font-size: 15px;
    transform: translate(-50%, 0%);
  }

  .bottom-centered-up {
    position: absolute;
    bottom: 150px;
    left: 50%;
    font-weight: bold;
    font-size: 15px;
    transform: translate(-50%, 0%);
  }
</style>
