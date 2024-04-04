import cookie from 'js-cookie';
import { useRouter } from 'next/navigation';

export const setCookie=(key,value)=>{
    if(process.browser)
    {
        cookie.set(key,value,{
            expires:1
        });
    }

}
export const removeCookie=(key)=>{
    if(process.browser)
    {
        cookie.remove(key,{
            expires:1
        });
    }

}
export const getCookie = (key) => {
    // console.log("keyvalue",key)
    if (process.browser) {
        return cookie.get(key);
    }
    else
    return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjBhODM1M2IyMWY2OTIzZjQxMjc2MjgiLCJpYXQiOjE3MTIyMDQ4NDksImV4cCI6MTcxMjgwOTY0OX0.AIZ5skO8jtEDJCVXgbJqg6ctqeO5dyE0AS8rxZpgxP8"
    // return process.browser ? getCookieFromBrowser(key) : getCookieFromServer(key, req);
};

export const getCookieFromBrowser = key => {
    return cookie.get(key);
};

export const getCookieFromServer = (key, req) => {
    if (!req.headers.cookie) {
        return undefined;
    }
    // console.log('req.headers.cookie', req.headers.cookie);
    let token = req.headers.cookie.split(';').find(c => c.trim().startsWith(`${key}=`));
    if (!token) {
        return undefined;
    }
    let tokenValue = token.split('=')[1];
    // console.log('getCookieFromServer', tokenValue);
    return tokenValue;
};


export const setLocalStorage = (key, value) => {
    if (process.browser) {
        localStorage.setItem(key, JSON.stringify(value));
    }
};

export const removeLocalStorage = key => {
    if (process.browser) {
        localStorage.removeItem(key);
    }
};

export const authenticate=(response,next)=>{
    setCookie('token', response.data.token);
    setLocalStorage('user', response.data.user);
    next();
}

export const isAuth = () => {
    if (process.browser) {
        // console.log("Authorization")
        const cookieChecked = getCookie('token');
        // console.log(cookieChecked)

        if (cookieChecked) {
            console.log("cookieis checked")
            if (localStorage.getItem('user')) {
                return JSON.parse(localStorage.getItem('user'));
            } else {
                return false;
            }
        }
    }
};
export const logout = () => {
    // const router=useRouter();
    removeCookie('token');
    removeLocalStorage('user');
    // router.push('/login');
    console.log("router.push('/login');")
};

// module.exports={setCookie,removeCookie,getCookie,setLocalStorage,removeLocalStorage,authenticate,isAuth}