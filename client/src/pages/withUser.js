import { getCookie } from '@/helpers/authenticationOfCookies';
import axios from 'axios';
import { Router } from 'next/router';

const WithUser = (Page) => {
    const WithAuthUser = (props) => <Page {...props} />;

    WithAuthUser.getInitialProps = async (context) => {
        const token = getCookie('token', context.req);

        if (token) {
            try {
                const response = await axios.get(`http://localhost:5001/api/user`, {
                    headers: {
                        authorization: `Bearer ${token}`,
                        contentType: 'application/json'
                    }
                });

                const user = response.data.user;
                return { user: response.data };
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    return { user: 'no user' };
                } else {
                    console.error('Network Error:', error.message);
                    return { error: 'Network Error' };
                }
            }
        } else {
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
    };

    return WithAuthUser;
};

export default WithUser;
