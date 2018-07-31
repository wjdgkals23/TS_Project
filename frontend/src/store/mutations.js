import Constant from '../constant'

export default {
  [Constant.LOGIN] : (state, payload) => {
    if(payload) {
      if(payload.name == "SuperUser"){
        state.doc_list = payload.doc_list;
        state.id = payload.id;
        state.mode = payload.name;
        state.user_data = payload.userdata;
        state.belong = payload.belong;
      }
      else{
        state.doc_list = payload.doc_list;
        state.id = payload.id;
        state.mode = payload.name;
        state.belong = payload.belong;
      }
    }
    else {
      console.log("empty");
    }
  },
  [Constant.ADD_DOC] : (state, payload) => {
    if(payload){
      state.doc_list = payload;
    }
    else {
      console.log("empty");
    }
  },
  [Constant.LOGOUT] : (state, payload) => {
    if(payload == "Complete") {
      state.doc_list = [];
      state.id = "";
      state.mode = "";
      state.user_data = "";
      state.belong = "";
    }
    else {
      console.log("empty");
    }
  }
}
