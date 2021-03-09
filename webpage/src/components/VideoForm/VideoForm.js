import React from "react";
import axios from "axios";
import { Box, Grid } from "@material-ui/core";

import Thumbnail from "../../sources/youtube_thumbnail.png";
import { useHistory } from "react-router-dom";

const VideoForm = ({ video }) => {
    const { vid, title, description, thumbnail, writer, writedAt } = video;
    const history = useHistory();

    // 화면 이동
    const onClickVideo = () => {
        history.push(`/${vid}`);
    };
            
    return <Grid onClick={onClickVideo} item xs={6} sm={6} md={3} style={{ padding: "1rem 0.5rem" }}>
        <Box style={{ cursor: "pointer" }}>
            <Box display="flex" alignItems="center" justifyContent="center" overflow="hidden" 
                bgcolor="black" maxWidth="100%" paddingTop="calc(100% * 9 / 16)" position="relative">
                <Box position="absolute" width="100%" height="100%" top={0} right={0} 
                    display="flex" alignItems="center" justifyContent="center" >
                    <img alt="video thumbnail" src={ thumbnail ? `/api/` : Thumbnail } style={{ maxWidth: '100%', maxHeight: "100%" }}/>
                </Box>
            </Box>
            <Box display="flex" marginTop="0.5rem">
                <Box width="2.4rem" height="2.4rem" borderRadius="1.2rem" bgcolor="gray" overflow="hidden">

                </Box>
                <Box display="flex" flexDirection="column" marginLeft="0.5rem">
                    <Box fontSize="1.15rem" fontWeight="400">{ title }</Box>
                    <Box fontSize="0.8rem" color="#555555">{ writer && `${writer.firstName} ${writer.lastName}` }</Box>
                    <Box fontSize="0.8rem" color="#555555">{ writedAt.slice(0,10) }</Box>
                </Box>
            </Box>            
        </Box>
    </Grid>;
};

export default VideoForm;