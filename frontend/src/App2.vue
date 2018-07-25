<template>
  <v-container grid-list-md id="app">

    <v-toolbar color="orange darken-3">
      <v-toolbar-title>Crape Management</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat v-on:click="loginclick" v-if="check">Login</v-btn>
        <v-btn flat v-on:click="loginclick" v-if="!check">Logout</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-dialog
      v-model="check"
      max-width="350">
      <v-card color="white">
        <v-card-title class="headline">Login View</v-card-title>
        <v-flex justify-center style="padding: 20px;">
          <v-text-field label="ID" v-model="id"></v-text-field>
          <v-text-field label="PW" v-model="pw"></v-text-field>
        </v-flex>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat="flat" @click="login">Login</v-btn>
          <v-btn color="green darken-1" flat="flat" @click="cancel">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <div id="greeting" v-if="greet_check">CRAPE MANAGEMENT</div>
    <!--<v-btn v-if="!login_check" color="green darken-1" v-bind:to="mode" v-on:click="greet_check=false" style="position: absolute; top: 90px; right: 20px; margin:5px;">조회</v-btn>-->
    <!--<router-link >변경</router-link>-->
    <!--<router-view style="margin-top: 10px;"></router-view>-->
  </v-container>
</template>

<script>
  import router from './router/index'
  import { mapState, mapMutations } from 'vuex'
  import Constant from './constant'
  import _ from 'lodash'

  export default {
    name: 'App',
    router,
    data() {
      return {
        id: "",
        pw: ""
      }
    },
    computed : mapState([ 'doc_list', 'user_data', 'check', 'mode', 'doc', 'login_check', 'greet_check' ]),
    created() {
      this.$io.on("login", (data)=>{
        console.log(data);
        var temp = {
          name: data.name,
          doc_list: data.doc,
          id: this.id,
          pw: this.pw
        }
        this.$store.dispatch(Constant.LOGIN, temp);
        this.id = "";
        this.pw = "";
      })
    },
    methods: _.extend({
        login : function () {
          var val = {
            id: this.id,
            pw: this.pw
          }
          this.$http.post('/users', val).then((response) => {
            // this.check = false;
            if(response.data.superuser == 1){
              this.$io.emit("login", response.data);
            }
            else{
              // console.log(response.data.num_id);
              console.log("user here");
              this.$io.emit("login", response.data);
            }
          })
        }
      },
      mapMutations({
        loginclick : Constant.LOOGIN_CLICK,
        cancel : Constant.CANCEL
      })
    )
  }
</script>

<style>
  #app {
    /*text-align: center;*/
    width: 1000px;
    /*margin: 10px auto;*/
    box-shadow: 1px 1px 1px 1px #888888;
    position: relative;
  }
  #greeting {
    margin: 10px auto;
    width: 500px;
    height: 500px;
    text-align: center;
    line-height: 500px;
    font-size: 30px;
  }
</style>
