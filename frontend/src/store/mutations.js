import Constant from '../constant'

export default {
  [Constant.LOGIN] : (state, payload) => {
    if(payload) {
      console.log(payload.id);
      state.doc_list = payload.doc_list;
      state.id = payload.id;
      state.mode = payload.name;
      state.user_data = payload.userdata;
    }
    else {
      console.log("empty");
    }
  }
}
