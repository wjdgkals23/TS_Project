<template>
  <div>
    <v-flex>
      <v-flex xs3 offset-xs9 offset-md10>
        <v-switch :label="`세로`" v-model="isActive"></v-switch>
      </v-flex>
      <div v-if="mode=='SuperUser'" v-bind:class="{ doc2: isActive, doc3: !isActive}">
        <img :src="imgsrc" alt="" class="content" style="z-index: 1; opacity: 0.3; width: 50%;">
        <div v-bind:class="{ title: isActive, title1: !isActive}">{{ doc.title }}</div>
        <div class="top-left">제 {{ doc.id }} 호 발행물</div>
        <div class="content">{{ doc.content }}</div>
        <div v-bind:class="{ belong: isActive, belong1: !isActive}">{{ belong[0].belongname }}</div>
        <div v-bind:class="{ date: isActive, date1: !isActive}">{{ datestring }}</div>
      </div>
      <div v-bind:class="{ doc2: isActive, doc3: !isActive}" v-if="mode=='User'">
        <img :src="imgsrc" alt="" class="content" style="z-index: 1; opacity: 0.3; width: 50%;">
        <div v-bind:class="{ title: isActive, title1: !isActive}">{{ doc.title }}</div>
        <div class="top-left">제 {{ doc.doc_num }} 호</div>
        <div v-bind:class="{ grade: isActive, grade1: !isActive}">{{ doc.grade }}</div>
        <div v-bind:class="{ name: isActive, name1: !isActive}">성  명 : {{ doc.name }}</div>
        <div class="content">{{ doc.content }}</div>
        <div v-bind:class="{ belong: isActive, belong1: !isActive}">{{ belong[0].belongname }}</div>
        <div v-bind:class="{ date: isActive, date1: !isActive}">{{ datestring }}</div>
      </div>
      <v-btn color="green darken-1" v-on:click.stop="save_pdf()" class="" v-if="save_if" v-bind:to="{ name: mode }">저장</v-btn>
      <v-btn color="green darken-1" v-on:click.stop="check_doc()" class="">확인</v-btn>
    </v-flex>
  </div>
</template>

<script>
  import _ from 'lodash'
  import { mapState } from 'vuex'
  import Constant from '../constant'
  import jspdf from 'jspdf'
  import html2canvas from 'html2canvas'
  export default {
    name: "DocView",
    props: [ "doc" ],
    created() {
      // this.$io.on("check_doc", (data)=>{
      //   let bool_doc = false;
      //   let index;
      //   console.log(data);
      //   for(let i in data){
      //     console.log(data[i].doc_num == this.doc.doc_num);
      //     if(this.doc.doc_num == data[i].doc_num){
      //       bool_doc = true;
      //       index = i;
      //       this.$store.dispatch(Constant.ADD_DOC, data);
      //       break;
      //     }
      //   }
      //   if(bool_doc == true){ // 내꺼 삭제되지는 않았어!
      //     if(data[index].title != this.doc.title || data[index].content != this.doc.content || data[index].grade != this.doc.grade ){
      //       alert("내용에 변화가 있습니다. 해당 상장의 보기를 눌러주세요");
      //       this.doc = data[index];
      //     }
      //     else if(data[index].title == this.doc.title && data[index].content == this.doc.content && data[index].grade == this.doc.grade){
      //       alert("저장을 누르세요");
      //       this.save_if = true;
      //     }
      //   }
      //   else{
      //     this.$store.dispatch(Constant.ADD_DOC, data);
      //     alert("상장 삭제되었습니다. 상단 조회버튼을 누르세요.");
      //   }
      // })
    },
    data() {
      return {
        title: "",
        content: "",
        date: "",
        type: "",
        watermark: "",
        save_if : false,
        isActive : true
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
        const doc = new jspdf();
        html2canvas(document.querySelector("#doc2")).then(canvas =>{
          var image = canvas.toDataURL("image/png");
          doc.addImage(image, 'JPEG', 0,0, 210, 297);
          doc.save(this.doc.title + " " + this.doc.name + ".pdf");
        });
      },
      check_doc: function() {
        // this.$io.emit("check_doc", this.doc);
        this.$http.post("/checkdoc", this.doc).then((response)=>{
          let data = response.data;
          let index;
          console.log(data);
          let bool_doc;
          for(let i in data){
            console.log(data[i].doc_num == this.doc.doc_num);
            if(this.doc.doc_num == data[i].doc_num){
              bool_doc = true;
              index = i;
              this.$store.dispatch(Constant.ADD_DOC, data);
              break;
            }
          }
          if(bool_doc == true){ // 내꺼 삭제되지는 않았어!
            if(data[index].title != this.doc.title || data[index].content != this.doc.content || data[index].grade != this.doc.grade ){
              alert("내용에 변화가 있습니다. 해당 상장의 보기를 눌러주세요");
              this.doc = data[index];
            }
            else if(data[index].title == this.doc.title && data[index].content == this.doc.content && data[index].grade == this.doc.grade){
              alert("저장을 누르세요");
              this.save_if = true;
            }
          }
          else{
            this.$store.dispatch(Constant.ADD_DOC, data);
            alert("상장 삭제되었습니다. 상단 조회버튼을 누르세요.");
          }
        })
      }
    }
  }
</script>

<style scoped>
  #doc{
    box-shadow: 2px 2px 2px 2px #888888;
    margin: 10px auto;
    margin-top: 0px;
    width: 398px;
    height: 561px;
    position: relative;
    font-size: 16px;
  }

  .doc2{
    box-shadow: 2px 2px 2px 2px #888888;
    margin: 10px auto;
    margin-top: 0px;
    width: 398px;
    height: 561px;
    position: relative;
    font-size: 16px;
  }

  .doc3{
    box-shadow: 2px 2px 2px 2px #888888;
    margin: 10px auto;
    margin-top: 0px;
    width: 561px;
    height: 398px;
    position: relative;
    font-size: 16px;
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
    top: 168px;
    right: 50px;
    font-weight: bold;
  }

  .name {
    position: absolute;
    top: 200px;
    right: 36px;
    font-weight: bold;
  }

  .grade1 {
    position: absolute;
    top: 128px;
    right: 50px;
    font-weight: bold;
  }

  .name1 {
    position: absolute;
    top: 160px;
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
  .content {
    width: 300px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
  }

  .title {
    position: absolute;
    top: 100px;
    left: 50%;
    transform: translate(-50%, 0%);
    font-weight: bold;
    font-size: 30px;
  }

  .title1 {
    position: absolute;
    top: 60px;
    left: 50%;
    transform: translate(-50%, 0%);
    font-weight: bold;
    font-size: 30px;
  }

  .date {
    position: absolute;
    bottom: 90px;
    left: 50%;
    font-weight: bold;
    font-size: 15px;
    transform: translate(-50%, 0%);
  }

  .date1 {
    position: absolute;
    bottom: 50px;
    left: 50%;
    font-weight: bold;
    font-size: 15px;
    transform: translate(-50%, 0%);
  }

  .belong {
    position: absolute;
    bottom: 130px;
    left: 50%;
    font-weight: bold;
    font-size: 25px;
    transform: translate(-50%, 0%);
  }

  .belong1 {
    position: absolute;
    bottom: 90px;
    left: 50%;
    font-weight: bold;
    font-size: 25px;
    transform: translate(-50%, 0%);
  }
</style>
