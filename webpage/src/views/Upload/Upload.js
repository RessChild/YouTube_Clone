import React, { useEffect, useMemo, useReducer } from "react";
import axios from "axios";
import { Box, Button } from "@material-ui/core";
import { uploadDefault, uploadReducer, CHANGE_DATA } from "./reducers/UploadReducer";
import SelectPage from "./pages/SelectPage";

const Upload = () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const source = axios.CancelToken.source();

    const [ state, dispatch ] = useReducer(uploadReducer, uploadDefault);
    const { title, description, thumbnail, video } = state;

    const onClickSubmit = () => {

        // if( !image || !video || !title ) return alert("빈칸있음");
        const formData = new FormData();
        formData.append('writer', userInfo.email);
        formData.append('video', video);
        formData.append('title', title);
        formData.append('description', description);

        // formData.append('thumbnail', image);

        axios.post('/api/file/upload', formData, { cancelToken: source.token })
            .then( ({ data }) => {
                console.log(data);
            })
            .catch( e => alert(e) );
    };

    // dispatch 함수
    const dispatchInput = (target, value) => {
        dispatch({ type: CHANGE_DATA, data: { [target]: value }})
    }

    // src 파일 수정
    const onChangeSrc = ({ currentTarget: { files, id }}) => {
        console.log(files[0]) ;
        const [ tag, target ] = id.split('-');
        dispatch({ type: CHANGE_DATA, data: { [target]: files[0] }});
    }

    // 텍스트 수정
    const onChangeText = ({ currentTarget: { value, id }}) => {
        const [ tag, target ] = id.split('-');
        dispatch({ type: CHANGE_DATA, data: { [target]: value }});
    }

    useEffect(() => {
        return () => source.cancel();
    })

    return (
        <Box width="100%" height="100%">
            <SelectPage dispatchInput={dispatchInput} />
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