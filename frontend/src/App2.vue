<template>
  <v-app id="app">
    <v-container grid-list-md style="box-shadow: #505050 2px 3px 3px 2px">
      <v-layout row wrap>
        <v-flex xs12>
          <v-toolbar color="orange darken-3">
            <img src="/images/tomato.jpg" alt="" style="width: 60px; height: 40px;">
            <v-toolbar-title style="color: #fff176; font-size: 25px">Crape Management</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-sm-and-down">
              <v-btn flat style="color: #fff176; font-size: 18px" v-if="mode=='User'">{{ id }}</v-btn>
              <v-btn flat style="color: #fff176; font-size: 18px" v-if="mode=='SuperUser'">관리자</v-btn>
              <v-btn flat v-on:click.stop="loginclick" v-if="!login_maintain" style="color: #fff176; font-size: 18px">Login</v-btn>
              <v-btn flat v-on:click.stop="logout" v-if="login_maintain" v-bind:to="{ name:'Empty' }" style="color: #fff176; font-size: 18px">Logout</v-btn>
            </v-toolbar-items>
          </v-toolbar>
        </v-flex>
        <v-flex xs12>
          <div class="text-xs-right">
            <v-btn v-if="login_maintain" color="green darken-1" v-bind:to="{ name: mode }">조회</v-btn>
            <v-btn v-if="login_maintain && mode=='SuperUser'" color="green darken-1" v-bind:to="{ name:'DocAdd' }">추가</v-btn>
          </div>
        </v-flex>
      </v-layout>
      <v-dialog
        v-model="login_box"
        max-width="350">
        <v-card color="white">
          <v-card-title class="headline">Login View</v-card-title>
          <v-flex justify-center style="padding: 20px;">
            <v-text-field label="ID" v-model="userid"></v-text-field>
            <v-text-field label="PW" v-model="userpw"></v-text-field>
          </v-flex>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" flat="flat" @click.stop="login">Login</v-btn>
            <v-btn color="green darken-1" flat="flat" @click.stop="cancel">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <div id="greeting" v-if="!login_maintain">CRAPE MANAGEMENT</div>
      <!--<router-link >변경</router-link>-->
      <router-view style="margin-top: 10px;"></router-view>
    </v-container>
  </v-app>
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
        userid: "",
        userpw: "",
        login_box: false
      }
    },
    computed : _.extend({
      login_maintain: function() {
        if(this.mode == ""){
          return false
        }
        else{
          return true
        }
      }
    },mapState([ 'doc_list', 'user_data', 'check', 'mode', 'doc', 'login_check', 'greet_check', 'id', 'pw', 'belong' ])) ,
    created() {
      this.$io.on("login", (data)=>{
        let temp = {};
        if(data.name == "User"){
          temp.name = data.name;
          temp.doc_list = data.doc;
          temp.id = data.userid;
          temp.belong = data.belong;
        }
        else{
          console.log(data);
            temp.name = data.name;
            temp.doc_list = data.doc;
            temp.id = data.userid;
            temp.userdata = data.userdata;
            temp.belong = data.belong;
            temp.distribute_doc = data.distribute_doc;
        }
        this.$store.dispatch(Constant.LOGIN, temp);
        this.userid = "";
        this.userpw = "";
      })
    },
    methods: _.extend({
        login : function () {
          var val = {
            id: this.userid,
            pw: this.userpw
          }
          this.$http.post('/users', val).then((response) => {
            console.log(response.data.superuser);
            if(response.data.superuser == 1){
              this.login_box = false;
              this.$io.emit("login", response.data);
            }
            else{
              // console.log(response.data.num_id);
              this.login_box = false;
              console.log("user here");
              this.$io.emit("login", response.data);
            }
          })
        },
        loginclick : function() {
            this.login_box = true;
        },
        cancel : function() {
            this.login_box = false;
        },
        logout : function() {
          this.$http.post('/users/logout').then((response)=>{
            if(response=="Error"){
              console.log("Fail Logout");
            }else{
              console.log("Complete Logout");
              this.$store.commit(Constant.LOGOUT, "Complete");
            }
          })
        }
      }
    )
  }
</script>

<style>
  #app {
    /*text-align: center;*/
    font-family: "나눔고딕";
    font-weight: bold;
    font-size: 18px;
    margin: 10px auto;
    box-shadow: 1px 1px 1px 1px #888888;
    position: relative;
  }
  #greeting {
    margin: 10px auto;
    width: 100%;
    height: 500px;
    box-shadow: 1px 1px 1px 1px #888888;
    text-align: center;
    line-height: 500px;
    font-size: 30px;
  }
</style>
