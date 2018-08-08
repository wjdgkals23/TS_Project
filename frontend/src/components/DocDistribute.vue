<template>
  <v-layout row wrap>
    <v-flex xs6 class="text-xs-center">
      <div id="doc">
        <img v-bind:src="imgsrc" alt="" class="centered" style="z-index: 1; opacity: 0.3; width: 50%;">
        <div class="top-centered">
          {{ doc.title }}
        </div>
        <div class="top-left">제 {{ doc.id }} 호</div>
        <div class="centered">
          {{ doc.content }}
        </div>
        <div class="bottom-centered-up">{{ belong[0].belongname }}</div>
        <div class="bottom-centered">{{ datestring }}</div>
      </div>
      <!--컴포넌트화 시키자-->
    </v-flex>
    <v-flex xs6 class="text-xs-right">
      <v-layout row wrap align-center>
        <v-flex xs12 sm6>
          <v-subheader v-text="'배포할 대상을 선택하세요.'"></v-subheader>
        </v-flex>
        <v-flex xs12 sm6 class="text-xs-right">
          <v-select :items="user_data_computed" v-model="user" label="Select" multiple max-height="400" hint="Pick Student" persistent-hint></v-select>
        </v-flex>
      </v-layout>
      <v-layout row wrap align-center>
        <v-flex xs12 sm6>
          <v-subheader v-text="'Choose Crape Grade'"></v-subheader>
        </v-flex>
        <v-flex xs12 sm6>
          <v-select :items="grade" v-model="choose_grade" label="Select" max-height="400" hint="Pick Grade" persistent-hint></v-select>
        </v-flex>
      </v-layout>

      <v-layout row wrap align-center>
        <v-flex xs12 sm6>
          <v-subheader v-text="'Choose Crape Grade'"></v-subheader>
        </v-flex>
        <v-flex xs12 sm6>
          <v-select :items="d_doc_computed" label="Select" max-height="400" hint="Pick Grade" persistent-hint multiple></v-select>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex xs12 class="text-xs-center" style="margin-top: 20px">
      <div>
        <v-btn color="green darken-1" v-on:click.stop="distribute">배포</v-btn>
        <v-btn color="green darken-1" v-bind:to="{ name: mode }">취소</v-btn>
      </div>
    </v-flex>
  </v-layout>
  <!--<div id="maindoc"></div>-->
</template>

<script>
  import _ from 'lodash'
  import { mapState, mapGetters } from 'vuex'
  export default {
    name: "DocDistribute",
    props: [ "doc", "distribute_list" ],
    created() {
      this.$io.on("distributedoc", (res)=>{
        console.log("hi");
        if(res=="complete_distribute"){
          alert("complete distribute");
        }
        else if(res=="distribute_error"){
          alert("fail distribute");
        }
        else if(res=="duplicate"){
          alert("어떤 학생에게 중복배포하였습니다.");
        }
        else {
          alert("중복체크에 실패하였습니다.");
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
        user: [],
        grade: [ "대상", "금상", "은상", "동상", "장려상" ],
        choose_grade: "",
        wm_list: [ 'SejongMark1', 'SejongMark2' ],
        insert_sql: "",
        select_sql: "",
        d_doc: []
      }
    },
    methods: {
      distribute: function() {
        for(var i in this.user){
          let select_sql = 'SELECT * FROM ts.doc WHERE doctype = ' + this.doc.id + ' AND user_id = ' + this.user[i].split(" ")[0] + ';'
          let insert_sql = 'INSERT INTO ts.doc(doctype, grade, user_id) values ('
            + '' + this.doc.id + ', "'  + this.choose_grade + '",' + this.user[i].split(" ")[0] + ');'
          this.insert_sql += insert_sql;
          this.select_sql += select_sql;
        }
        console.log(this.select_sql);
        this.$io.emit("distributedoc", {select: this.select_sql, insert: this.insert_sql});
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
          let info = this.user_data[item];
          temp.push(info.id + " " + info.name);
        }
        return temp;
      },
      d_doc_computed: function() {
        let temp = [];
        for(let i in this.doctype_doc){
          temp.push(this.doctype_doc[i].name + this.doctype_doc[i].user_id);
        }
        return temp;
      }
    }, mapState([ 'mode', 'user_data', 'belong', 'selected_doc', 'distribute_doc' ])
      , mapGetters([ 'doctype_doc' ]))
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
