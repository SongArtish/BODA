import axios from "axios"
const SERVER_URL = process.env.VUE_APP_SERVER_URL

export async function deleteContiAPI(contiId) {
  try {
    let res = await axios({
      url: SERVER_URL + `/api/admin/conti/${contiId}`,
      method: "DELETE",
    });
    return res.data
  } catch (error) {
    throw new Error(error)
  }
}

export async function getContiListAPI(year, month) {
  try {
    let res = await axios({
      url: SERVER_URL + "/api/admin/conti/list",
      method: "GET",
        params: {
          year: year,
          month: month
      }
    });
    return res.data
  } catch (error) {
    throw new Error(error)
  }
}

// login
export async function loginAPI(password) {
    try {
      let res = await axios({
        url: SERVER_URL + "/api/admin/auth/valid/password",
        method: "POST",
        data: {
          password: password,
        },
      });
      return res.data
    } catch (error) {
      throw new Error(error)
    }
}