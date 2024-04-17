import { getCookie } from '@/helpers/authenticationOfCookies';
import axios from 'axios';
import { Router } from 'next/router';


const WithAdmin=(Page)=>{
    const getapiAdmin = (props) => <Page {...props} />;
    getapiAdmin.getInitialProps = async (context) =>{
        const token = getCookie('token',context.req);
        let userLinks=[];
        let user=null;
        if(token)
        {
            try {
                const response = await axios.get(`http://localhost:5000/api/admin`, {
                    headers: {
                        authorization: `Bearer ${token}`,
                        contentType: 'application/json'
                    },
                    withCredentials: true 
                });
                user = response.data;
                userLinks = response.data.links;

            } catch (error) 
            {
                if (error.response && error.response.status === 400) {
                    user=null;
                }
                // throw error;
            }
        }
        console.log("token",userLinks)

        if(user==null) {
            // Redirect to '/' if token is not present
                context.res.writeHead(302, {
                    Location: '/'
                });
                context.res.end();
            }
             else {
                // For client-side routing (optional)
                // Router.push('/');
                return {
                    ...(Page.getInitialProps ? await Page.getInitialProps(context) : {}),
                    user,
                    token,
                    userLinks
                };
            }
            
    }
    return getapiAdmin;

}

export default WithAdmin;