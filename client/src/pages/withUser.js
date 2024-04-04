// src/middleware/auth.js

import { getCookie } from '@/helpers/authenticationOfCookies';
import axios from 'axios';
// import { getCookie } from "../app/Helpers/authenticationOfCookies";


const WithUser = (Page) => {
    const WithAuthUser = (props) => <Page {...props} />;
    // console.log("WithAuthUser")
    WithAuthUser.getInitialProps = async context => {
        // console.log("token");
        const token = getCookie('token');
        // console.log(token)

        try {
            const response = await axios.get(`http://localhost:5000/api/user`, {
                headers: {
                    authorization: `Bearer ${token}`,
                    contentType: 'application/json'
                }
            });
            
            return { user: response.data };
        } catch (error) {
            if (error.response && error.response.status === 401) {
                return { user: 'no user' };
            }
            throw error; // Rethrow other errors
        }
    };

    return WithAuthUser;
};



export default WithUser;
