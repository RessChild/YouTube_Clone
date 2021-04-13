import OptionPage from "./pages/OptionPage";
import SelectPage from "./pages/SelectPage";

const url = '/upload';

export const uploadDefaultRoute = `${url}/video`;

export const uploadRoute = [
    {
        path: `${url}/video`,
        component: SelectPage,
    },
    {
        path: `${url}/option`,
        component: OptionPage,
    }
]