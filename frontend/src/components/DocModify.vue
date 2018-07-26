<template>
  <div>
    <div id="doc">
      <img :src="imgsrc" alt="" class="centered" style="z-index: -1; opacity: 0.4; width: 50%;">
      <div class="top-centered">
        <v-text-field label="상장명" v-model="doc.title"></v-text-field>
      </div>
      <div class="top-left">제 {{ doc.id }} 호</div>
      <div class="centered">
        <v-textarea id="content" v-model="doc.content" label="Content" counter maxlength="120" full-width single-line style="box-shadow: 1px 1px 1px 1px #888888; font-family: 궁서체;"></v-textarea>
      </div>
      <div class="bottom-centered-up">{{ doc.company }}</div>
      <div class="bottom-centered">{{ datestring }}</div>
    </div>
    <div id="doc2">
      <v-layout row wrap align-center>
        <v-flex xs12 sm6>
          <v-subheader v-text="'Multiple with persistent hint'"></v-subheader>
        </v-flex>
        <v-flex xs12 sm6>
          <v-select
            :items="user_data_computed"
            v-model="user"
            label="Select"
            multiple
            max-height="400"
            hint="Pick your favorite states"
            persistent-hint
          ></v-select>
        </v-flex>
      </v-layout>
    </div>
    <div style="margin-left: 375px; margin-top: -600px">
      <v-btn color="green darken-1">저장</v-btn>
      <v-btn color="green darken-1" v-bind:to="{ name: mode }">취소</v-btn>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash'
  import { mapState } from 'vuex'
    export default {
        name: "DocModify",
      props: [ "doc" ],
      data() {
          return {
            title: "",
            content: "",
            date: "",
            type: "",
            watermark: "",
            user: []
          }
      },
      computed: _.extend({
        imgsrc: function() {
          return "./images/"+ this.doc.watermark
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
          console.log(temp);
          return temp;
        }
        }, mapState([ 'mode', 'user_data' ]))
    }
</script>

<style scoped>
  #doc{
    box-shadow: 2px 2px 2px 2px #888888;
    margin-left: 50px;
    margin-bottom: 50px;
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
