import Constant from '../constant';

export default {
  [Constant.LOGIN] : (store, payload) => {
    console.log("### LOGIN");
    store.commit(Constant.LOGIN, payload);
  },
  [Constant.ADD_DOC] : (store, payload) => {
    console.log("### ADDDOC");
    store.commit(Constant.ADD_DOC, payload);
  },
  [Constant.SELECTDOC] : (store, payload) => {
    console.log("### SELECTDOC");
    console.log(payload);
    store.commit(Constant.SELECTDOC, payload);
  },
  [Constant.UPDATE_DISTRIBUTE] : (store, payload) => {
    console.log("### UPDATE DISTRIBUTE DOC");
    console.log(payload);
    store.commit(Constant.UPDATE_DISTRIBUTE, payload);
  }
}
