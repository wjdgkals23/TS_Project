<template>
  <v-toolbar color="orange darken-3">
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <v-toolbar-title>Title</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat v-on:click="loginclick">Login</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
    export default {
        name: "Toolbar",
      data: function() {
          return {
            ch_login: false
          }
      },
      methods: {
          loginclick: function() {
            console.log("event!");
            this.$emit('logincheck', "");
          }
      }
    }
</script>

<style scoped>

</style>
