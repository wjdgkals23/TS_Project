<template>
  <v-container grid-list-md id="app">
    <toolbar v-on:logincheck="loginclick" v-bind:check="login_check"></toolbar>
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
    <v-btn v-if="!login_check" color="green darken-1" v-bind:to="mode" v-on:click="greet_check=false" style="position: absolute; top: 90px; right: 20px; margin:5px;">조회</v-btn>
    <!--<router-link >변경</router-link>-->
    <router-view style="margin-top: 10px;"></router-view>
  </v-container>
</template>

<script>
  import Toolbar from './components/Toolbar'
  import Login from './components/Login'
  import router from './router/index'

export default {
  name: 'App',
  router,
  components: { Toolbar, Login },
  data () {
    return {
      user_data: [],
      check: false,
      mode: "",
      doc_list: "",
      login_check: true,
      id: "",
      pw: "",
      greet_check: true
    }
  },
  created() {
    this.$io.on("login", (data)=>{
      console.log(data);
      this.doc_list = data.doc;
      this.mode = {
        name: data.name,
        params: {
          doc_list: data.doc
        }
      }
    })
  },
  methods: {
    login: function() {
      var val = {
        id: this.id,
        pw: this.pw
      }
      this.$http.post('/users', val).then((response) => {
        this.check = false;
        if(response.data.superuser == 1){
          this.$io.emit("login", response.data);
          this.login_check = !this.login_check;
        }
        else{
          // console.log(response.data.num_id);
          console.log("user here");
          this.$io.emit("login", response.data);
          this.login_check = !this.login_check;
        }
      })
    },
    loginclick: function() {
      // console.log("on");
      this.check = true;
    },
    cancel: function() {
      this.check = false;
    }
  }
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
