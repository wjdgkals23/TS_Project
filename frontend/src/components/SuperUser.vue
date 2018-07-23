<template>
  <v-layout row wrap align-center>
    <v-flex v-for="item, index in doc">
      <v-card width="900px" style="line-height: 10px; margin-left: 50px;">
        <v-card-text>{{index + 1}} {{item.title}}</v-card-text>
        <v-btn v-on:click="Modifydoc(item)">수정</v-btn>
        <v-btn>보기</v-btn>
        <v-btn>저장</v-btn>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
    export default {
        name: "SuperUser",
      props: [ "doc" ],
      data() {
          return {
            null_ch: true
          }
      },
      methods: {
          Modifydoc: function(item){
            item.mode = "modify";
            console.log(item);
            this.$emit("modifydoc", item);
          }
      }
    }
</script>

<style scoped>

</style>
