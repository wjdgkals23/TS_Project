<template>
  <v-layout row wrap align-center style="padding: 20px;">
    <v-flex v-for="item, index in doc">
      <v-card width="900px" style="line-height: 10px; margin-left: 30px;">
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
        name: "User",
      data() {
        return {
          null_ch: true,
          doc: ""
        }
      },
      created() {
        console.log(this.$route);
        this.doc = this.$route.params.doc_list;
      }
    }
</script>

<style scoped>

</style>
