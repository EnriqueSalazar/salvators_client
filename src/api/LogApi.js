import axios from 'axios';
import API_URL from '../config/';

class LogApi {
  static getAllLog() {
    return axios.post(API_URL + '/log/findall', {});
  }
}

export default LogApi;
