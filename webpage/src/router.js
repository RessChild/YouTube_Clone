import Empty from "./views/Empty/Empty";
import Home from "./views/Home/Home";

import { TiHome } from "react-icons/ti";
import { ImFire } from "react-icons/im";
import { BsCollectionPlayFill } from "react-icons/bs";
import { TiSocialYoutube } from "react-icons/ti";
import { GiBackwardTime } from "react-icons/gi";

import VideoPage from "./views/VideoPage/VideoPage";
import SignUp from "./views/SignUp/SignUp";
import SignIn from "./views/SignIn/SignIn";
import Upload from "./views/Upload/Upload";

export const PublicRoute = [
    {
        classify: '/', // 분류
        path: '', // 경로명
        icon: TiHome,
        name: '홈',
        component: Home,
    },
    {
        classify: '/feed',
        path: '/trending',
        icon: ImFire,
        name: '인기',
        component: Empty,
    },
    {
        classify: '/feed',
        path: '/subscriptions',
        icon: BsCollectionPlayFill,
        name: '구독',
        component: Empty,
    },
];

export const PrivateRoute = [
    {
        classify: '/feed',
        path: '/library',
        icon: TiSocialYoutube,
        name: '보관함',
        component: Empty,
    },
    {
        classify: '/feed',
        path: '/history',
        icon: GiBackwardTime,
        name: '시청 기록',
        component: Empty,
    },

]

export const TestRoute = [
    {
        classify: '/upload',
        path: '/:mode',
        icon: GiBackwardTime,
        name: '게시글 작성 테스트',
        component: Upload,
    },
]

export const VideoRoute = [
    {
        classify: '/video',
        path: '/:video',
        component: VideoPage,
    }
]

export const IdentifyRoute = [
    {
        classify: '/identify',
        path: '/sign-in',
        icon: GiBackwardTime,
        name: '로그인',
        component: SignIn,        
    },
    {
        classify: '/identify',
        path: '/sign-up',
        icon: GiBackwardTime,
        name: '회원가입',
        component: SignUp,        
    }
]

export const TotalRoute = [
    ...TestRoute,
    ...PublicRoute,
    ...PrivateRoute,
    ...VideoRoute,
]