import React, { useEffect } from "react";
import { Box, Button } from "@material-ui/core";

import RedditTextField from "../../../components/RedditTextField/RedditTextField";

const OptionPage = ({ state, dispatch, CHANGE_DATA }) => {

    const { title, description, video } = state;
    const onChangeText = ({ currentTarget: { id, value }}) => {
        const [ tag, target ] = id.split('-');
        dispatch({ type: CHANGE_DATA, data: { [target]: value }});
    }

    const onClickBtn = () => {
        alert('버튼 클릭');
    }

    useEffect(() => {
    },[]);
    
    return (
        <Box width="100%" height="100%" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            {/* 세부정보 : 제목 / 설명 / 썸네일 */}
            {/* <Box width="90rem">진행바</Box> */}
            <Box width="60rem" display="flex">
                <Box flex={5}>
                    <RedditTextField id="reddit_nput-title" onChange={onChangeText} 
                        label="제목(필수 항목)" value={title} />
                    <RedditTextField id="reddit_input-description" onChange={onChangeText} 
                        label="설명" value={description} placeholder="시청자에게 동영상에 대해 알려주세요" 
                        multiline rows={7} />
                    <Box>
                        <Box marginTop="1rem" marginBottom="0.4rem">미리보기 이미지</Box>
                        <Box fontSize="0.85rem" color="gray" marginBottom="0.5rem">
                            동영상의 내용을 알려주는 사진을 선택하거나 업로드하세요. 
                            시청자의 시선을 사로잡을만한 이미지를 사용해 보세요.
                        </Box>
                        <Box display="flex">
                            <Box flex={1}>
                                <Box paddingTop="calc(100% * 9 / 16)" bgcolor="gray"></Box>
                            </Box>
                            <Box flex={1} marginLeft="0.2rem">
                                <Box paddingTop="calc(100% * 9 / 16)" bgcolor="#e1e1e1"></Box>
                            </Box>
                            <Box flex={1} marginLeft="0.2rem">
                                <Box paddingTop="calc(100% * 9 / 16)" bgcolor="#e1e1e1"></Box>
                            </Box>
                            <Box flex={1} marginLeft="0.2rem">
                                <Box paddingTop="calc(100% * 9 / 16)" bgcolor="#e1e1e1"></Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box flex={3} marginLeft="3rem" overflow="hidden">
                    {/* <Box overflow="hidden"> */}
                        <Box position="relative" bgcolor="#e1e1e1" paddingTop="calc(100% * 9 / 16)">
                            <Box width="100%" height="100%" position="absolute" top={0} right={0} 
                                display="flex" alignItems="center" justifyContent="center">
                                <video style={{ maxWidth: "100%", maxHeight: "100%" }}>
                                    <source src={URL.createObjectURL(video)}/>
                                </video>
                            </Box>
                        </Box>
                        <Box padding="1rem" bgcolor="#eeeeee">
                            <Box fontSize="0.85rem" color="gray">파일 이름</Box>
                            <Box whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
                                {video.name}
                            </Box>
                        </Box>
                    {/* </Box> */}
                </Box>
            </Box>
            <Box className="footer" width="60rem" display="flex" justifyContent="flex-end" 
                borderColor="gray" borderTop={1} margin="1rem" padding="0.5rem">
                <Button variant="contained" color="primary" onClick={onClickBtn}>다음</Button>
            </Box>
        </Box>
    )
}

export default OptionPage;