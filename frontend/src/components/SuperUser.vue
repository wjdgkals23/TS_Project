<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-card style="line-height: 10px;">
        <v-card-text>{{index + 1}} {{item.title}}</v-card-text>
        <v-btn v-bind:to="{ name:'DocModify' , params: { doc: item, no: index+1 }}" v-on:click="doc_check = false">수정</v-btn>
        <!--<router-link v-bind:to="{ name:'DocModify' , params: { doc: item, no: index+1 }}" class="btn">보기</router-link>-->
      </v-card>
    </v-flex>
    <v-flex xs6>
      <div id="doc" v-if="doc_check"> VIEW </div>
      <router-view></router-view>
    </v-flex>
  </v-layout>
</template>

<script>
  import _ from 'lodash'
  import router from '../router/index'
    export default {
        router,
        name: "SuperUser",
      data() {
          return {
            null_ch: true,
            doc: "",
            doc_check: true
          }
      },
      created() {
            this.doc = this.$route.params.doc_list;
      },
      methods: {
          // Modifydoc: function(item){
          //   item.mode = "modify";
          //   console.log(item);
          //   this.$emit("modifydoc", item);
          // }
      }
    }
</script>

<style scoped>
  .supermain {
    padding-top: 20px;
  }
  .doc_list {
    width: 400px;
    margin-top: 40px;
    margin-left: 10px;
    position: absolute;
    top: 100px;
  }
  .doc_view {
    width: 400px;
    margin: 20px;
    position: relative;
    left: 50%;
  }
  #doc{
    box-shadow: 10px 10px 8px 10px #888888;
    margin: 10px auto;
    width: 398px;
    height: 561px;
    line-height: 561px;
    text-align: center;
    position: relative;
  }
</style>
