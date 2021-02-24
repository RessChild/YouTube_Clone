import { Box, Button } from "@material-ui/core"
import React, { useState } from "react"
import axios from "axios";

const Add = () => {

    const [ title, setTitle ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ image, setImage ] = useState(null);
    const [ video, setVideo ] = useState(null);

    const onClickSubmit = () => {

        if( !image || !video || !title ) return alert("빈칸있음");
        const formData = new FormData();
        formData.append('video', video);
        formData.append('title', title);
        formData.append('description', description);

        // formData.append('thumbnail', image);

        axios.post('/api/file/upload', formData)
            .then( ({ data }) => {
                console.log(data);
            })
            .catch( e => alert(e) );
    };

    const onChangeImg = ({ currentTarget: { files }}) => {
        console.log(files);
        setImage(files[0]);
    }
    const onChangeVideo = ({ currentTarget: { files }}) => {
        console.log(files);
        // if( !files.length ) return;
        setVideo(files[0]);
    }
    const onChangeTitle = ({ currentTarget: { value }}) => setTitle(value);
    const onChangeDescription = ({ currentTarget: { value }}) => setDescription(value);

    return (
        <Box>
            <Box>
                <img src={image && URL.createObjectURL(image)} alt="썸네일" style={{ maxWidth: "100%" }}/>
                <input type="file" accept="image/*" onChange={onChangeImg} />                
            </Box>
            <Box>
                <video autoPlay src={video && URL.createObjectURL(video)} style={{ maxWidth: "100%" }}/>
                <input type="file" accept="video/*" onChange={onChangeVideo} />
            </Box>
            <input value={title} placeholder="제목" onChange={onChangeTitle} />
            <input value={description} placeholder="부가설명" onChange={onChangeDescription} />
            <Button onClick={onClickSubmit}>게시글 추가</Button>
        </Box>
    );
}

export default Add;