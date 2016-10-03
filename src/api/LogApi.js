import axios from 'axios';
import API_URL from '../../cfg/';

class LogApi {
  static getAllLog() {
    return axios.post(API_URL + '/log/findall', {});
  }
}

export default LogApi;
