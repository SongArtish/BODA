import axios from "axios"

export async function deleteContiAPI(contiId) {
  try {
    let res = await axios({
      url: `/api/admin/conti/${contiId}`,
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
      url: "/api/admin/conti/list",
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
        url: "/api/admin/auth/valid/password",
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
