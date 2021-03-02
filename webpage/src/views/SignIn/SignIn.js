import { Box, Button, TextField } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import { Link, Redirect, Route, Switch } from "react-router-dom";

import Logo from "../../sources/google_logo.jpg";
import { CHANGE_DATA, CHANGE_DATA_STRUCT, signInDefault, signInReducer } from "./reducers/SignInReducer";
import { signInRoute, singInDefaultRoute } from "./signInRouter";

const SignIn = () => {
    const source = axios.CancelToken.source();

    const [ state, dispatch ] = useReducer(signInReducer, signInDefault);
    const { isLoading, isError, mode, signIn } = state;

    const createRoute = () => {
        return <Switch>
            {
                signInRoute.map( ({ path, component}, idx) => 
                    <Route key={`sign-in-${idx}`} path={path} component={component} />)
            }
            <Redirect to={singInDefaultRoute} />
        </Switch>;
    }

    // 입력
    const onChangeInput = ({ currentTarget: { id, value }}) => {
        dispatch({ type: CHANGE_DATA_STRUCT, target: 'signIn', data: { [id]: value } });
    }

    // 이메일확인 완료
    const onClickSubmit = () => {
        if( !signIn.email ) return; // 빈 칸은 허용x
        dispatch({ type: CHANGE_DATA, data: { isLoading: true }});
        axios.post('/api/identify/sign-in/email', { email: signIn.email }, { cancelToken: source.token })
            .then(({ data }) => {
                console.log(data);
                if( !data ) {
                    return dispatch({ type: CHANGE_DATA, data: { isLoading: false }});
                }
                dispatch({ type: CHANGE_DATA, data: { mode: 'password', isLoading: false }});
            })
            .catch( e => {
                if( axios.isCancel(e) ) return;
                dispatch({ type: CHANGE_DATA, data: { isLoading: false }});
            });
    }

    useEffect(() => {
        return () => source.cancel();
    }, [])

    return <Box width="100vw" height="100vh"
        display="flex" flexDirection="column" alignItems="center" justifyContent="center">
        {/* <Box position="absolute" top="0" bgcolor="blue">ㅇㅅㅇ</Box> */}
        <Box width="24rem" height="28rem" padding="2rem" paddingTop="3rem" paddingBottom="3rem"
            border={1} borderColor="#999999" borderRadius="0.5rem" textAlign="center">
            <Box><img src={Logo} style={{ maxWidth: "7rem" }} /></Box>
            <Box fontSize="1.4rem" fontWeight="600">로그인</Box>
            <Box fontSize="1rem" fontWeight="500" marginTop="0.5rem" marginBottom="2rem">
                <Link to='/' style={{ textDecoration: "none", color: "#777777" }}>YouTube Clone으로 이동</Link>
            </Box>
            <Box width="100%">
                <TextField type="email" value={signIn.email} id="email" onChange={onChangeInput} variant="outlined" fullWidth label="이메일 또는 휴대전화"/>
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
        { createRoute() }
    </Box>
}

export default SignIn;