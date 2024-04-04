// import Layout from '../../components/Layout';
import axios from 'axios';
import { getCookie } from '../Helpers/authenticationOfCookies';
// import getapi from '../../middleware/withUser';
import WithUser from '../../middleware/withUser';
// import withUser from '../../middleware/withUser';
// import { API } from '../../config';
// import { getCookie } from '../../helpers/auth';

const User = ({ user }) => { 
    // Ensure you're receiving `user` as a prop
    return (
        <div>{JSON.stringify(user)}</div>
    );
}

export default WithUser(User);


// get initial props is not wrking
// User.getInitialProps = async ctx => {
//     const token = getCookie('token');
//     console.log("token",token)
//     try {
//         const response = await axios.get(`http://localhost:5000/api/user`, {
//             headers: {
//                 authorization: `Bearer ${token}`,
//                 contentType: 'application/json'
//             }
//         });
//         return { user: response.data };
//     } catch (error) {
//         if (error.response.status === 401) {
//             return { user: 'no user' };
//         }
//     }
// };

// async function getapi (){
//     const token = getCookie('token');
//     console.log("token",token)
//     try {
//         const response = await axios.get(`http://localhost:5000/api/user`, {
//             headers: {
//                 authorization: `Bearer ${token}`,
//                 contentType: 'application/json'
//             }
//         });
//         return { user: response.data };
//     } catch (error) {
//         if (error.response.status === 401) {
//             return { user: 'no user' };
//         }
//     }
// }
// const User=async ()=>{
//     const response= await getapi();
//     return (
//         <div>
//             {JSON.stringify({response})}
//         </div>
//     )
// }
// export default User;

// const User = ({ user, userLinks, token })=>{
//     return(
//         <div>
//             {JSON.stringify({user})}
//         </div>
//     )

// }
// export default withUser(User);


