import { Box, Button, Checkbox, FormControlLabel, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

import Sample from "../../../sources/sample_img.png";

const PasswordPage = ({ signIn, dispatch, CHANGE_DATA, CHANGE_DATA_STRUCT }) => {

    const history = useHistory();
    const source = axios.CancelToken.source();
    const [ showPassword, setShowPassword ] = useState(false);
    // 비밀번호 표시 변경
    const handleChange = () => setShowPassword(!showPassword);

    // 입력
    const onChangeInput = ({ currentTarget: { id, value }}) => {
        dispatch({ type: CHANGE_DATA_STRUCT, target: 'signIn', data: { [id]: value } });
    }

    const onClickSubmit = () => {
        if( !signIn.password ) return;
        dispatch({ type: CHANGE_DATA, data: { isLoading: true }});
        axios.post('/api/identify/sign-in/password', 
            { email: signIn.email, password: signIn.password }, 
            { cancelToken: source.token })
            .then(({ data }) => {
                const { password, ...userInfo } = signIn;
                localStorage.setItem("userInfo", JSON.stringify(userInfo));
                history.push('/');
            })
            .catch( e => {
                if( axios.isCancel(e) ) return;
                dispatch({ type: CHANGE_DATA, data: { isLoading: false }});
            });
    }

    useEffect(() => {
        return () => source.cancel();
    }, [])

    return <>
        <Box fontSize="1.4rem" fontWeight="600">{`${signIn.firstName} ${signIn.lastName}`}</Box>
        <Box fontSize="0.95rem" fontWeight="500" marginTop="0.5rem" marginBottom="2rem"
            display="flex" justifyContent="center">
            {/* <Link to='/' style={{ textDecoration: "none", color: "#777777" }}>YouTube Clone으로 이동</Link> */}
            <Box border={1} borderRadius="1rem" padding="0.2rem" paddingLeft="0.5rem" paddingRight="0.5rem" textAlign="left">
                {/* <Box border={1} borderRadius="1rem" bgcolor="gray" display="inline" marginRight="0.5rem" overflow="hidden">
                    <img src={Sample} style={{ width: "1rem", height: "1rem" }} />
                </Box> */}
                { signIn.email }
            </Box>
        </Box>

        <Box width="100%">
            <TextField type={ showPassword ? "text" : "password" } value={signIn.password} id="password" onChange={onChangeInput} variant="outlined" fullWidth label="비밀번호 입력"/>
            <Box display="flex" marginTop="0.5rem" fontSize="0.9rem">
                <FormControlLabel label="비밀번호 표시"
                    control={<Checkbox checked={showPassword} onChange={handleChange} name="passwordHide" color="primary" />}/>
            </Box>
        </Box>
        <Box height="0.8rem" marginTop="2rem" textAlign="center" fontSize="0.8rem" fontWeight="600" color="red">
            {/* { isError ? errorType() : ''  } */}
        </Box>
        <Box display="flex" alignItems="center" justifyContent="space-between" marginTop="3rem">
            <Link to="/" style={{ textDecoration: "none", color: "blue" }}>비밀번호 찾기</Link>
            <Button disabled={!signIn.password} onClick={onClickSubmit} variant="contained" color="primary">다음</Button>
        </Box>
    </>
};

export default PasswordPage;