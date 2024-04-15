import { getCookie } from '@/helpers/authenticationOfCookies';
import axios from 'axios';
import { Router } from 'next/router';


const WithAdmin=(Page)=>{
    const getapiAdmin = (props) => <Page {...props} />;
    getapiAdmin.getInitialProps = async (context) =>{
        const token = getCookie('token',context.req);
        console.log("token",token)
        if(token)
        {
            try {
                const response = await axios.get(`/api/admin`, {
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
        else {
            // Redirect to '/' if token is not present
            if (context.res) {
                context.res.writeHead(302, {
                    Location: '/'
                });
                context.res.end();
            } else {
                // For client-side routing (optional)
                Router.push('/');
            }
            return {};
        }
    }
    return getapiAdmin;

}

export default WithAdmin;