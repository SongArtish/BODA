import axios from "axios"
const SERVER_URL = process.env.VUE_APP_SERVER_URL || 'http://ec2-3-39-205-107.ap-northeast-2.compute.amazonaws.com'

export async function getCategoryAPI() {
  console.log(SERVER_URL)
  try {
    let res = await axios({
      url: SERVER_URL + "/api/category/list",
      method: "GET",
    });
    console.log(res)
    return res.data
  } catch (error) {
    throw new Error(error)
  }
}

export async function getContiListAPI(year, month) {
  try {
    let res = await axios({
      url: SERVER_URL + "/api/conti/list",
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
      url: SERVER_URL + `/api/conti/${contiId}`,
      method: "GET",
    });
    return res.data
  } catch (error) {
    throw new Error(error)
  }
}