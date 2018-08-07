<template>
  <v-layout row wrap>
    <v-flex xs6 class="text-xs-center">
      <div id="doc">
        <img :src="imgsrc" alt="" class="centered" style="z-index: 1; opacity: 0.3; width: 50%;">
        <div class="top-centered">
          <v-text-field label="상장명" v-model="doc.title"></v-text-field>
        </div>
        <div class="top-left">제 {{ doc.id }} 호</div>
        <div class="centered">
          <v-textarea id="content" v-model="doc.content" label="Content" counter maxlength="120" full-width single-line style="box-shadow: 1px 1px 1px 1px #888888; font-family: 궁서체;"></v-textarea>
        </div>
        <div class="bottom-centered-up">{{ belong[0].belongname }}</div>
        <div class="bottom-centered">{{ datestring }}</div>
      </div>
      <!--컴포넌트화 시키자-->
    </v-flex>
    <v-flex xs6 class="text-xs-right">
      <v-layout row wrap align-center>
        <v-flex xs12 sm6>
          <v-subheader v-text="'Choose Multiple Student'"></v-subheader>
        </v-flex>
        <v-flex xs12 sm6>
          <v-select :items="user_data_computed" v-model="user" label="Select" multiple max-height="400" hint="Pick Student" persistent-hint></v-select>
        </v-flex>
      </v-layout>
      <v-layout row wrap align-center>
        <v-flex xs12 sm6>
          <v-subheader v-text="'Choose Crape Grade'"></v-subheader>
        </v-flex>
        <v-flex xs12 sm6>
          <v-select :items="grade" v-model="user" label="Select" multiple max-height="400" hint="Pick Grade" persistent-hint></v-select>
        </v-flex>
      </v-layout>
      <v-layout row wrap align-center>
        <v-flex xs12 sm6>
          <v-subheader v-text="'Choose Watermark'"></v-subheader>
        </v-flex>
        <v-flex xs12 sm6>
          <v-select :items="wm_list" v-model="doc.watermark" label="Select" max-height="400" hint="WaterMark" persistent-hint></v-select>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex xs12 class="text-xs-center" style="margin-top: 20px">
      <div>
        <v-btn color="green darken-1" v-on:click.stop="change_doc" v-bind:to="{ name: mode }">저장</v-btn>
        <v-btn color="green darken-1" v-bind:to="{ name: mode }">취소</v-btn>
      </div>
    </v-flex>
  </v-layout>
  <!--<div id="maindoc"></div>-->
</template>

<script>
  import _ from 'lodash'
  import { mapState } from 'vuex'
    export default {
        name: "DocModify",
      props: [ "doc" ],
      data() {
          return {
            user: [],
            title: "",
            content: "",
            date: "",
            type: "",
            watermark: "",
            selected_grade: [],
            grade: [ "대상", "금상", "은상", "동상", "장려상" ],
            choose_grade: [],
            wm_list: [ 'sejongmark.png', 'sejongmark1.png' ],
            sql: ""
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
          for(var item in this.user_data){
            let info = this.user_data[item]
            console.log(info.id + " " + info.name);
            temp.push(info.id + " " + info.name);
          }
          return temp;
        }
        }, mapState([ 'mode', 'user_data', 'belong' ])),
      methods: {
          change_doc: function() {
            this.$io.emit('change_doc', {
              id: this.doc.id,
              title: this.doc.title,
              content: this.doc.content,
              watermark: this.doc.watermark,
              belong: this.belong[0].id
            })
          }
      },
      created() {
        this.$io.on("change_doc", (data)=>{
          if(data.message === "doc_state_success"){
            console.log(data.doc);
          }
          else{
            console.log(data.message);
          }
        })
      }
          }

</script>

<style scoped>
  #maindoc{
    width: 100%;
    margin : 10px auto;
  }

  #doc{
    box-shadow: 2px 2px 2px 2px #888888;
    margin-left: calc(50% - 199px);
    margin-bottom: 0px;
    width: 398px;
    height: 561px;
    position: relative;
  }

  #doc2{
    margin-left: 500px;
    margin-bottom: 50px;
    top: -610px;
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
