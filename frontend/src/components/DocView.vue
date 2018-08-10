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
    <v-btn color="green darken-1" v-on:click.stop="save_pdf()" class="" v-if="save_if">저장</v-btn>
    <v-btn color="green darken-1" v-on:click.stop="check_doc()" class="">확인</v-btn>
  </div>
</template>

<script>
  import _ from 'lodash'
  import { mapState } from 'vuex'
  import Constant from '../constant'
  import jspdf from 'jspdf'
  import html2canvas from 'html2canvas'
  export default {
    name: "DocModify",
    props: [ "doc" ],
    created() {
      this.$io.on("check_doc", (data)=>{
        let bool_doc = false;
        let index;
        console.log(data);
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
    },
    data() {
      return {
        title: "",
        content: "",
        date: "",
        type: "",
        watermark: "",
        save_if : false
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
