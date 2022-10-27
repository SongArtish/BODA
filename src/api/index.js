import axios from "axios";

const SERVER_URL = process.env.VUE_APP_SERVER_URL || 'http://ec2-3-39-205-107.ap-northeast-2.compute.amazonaws.com'

// 로그인
export async function loginAPI(password) {
    try {
        let res = await axios({
            url: SERVER_URL + "/api/admin/auth/valid/password",
            method: "POST",
        data: {
            password: password,
        }
    });
        return res
    } catch (error) {
        throw new Error(error)
        }
    }

// 콘티 등록
export async function postContiAPI(categoryId, depart, date, title, password, songList){
    try {
        let res = await axios({
            url: SERVER_URL + "/api/admin/conti",
            method: "POST",
            data: {
                categoryId: categoryId,
                depart: depart,
                date:date,
                title: title,
                password: password,
                songList: songList
            }
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
            url: SERVER_URL + "/api/admin/file/upload",
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
            url: SERVER_URL + "/api/admin/file/remove",
            method:"DELETE",
            data: fileList,
        });
        return res
    }
    catch (error) {
        throw new Error(error)
    }
}