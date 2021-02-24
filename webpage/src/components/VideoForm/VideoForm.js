import React from "react";
import axios from "axios";
import { Box, Grid } from "@material-ui/core";

import Thumbnail from "../../sources/youtube_thumbnail.png";
import { useHistory } from "react-router-dom";

const VideoForm = ({ video }) => {
    const { vid, title, description, thumbnail } = video;
    const history = useHistory();

    // 화면 이동
    const onClickVideo = () => {
        history.push(`/${vid}`);
    }

    return <Grid item xs={6} sm={6} md={3} style={{ padding: "1rem 0.5rem" }}>
        <Box onClick={onClickVideo} style={{ cursor: "pointer" }}
            display="flex" alignItems="center" justifyContent="center" overflow="hidden" 
            bgcolor="black" maxWidth="100%" paddingTop="calc(100% * 9 / 16)" position="relative">
            <Box position="absolute" width="100%" height="100%" top={0} right={0} 
                display="flex" alignItems="center" justifyContent="center" >
                <img alt="video thumbnail" src={ thumbnail ? `/api/` : Thumbnail } style={{ maxWidth: '100%', maxHeight: "100%" }}/>
            </Box>
        </Box>
        <Box display="flex">
            <Box>프로필</Box>
            <Box display="flex">
            { title }
            { description }
            </Box>
        </Box>
    </Grid>;
};

export default VideoForm;