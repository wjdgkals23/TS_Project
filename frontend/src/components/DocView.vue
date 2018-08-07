<template>
  <div>
    <div id="doc" v-if="mode=='SuperUser'">
      <img :src="imgsrc" alt="" class="centered" style="z-index: 1; opacity: 0.3; width: 50%;">
      <div class="top-centered">{{ doc.title }}</div>
      <div class="top-left">제 {{ doc.id }} 호</div>
      <div class="centered">{{ doc.content }}</div>
      <div class="bottom-centered-up">{{ belong[0].belongname }}</div>
      <div class="bottom-centered">{{ datestring }}</div>
    </div>
    <div id="doc2" v-if="mode=='User'">
      <img :src="imgsrc" alt="" class="centered" style="z-index: 1; opacity: 0.3; width: 50%;">
      <div class="top-centered">{{ doc.title }}</div>
      <div class="top-left">제 {{ doc.doc_num }} 호</div>
      <div class="grade">{{ doc.grade }}</div>
      <div class="name">성  명 : {{ doc.name }}</div>
      <div class="centered">{{ doc.content }}</div>
      <div class="bottom-centered-up">{{ belong[0].belongname }}</div>
      <div class="bottom-centered">{{ datestring }}</div>
    </div>
    <v-btn color="green darken-1" v-on:click.stop="save_pdf()" class="">저장</v-btn>
  </div>
</template>

<script>
  import _ from 'lodash'
  import { mapState } from 'vuex'
  import jspdf from 'jspdf'
  import html2canvas from 'html2canvas'
  export default {
    name: "DocModify",
    props: [ "doc" ],
    created() {
      this.$io.on("check_doc", (data)=>{
        const doc = new jspdf();
        if(data.message == "gogo"){
          html2canvas(document.querySelector("#doc2")).then(canvas =>{
            var image = canvas.toDataURL("image/png");
            doc.addImage(image, 'JPEG', 0,0, 210, 297);
            doc.save(this.doc.title + " " + this.doc.name + ".pdf");
          });
        }
        if(data.message == "change_content"){
          this.doc = data.doc[0];
          html2canvas(document.querySelector("#doc2")).then(canvas =>{
            var image = canvas.toDataURL("image/png");
            doc.addImage(image, 'JPEG', 0,0, 210, 297);
            doc.save(this.doc.title + " " + this.doc.name + ".pdf");
          });
        }
      })
    },
    data() {
      return {
        title: "",
        content: "",
        date: "",
        type: "",
        watermark: ""
      }
    },
    computed: _.extend({
      imgsrc: function() {
        return "images/"+ this.doc.watermark
      },
      datestring: function() {
        var str = this.doc.date.slice(0,10);
        var temp = str.split("-");
        return temp[0] + "년 " + temp[1] + "월 " + temp[2] + "일"
      },
      user_data_computed: function() {
        let temp = [];
        for (var item in this.user_data) {
          let info = this.user_data[item]
          console.log(info.id + " " + info.name);
          temp.push(info.id + " " + info.name);
        }
        console.log(temp);
        return temp;
      }
    }, mapState([ 'mode', 'user_data', 'belong', 'mode' ])),
    methods: {
      save_pdf: function() {
        this.$io.emit("check_doc", this.doc);
      }
    }
  }
</script>

<style scoped>
  #doc{
    box-shadow: 2px 2px 2px 2px #888888;
    margin: 10px auto;
    margin-top: 0px;
    width: 595px;
    height: 842px;
    position: relative;
    font-size: 20px;
  }

  #doc2{
    box-shadow: 2px 2px 2px 2px #888888;
    margin: 10px auto;
    margin-top: 0px;
    width: 595px;
    height: 842px;
    position: relative;
    font-size: 20px;
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

  .grade {
    position: absolute;
    top: 188px;
    right: 50px;
    font-weight: bold;
  }

  .name {
    position: absolute;
    top: 228px;
    right: 36px;
    font-weight: bold;
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
    z-index: 2;
  }

  .top-centered {
    position: absolute;
    top: 100px;
    left: 50%;
    transform: translate(-50%, 0%);
    font-weight: bold;
    font-size: 30px;
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
    font-size: 25px;
    transform: translate(-50%, 0%);
  }
</style>
