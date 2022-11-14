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

// 콘티 등록
export async function postContiAPI(conti){
  try {
      let res = await axios({
          headers: {'Content-Type': 'application/json'},
          url: "/api/admin/conti",
          method: "POST",
          data: conti
      });
      return res
  } catch (error) {
      throw new Error(error)
  }
}

//파일 업로드
export async function postFileAPI(fileList){
  try{
      let res = await axios({
          url: "/api/admin/file/upload",
          method: "POST",
          data: fileList,
      });
      return res
  }
  catch (error) {
      throw new Error(error)
  }
}

//파일 삭제
export async function removeFileAPI(fileList){
  try{
      let res = await axios ({
          url: "/api/admin/file/remove",
          method:"DELETE",
          data: fileList,
      });
      return res
  }
  catch (error) {
      throw new Error(error)
  }
}