import { Box, Button } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";

const SelectPage = ({ dispatchInput }) => {

    const input_video = useRef();
    const [ disabled, setDisabled ] = useState(false);

    const onClickEvent = () => {
        input_video.current.click();
    }

    const onChangeSrc = ({ currentTarget: { files, id }}) => {
        if( files.length < 0 ) return;
        setDisabled(state => !state);
        
        const [ tag, target ] = id.split('-');
        dispatchInput(target, files[0]);
        // dispatchInput("mode", "option");
    }

    // 원래는 label 로 돌려만들어도 되지만, 그냥 ref 써서 호출해버림
    return (
        <Box height="100%" display="flex" flexDirection="column" alignItems="center" justifyContent="center" marginBottom="1rem">
            {/* <video autoPlay src={video && URL.createObjectURL(video)} style={{ maxWidth: "100%" }}/> */}
            <input id="input-video" ref={input_video} style={{ display: "none" }}
                type="file" accept="video/*" onChange={onChangeSrc}  />
            <Box display="flex" alignItems="center" justifyContent="center"
                width="10rem" height="10rem" borderRadius="5rem" onClick={onClickEvent}
                color="#888888" bgcolor="#dddddd" style={{ cursor: "pointer" }}>
                <AiOutlineCloudUpload size="5rem"/>
            </Box>
            <Box marginTop="1.5rem" marginBottom="2rem">
                <Box>동영상 파일을 드래그 앤 드롭하여 업로드</Box>
                <Box fontSize="0.87rem" color="#030202" marginTop="0.3rem">
                    동영상을 게시하기 전에는 비공개로 설정됩니다.
                </Box>
            </Box>
            <Button onClick={onClickEvent} disabled={disabled} color="primary" variant="contained">
                <Box color="#ffffff">파일 선택</Box>
            </Button>
        </Box>
    )
};

export default SelectPage;