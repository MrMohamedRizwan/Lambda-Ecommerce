import { getCookie } from '@/helpers/authenticationOfCookies';
import axios from 'axios';


const WithAdmin=(Page)=>{
    const getapiAdmin = (props) => <Page {...props} />;
    getapiAdmin.getInitialProps = async context =>{
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
        } catch (error) 
        {
            if (error.response.status === 400) {
                return { user: 'no user' };
                
            }
            throw error;
        }
    }
    return getapiAdmin;

}

export default WithAdmin;