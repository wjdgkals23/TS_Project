<template>
  <v-container grid-list-md text-xs-center>
    <v-layout column wrap style="padding: 20px; margin-left: 0;">
      <v-flex v-for="item, index in doc" style="">
        <v-card style="line-height: 10px;">
          <v-card-text>{{index + 1}} {{item.title}}</v-card-text>
          <v-btn v-bind:to="{ name:'DocModify' , params: { doc: item, no: index+1 }}">수정</v-btn>
          <!--<router-link v-bind:to="{ name:'DocModify' , params: { doc: item, no: index+1 }}" class="btn">보기</router-link>-->
        </v-card>
      </v-flex>
    </v-layout>
    <router-view></router-view>
  </v-container>
</template>

<script>
  import router from '../router/index'
    export default {
        router,
        name: "SuperUser",
      data() {
          return {
            null_ch: true,
            doc: ""
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
  .btn {
    border: 1px solid black;
    padding: 3px;
    text-decoration: none;
    font-weight: bold;
    color: black;
  }
</style>
