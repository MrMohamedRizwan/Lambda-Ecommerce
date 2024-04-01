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
export const getCookie = key => {
    return cookie.get(key);
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
    const router=useRouter();
    removeCookie('token');
    removeLocalStorage('user');
    router.push('/login');
    console.log("router.push('/login');")
};

// module.exports={setCookie,removeCookie,getCookie,setLocalStorage,removeLocalStorage,authenticate,isAuth}