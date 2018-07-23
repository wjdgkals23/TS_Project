<template>
  <v-layout row wrap align-center>
    <v-flex v-for="item, index in doc">
      <v-card width="900px" height="40px" style="line-height: 10px; margin-left: 50px;">
        <v-card-text>{{index + 1}} {{item.title}}</v-card-text>
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
      }
    }
</script>

<style scoped>

</style>
