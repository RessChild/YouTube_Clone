import { IoIosLogOut } from "react-icons/io";
import { BsPencilSquare } from "react-icons/bs";

export const menuList = [
    {
        path: '/upload/video',
        id: 'write-post',
        icon: BsPencilSquare,
        text: "게시글 작성"
    },
    {
        path: '',
        id: 'log-out',
        icon: IoIosLogOut,
        text: "로그아웃"
    }
]