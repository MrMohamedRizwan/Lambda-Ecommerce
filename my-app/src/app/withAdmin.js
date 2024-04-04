import axios from 'axios';
const { getCookie } = require("./Helpers/authenticationOfCookies");

async function getapiAdmin (){
    const token = getCookie('token');
    console.log("token",token)
    try {
        const response = await axios.get(`http://localhost:5000/api/admin`, {
            headers: {
                authorization: `Bearer ${token}`,
                contentType: 'application/json'
            }
        });
        return { user: response.data };
    } catch (error) {
        if (error.response.status === 400) {
            return null;
        }
    }
}
export default getapiAdmin;