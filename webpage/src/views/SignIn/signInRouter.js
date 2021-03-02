import EmailPage from "./pages/EmailPage";
import PasswordPage from "./pages/PasswordPage";

const url = '/identify/sign-in';

export const singInDefaultRoute = `${url}/email`;

export const signInRoute = [
    {
        path: `${url}/email`,
        component: EmailPage,
    },
    {
        path: `${url}/password`,
        component: PasswordPage,
    }
]