<template>
  <div id="app">
    <toolbar v-on:logincheck="loginclick"></toolbar>
    <login v-bind:check="check" v-on:cancel="cancel" v-on:login="login"></login>
    <!--<button id="cmd" v-on:click="savepdf">Generate PDF</button>-->
    <component v-bind:is="user" v-bind:doc="doc_list" style="padding-top: 20px;"></component>
  </div>
</template>

<script>
  import * as jspdf from 'jspdf'
  import html2canvas from 'html2canvas'
  import Toolbar from './components/Toolbar'
  import Login from './components/Login'
  import User from './components/User'
  import SuperUser from './components/SuperUser'

export default {
  name: 'App',
  components: { Toolbar, Login, User, SuperUser },
  data () {
    return {
      user_data: [],
      check: false,
      user: "",
      doc_list: ""
    }
  },
  created() {
    this.$http({
      method: 'get',
      url: '/user'
    //  세션 데이터도 넘겨줘서 새로고침 했을 때도 로그아웃 안되게....
    }).then((response) =>{
        console.log(response.data);
        this.user_data = response.data;
    })
    this.$io.on("login", (data)=>{
      console.log(data);
      this.doc_list = data;
    })
  },
  methods: {
    savepdf: function(){
      const doc = new jspdf();
      var element = document.getElementById("#app");
      html2canvas(document.querySelector("#app")).then(canvas =>{
        var image = canvas.toDataURL("image/png");
        doc.addImage(image, 'JPEG', 15,40, 100, 100)
        doc.save("simple_test.pdf")
        });
    },
    login: function(val) {
      console.log(val.id);
      this.$http.post('/users', val).then((response) => {
        this.check = false;
        if(response.data.superuser == 1){
          this.$io.emit("login", response.data);
          this.user = "super-user";
        }
        else{
          console.log(response.data.num_id);
          this.$io.emit("login", response.data);
          this.user = "user"
        }
      })

    },
    loginclick: function() {
      console.log("on");
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
  text-align: center;
  width: 1000px;
  margin: 10px auto;
}
</style>
