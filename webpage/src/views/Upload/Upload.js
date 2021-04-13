import React, { useEffect, useReducer } from "react";
import axios from "axios";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { Box, Button } from "@material-ui/core";

import { uploadDefault, uploadReducer, CHANGE_DATA } from "./reducers/UploadReducer";
import { uploadRoute, uploadDefaultRoute } from "./uploadRouter";
// import SelectPage from "./pages/SelectPage";

const Upload = ({ history }) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    const [ state, dispatch ] = useReducer(uploadReducer, uploadDefault);
    const { title, description, thumbnail, video, mode } = state;

    // const onClickSubmit = () => {

    //     // if( !image || !video || !title ) return alert("빈칸있음");
    //     const formData = new FormData();
    //     formData.append('writer', userInfo.email);
    //     formData.append('video', video);
    //     formData.append('title', title);
    //     formData.append('description', description);

    //     // formData.append('thumbnail', image);

    //     axios.post('/api/file/upload', formData, { cancelToken: source.token })
    //         .then( ({ data }) => {
    //             console.log(data);
    //         })
    //         .catch( e => alert(e) );
    // };

    // dispatch 함수
    const dispatchInput = (target, value) => {
        dispatch({ type: CHANGE_DATA, data: { [target]: value }});
    }

    // // src 파일 수정
    // const onChangeSrc = ({ currentTarget: { files, id }}) => {
    //     console.log(files[0]) ;
    //     const [ tag, target ] = id.split('-');
    //     dispatch({ type: CHANGE_DATA, data: { [target]: files[0] }});
    // }

    // // 텍스트 수정
    // const onChangeText = ({ currentTarget: { value, id }}) => {
    //     const [ tag, target ] = id.split('-');
    //     dispatch({ type: CHANGE_DATA, data: { [target]: value }});
    // }


    const createRoute = () => {
        return <Switch>
                {
                    uploadRoute.map( (route, idx) => {
                        return <Route key={`upload-${idx}`} path={route.path} render={() => <route.component dispatchInput={dispatchInput} />} />
                    })
                }
                <Redirect to={uploadDefaultRoute} />
            </Switch>;
    }

    useEffect(() => {
        if( video ) history.replace(`/upload/option`);
    }, [video]);

    return (
        <Box width="100%" height="100%">
            {/* <Box width="10rem" height="10rem" bgcolor="blue">아무내용이나 적어보자
                <Button onClick={ () => { history.replace('/upload/video' )}}>버튼버튼</Button>
            </Box> */}
            { createRoute() }
            {/* <SelectPage dispatchInput={dispatchInput} /> */}
            {
            /*
            <Box>
                <img src={thumbnail && URL.createObjectURL(thumbnail)} alt="썸네일" style={{ maxWidth: "100%" }}/>
                <input id="input-thumbnail" type="file" accept="image/*" onChange={onChangeSrc} />                
            </Box>
            <Box>
                <video autoPlay src={video && URL.createObjectURL(video)} style={{ maxWidth: "100%" }}/>
                <input id="input-video" type="file" accept="video/*" onChange={onChangeSrc} />
            </Box>
            <input id="input-title" value={title} placeholder="제목" onChange={onChangeText} />
            <input id="input-description" value={description} placeholder="부가설명" onChange={onChangeText} />
            <Button onClick={onClickSubmit}>게시글 추가</Button>
            */
            }
        </Box>
    );
}

export default Upload;