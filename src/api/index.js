import axios from "axios";

export const API_LIST = {
  getAdminInfo(password) {
    return axios.post('/api/admin/valid/password', {password});
  }
}
