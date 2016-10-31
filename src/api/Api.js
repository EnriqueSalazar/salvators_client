/**
 * Created by enriq on 19/09/16.
 */
import axios from 'axios';

class Api {
  static findAll(model) {
    return axios.get(model);
  }

  static findOne(model, id) {
    return axios.get(model + id);
  }

  static destroy(model, id) {
    return axios.delete(model + id);
  }

  static update(model, id, payload) {
    return axios.put(model + id, payload)
  }

  static create(model, payload) {
    debugger
    if (payload.id) {
      delete payload.id
    }
    return axios.post(model, payload)
  }
}

export default Api;
