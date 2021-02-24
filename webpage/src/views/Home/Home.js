import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { Box, Grid } from "@material-ui/core";

import { CHANGE_DATA, homeInit, homeReducer } from "./reducers/HomeReducer";
import VideoForm from "../../components/VideoForm/VideoForm";

const Home = () => {
    const source = axios.CancelToken.source();

    const [ state, dispatch ] = useReducer(homeReducer, homeInit);
    const { isLoading, videos } = state;

    const axiosVideos = () => {
        dispatch({ type: CHANGE_DATA, data: { isLoading: true }});
        axios.get('/api/home', { cancelToken: source.token })
            .then(({ data }) => {
                console.log(data);
                dispatch({ type: CHANGE_DATA, data: { isLoading: false, videos: data }});
            })
            .catch( e => {
                if(axios.isCancel(e)) return;
                alert(e);
            })
    }

    useEffect(() => {
        axiosVideos();
        return () => {
            source.cancel();
        }
    }, [])

    return <Box display="flex" flexDirection="column" alignItems="center" padding="1rem" >
            <Grid container style={{ width: "100%", maxWidth: "92rem" }}>
            { videos.map( (video, idx) => <VideoForm key={`video-${idx}`} video={video}/> )}
            </Grid>
            <Box bgcolor="red">로딩창</Box>
        </Box>
};

export default Home;