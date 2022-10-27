import axios from "axios"
const SERVER_URL = process.env.VUE_APP_SERVER_URL || 'http://ec2-3-39-205-107.ap-northeast-2.compute.amazonaws.com'

export async function getCategoryAPI() {
  console.log(SERVER_URL)
  try {
    let res = await axios({
      url: SERVER_URL + "/api/user/category/list",
      method: "GET",
    });
    return res.data
  } catch (error) {
    throw new Error(error)
  }
}

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

export async function deleteContiCardAPI(contiId) {
  var result = confirm("삭제하시겠습니까?");
	if (result) {
		try {
			let res = await axios({
        url: SERVER_URL + `/api/admin/conti/${contiId}`,
        method: "DELETE"
      });
			console.log(res.data.success);
			if (res.data.success == true) {
				alert("삭제되었습니다.");
				this.$router.push({name : 'BoardList'});
			} else {
				alert("삭제되지 않았습니다.");
			}
		} catch(err) {
			console.log(err);
			alert("삭제되지 않았습니다.");
		}
	}
}