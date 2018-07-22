<template>
  <v-layout row justify-center>
    <v-dialog
      v-model="check"
      max-width="350">
      <v-card color="white">
        <v-card-title class="headline">Login View</v-card-title>

        <v-flex justify-center style="padding: 20px;">
          <v-text-field
            label="ID"
            v-model="id"
          ></v-text-field>
          <v-text-field
            label="PW"
            v-model="pw"
          ></v-text-field>
        </v-flex>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            flat="flat"
            @click="login"
          >
            Login
          </v-btn>

          <v-btn
            color="green darken-1"
            flat="flat"
            @click="cancel"
          >
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  // import {EventBus} from "../main";
  export default {
    name: "MyDialog",
    props: [ "check" ],
    created() {

    },
    data() {
      return {
        dialog: false,
        id: "",
        pw: ""
      }
    },
    methods: {
      cancel: function(){
        this.$emit("cancel");
        this.id = "";
        this.pw = "";
      },
      login: function() {
        this.$emit("login", { id: this.id, pw: this.pw });
        this.id = "";
        this.pw = "";
      }
    }
  }
</script>

<style scoped>
</style>
