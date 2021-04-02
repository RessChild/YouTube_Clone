// import PasswordPage from "./pages/PasswordPage";

import SelectPage from "./pages/SelectPage";

const url = '/upload';

export const singInDefaultRoute = `${url}/video`;

export const signInRoute = [
    {
        path: `${url}/video`,
        component: SelectPage,
    },
    {
        path: `${url}/option`,
        // component: PasswordPage,
    }
]