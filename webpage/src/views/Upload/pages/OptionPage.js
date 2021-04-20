import React, { useEffect } from "react";
import { Box } from "@material-ui/core";

import RedditTextField from "../../../components/RedditTextField/RedditTextField";

const OptionPage = () => {

    useEffect(() => {
    },[]);
    
    return (
        <Box width="100%" height="100%" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            {/* 세부정보
            제목 / 설명 / 썸네일 */}
            <Box width="50rem">진행바</Box>
            <Box width="50rem" display="flex">
                <Box flex={5} margin="3rem">
                    <RedditTextField id="reddit-input-title" label="제목(필수 항목)" defaultValue="비디오 제목으로 사용되도록" />
                    <RedditTextField id="reddit-input-intro" label="설명" placeholder="시청자에게 동영상에 대해 알려주세요" />
                    <Box>썸네일 선택지</Box>
                </Box>
                <Box flex={3}>올라가는 영상 정보</Box>
            </Box>
        </Box>
    )
}

export default OptionPage;