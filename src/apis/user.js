import axios from "axios"
const SERVER_URL = process.env.VUE_APP_SERVER_URL

export async function getContiListAPI(year, month) {
  try {
    let res = await axios({
      url: SERVER_URL + "/api/user/conti/list",
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

export async function getContiDetailAPI(contiId) {
  try {
    let res = await axios({
      url: SERVER_URL + `/api/user/conti/${contiId}`,
      method: "GET",
    });
    return res.data
  } catch (error) {
    throw new Error(error)
  }
}