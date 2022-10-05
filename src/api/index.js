import axios from "axios";

const getAdminInfo = (password) => {
    return axios.get('/api/admin/valid/password', {
        params: {
            password
        }
    })
}


export default{
    async login (password){
        try {
            const get
        }

    }
}
