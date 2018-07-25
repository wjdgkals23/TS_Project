import Constant from '../constant'

export default {
  [Constant.LOGIN] : (state, payload) => {
    if(payload) {
      state.doc_list = payload.doc_list;
      state.mode = payload.mode;
      state.id = payload.id;
      state.pw = payload.pw;
    }
    else {
      console.log("empty");
    }
  },
  [Constant.LOOGIN_CLICK] : (state, payload) => {
    state.check = true;
  },
  [Constant.CANCEL] : (state, payload) => {
    state.check = false;
  }
}
