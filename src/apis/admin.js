import axios from "axios"
const SERVER_URL = process.env.VUE_APP_SERVER_URL || 'http://ec2-3-39-205-107.ap-northeast-2.compute.amazonaws.com'

// login
export async function loginAPI(password) {
    try {
      let res = await axios({
        url: SERVER_URL + "/api/admin/valid/password",
        method: "POST",
        data: {
          password: password,
        }
      });
      return res.data
    } catch (error) {
      throw new Error(error)
    }
}