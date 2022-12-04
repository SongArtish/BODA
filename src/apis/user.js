import axios from "axios"

export async function getContiListAPI(year, month) {
  try {
    let res = await axios({
      url: "/api/user/conti/list",
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

export async function getContiListByHalfYearAPI(year, halfYear) {
  try {
    let res = await axios({
      url: "/api/user/conti/list/half-year",
      method: "GET",
        params: {
          year,
          halfYear
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
      url: `/api/user/conti/${contiId}`,
      method: "GET",
    });
    return res.data
  } catch (error) {
    throw new Error(error)
  }
}

export async function getContiMaxMinDate () {
  try {
    let res = await axios({
      url: '/api/user/conti/min-max',
      method: 'GET'
    });
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
}
