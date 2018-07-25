import Constant from '../constant';

export default {
  [Constant.LOGIN] : (store, payload) => {
    console.log("### LOGIN");
    store.commit(Constant.LOGIN, payload);
  }
}
