import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, IconButton } from "@material-ui/core";

import { AiFillLike, AiFillDislike } from "react-icons/ai";
import CustomButton from "../../components/CustomButton/CustomButton";


// 비디오 출력
const VideoPage = ({ location: { pathname } }) => {
    const source = axios.CancelToken.source();
    const [ video, setVideo ] = useState({});

    const axiosVideo = () => {
        axios.get(`/api/video${pathname}`, { headers: { responseType: "blob" }, cancelToken: source.token })
            .then(({ data }) => { 
                console.log(data);
                setVideo(data);
            })
            .catch( e => {
                if( axios.isCancel(e) ) return;
                alert(e);
            })
    }

    useEffect(() => {
        axiosVideo();
        return () => source.cancel();
    }, [])

    // 비디오 클릭
    const onClickVideoBar = ({ target }) => {
        console.log(target.currentTime);

    }

    return <Box width="100%" display="flex" justifyContent="center">
        <Box flex={1} maxWidth="90rem" margin="1.5rem" display="flex">
            <Box flex={1}>
                <Box width="100%" paddingTop="calc(100% * 9 / 16)" bgcolor="black" position="relative" marginBottom="1rem">
                    <video controls
                        preload="false" onClick={onClickVideoBar}
                        style={{ position: "absolute", top: 0, width: "100%", height: "100%" }}
                        key={video.video && `/api/video/get-video/${video.video}`}>
                        <source src={video.video && `/api/video/get-video/${video.video}`} type="video/mp4" />
                        지원을 안하면 등장함
                    </video>
                </Box>
                <Box color="blue" fontSize="0.85rem">태그</Box>
                <Box fontSize="1.2rem">{ video.title }</Box>
                <Box display="flex" alignItems="center" justifyContent="space-between"
                    fontSize="0.85rem" borderBottom={1} borderColor="#d0d0d0">
                    <Box fontWeight="600" color="#777777">{ video.writedAt && video.writedAt.slice(0,10) }</Box>
                    <Box>
                        <IconButton style={{ fontSize: "1rem", fontWeight: "600" }}>
                            <AiFillLike size="1.5rem"/>{"1"}
                        </IconButton>
                        <IconButton style={{ fontSize: "1rem", fontWeight: "600" }}>
                            <AiFillDislike size="1.5rem"/>{"2"}
                        </IconButton>
                    </Box>
                </Box>
                <Box borderBottom={1} borderColor="#d0d0d0" paddingTop="1rem" paddingBottom="1rem">
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                        <Box display="flex" alignItems="center" marginBottom="0.8rem">
                            <Box width="3rem" height="3rem" border={1} borderRadius="1.5rem" overflow="hidden" marginRight="1rem">
                                <img style={{ maxWidth: "3rem", maxHeight: "3rem" }} />
                            </Box>
                            <Box>
                                <Box fontSize="0.9rem">채널명</Box>
                                <Box fontSize="0.7rem" fontWeight="600" color="#777777">구독자 수</Box>
                            </Box>
                        </Box>
                        <Box>
                            <CustomButton onClick={null}>구독</CustomButton>
                        </Box>
                    </Box>
                    <Box paddingLeft="4rem">
                    { video.description }
                    </Box>
                </Box>
                <Box marginTop="1rem">
                    <Box>댓글 1개</Box>
                </Box>
            </Box>
            <Box display="flex" flexDirection="column" width="20rem" marginLeft="1.5rem" >
                <Box display="flex">
                    <Box bgcolor="black" width="10.4rem" height="5.85rem"
                        display="flex" alignItems="center" justifyContent="center">
                        <img />
                    </Box>
                    <Box fontSize="0.85rem" marginLeft="0.3rem" color="#707070">
                        <Box fontSize="1rem" color="black">타이틀</Box>
                        <Box>작성자</Box>
                        <Box>조회수, 작성일</Box>
                    </Box>
                </Box>
            </Box>
            {/* <ReactPlayer controls url={video.video && `/api/video/get-video/${video.video}`} />
            <Box>비디오 페이지</Box> */}
        </Box>
    </Box> 
}

export default VideoPage;