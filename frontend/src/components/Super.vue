<template>
  <div class="supermain">
    <div class="doc_list">
      <v-flex v-for="item, index in doc_list" style="" width="250px">
        <v-card style="line-height: 10px;">
          <v-card-text>{{index + 1}} {{item.title}}</v-card-text>
          <v-btn v-bind:to="{ name:'DocModify' , params: { doc: item, no: index+1 }}" v-on:click="doc_check = false">수정</v-btn>
          <v-btn v-bind:to="{ name:'DocView' , params: { doc: item, no: index+1 }}" v-on:click="doc_check = false">보기</v-btn>
          <!--<router-link v-bind:to="{ name:'DocModify' , params: { doc: item, no: index+1 }}" class="btn">보기</router-link>-->
        </v-card>
      </v-flex>
    </div>
    <div class="doc_view">
      <div id="doc" v-if="doc_check"> VIEW </div>
      <router-view v-if="!doc_check"></router-view>
    </div>
  </div>
</template>

<script>
  import router from '../router/index'
  import _ from 'lodash'
  import { mapState, mapMutations } from 'vuex'

    export default {
        router,
        name: "SuperUser",
      computed : _.extend({
        login_maintain: function() {
          if(this.mode == ""){
            return false
          }
          else{
            return true
          }
        }
      },mapState([ 'doc_list', 'user_data', 'mode', 'doc', 'login_check', 'greet_check', 'id', 'pw' ])) ,
      data() {
          return {
            null_ch: true,
            doc_check: true
          }
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
    margin-left: 10px;
    top: 100px;
  }
  .doc_view {
    width: 400px;
    margin: 20px;
    top: -200px;
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
