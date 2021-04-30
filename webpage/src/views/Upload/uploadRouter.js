import DefaultPage from "./pages/DefaultPage";
import OptionPage from "./pages/OptionPage";
import SelectPage from "./pages/SelectPage";

const url = '/upload';

export const uploadDefaultRoute = `${url}`;

export const uploadRoute = [
    {
        path: `${url}`,
        component: DefaultPage,
    }
    ,
    {
        path: `${url}/video`,
        component: SelectPage,
    },
    {
        path: `${url}/option`,
        component: OptionPage,
    }
]