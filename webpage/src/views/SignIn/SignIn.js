import { Box, Button, TextField } from "@material-ui/core";
import React, { useReducer, useState } from "react";
import { Link } from "react-router-dom";

import Logo from "../../sources/google_logo.jpg";
import { CHANGE_DATA_STRUCT, signInDefault, signInReducer } from "./reducers/SignInReducer";

const SignIn = () => {

    const [ state, dispatch ] = useReducer(signInReducer, signInDefault);
    const { isLoading, isError, signIn } = state;

    // 입력
    const onChangeInput = ({ currentTarget: { id, value }}) => {
        dispatch({ type: CHANGE_DATA_STRUCT, target: 'signIn', data: { [id]: value } });
    }

    // 이메일확인 완료
    const onClickSubmit = () => alert("이메일체크")

    return <Box width="100vw" height="100vh"
        display="flex" flexDirection="column" alignItems="center" justifyContent="center">
        <Box width="24rem" height="28rem" padding="2rem" paddingTop="3rem" paddingBottom="3rem"
            border={1} borderColor="#999999" borderRadius="0.5rem" textAlign="center">
            <Box><img src={Logo} style={{ maxWidth: "7rem" }} /></Box>
            <Box fontSize="1.4rem" fontWeight="600">로그인</Box>
            <Box fontSize="1rem" fontWeight="500" marginTop="0.5rem" marginBottom="2rem">
                <Link to='/' style={{ textDecoration: "none", color: "#777777" }}>YouTube Clone으로 이동</Link>
            </Box>
            <Box width="100%">
                <TextField value={signIn.email} id="email" onChange={onChangeInput} variant="outlined" fullWidth label="이메일 또는 휴대전화"/>
                <Box display="flex" marginTop="0.5rem" fontSize="0.9rem">
                    <Link style={{ textDecoration: "none", color: "blue" }}>이메일을 앚으셨나요?</Link>
                </Box>
            </Box>
            <Box height="0.8rem" marginTop="2rem" textAlign="center" fontSize="0.8rem" fontWeight="600" color="red">
                {/* { isError ? errorType() : ''  } */}
            </Box>
            <Box display="flex" alignItems="center" justifyContent="space-between" marginTop="3rem">
                <Link to="/identify/sign-up" style={{ textDecoration: "none", color: "blue" }}>계정 만들기</Link>
                <Button onClick={onClickSubmit} variant="contained" color="primary">다음</Button>
            </Box>
        </Box>
        {/* <Box>
            로그인
        </Box> */}
    </Box>
}

export default SignIn;