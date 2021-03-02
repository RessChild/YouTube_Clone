import { Box, Button, Grid, TextField } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useReducer } from "react";
import { Link } from "react-router-dom";

import Logo from "../../sources/google_logo.jpg";
import { CHANGE_DATA } from "../Home/reducers/HomeReducer";
import { CHANGE_DATA_STRUCT, signUpDefault, signUpReducer } from "./reducers/SignUpReducer";

const SignUp = ({ history }) => {
    const source = axios.CancelToken.source();

    const [ state, dispatch ] = useReducer(signUpReducer, signUpDefault);
    const { isLoading, isError, signUp } = state;

    const onChangeInput = ({ currentTarget: { value, id }}) => dispatch({ type: CHANGE_DATA_STRUCT, target: "signUp", data: { [id]: value } });
    const createTextField = (placeholder, value, id, type="text") => 
        <TextField value={value} type={type} id={id} onChange={onChangeInput} variant="outlined" size="small" fullWidth placeholder={placeholder} />

    // 에러 타입 확인
    const errorType = () => {
        switch (isError) {
            case 100:
                return "비밀번호가 일치하지 않습니다. 다시 확인하세요.";
            // case 401:
            //     return "잘못된 비밀번호입니다. 다시 확인하세요.";
            case 401:
                return "서버에 오류가 발생하였습니다. 잠시 후 다시 시도해주세요."
            case 404:
                return "이미 존재하는 사용자 Email 입니다.";   
            case 500:
                return "인터넷에 연결되어 있는지 확인한 후 다시 시도해보세요.";
            default:
                return "알 수 없는 오류입니다. 잠시 후 다시 시도해주세요.";
                // throw new Error("cant find error type");
        }
    }
    
    const onClickSubmit = () => {
        const { passwordCheck, ...others } = signUp;
        if( others.password !== passwordCheck ) return dispatch({ type: CHANGE_DATA, data: { isError: 100 }})

        dispatch({ type: CHANGE_DATA, data: { isLoading: true }});
        axios.post('/api/identify/sign-up', others, { cancelToken: source.token })
            .then(() => {
                // 회원가입여부 처리함
                history.push('/identify');
            })
            .catch( e => {
                if(axios.isCancel(e)) return;
                console.log(e.response);
                if( e.response ) { // 네트워크 오류 검사
                    dispatch({ type: CHANGE_DATA, data: {
                        isLoading: false,
                        isError: e.response.status,
                    }})
                }
                else {
                    dispatch({ type: CHANGE_DATA, data: {
                        isLoading: false,
                        isError: 500,
                    }})
                }
            });
    }

    useEffect(() => {
        return () => source.cancel();
    }, [])

    return <Box width="100vw" height="100vh"
        display="flex" flexDirection="column" alignItems="center" justifyContent="center">
        <Box width="40rem" padding="2rem" paddingTop="3rem" paddingBottom="3rem"
            border={1} borderColor="#999999" borderRadius="0.5rem"
            display="flex" alignItems="center" position="relative">
            <Box flex={7} display="flex" flexDirection="column">
                <img src={Logo} style={{ maxWidth: "7rem" }} />
                <Box fontSize="1.4rem" fontWeight="600" >YouTube Clone 계정 만들기</Box>
                <Box fontSize="1rem" fontWeight="500" marginTop="0.5rem" marginBottom="2rem">
                    <Link to='/' style={{ textDecoration: "none", color: "#777777" }}>Youtube Clone으로 이동</Link>
                </Box>
                <Grid container spacing={1}>
                    <Grid item xs={6}>
                        { createTextField("성", signUp.firstName, "firstName") }
                    </Grid>
                    <Grid item xs={6}>
                        { createTextField("이름", signUp.lastName, "lastName") }
                    </Grid>
                    <Grid item xs={12}>
                        { createTextField("이메일 주소", signUp.email, "email", "email") }
                    </Grid>
                    <Grid item xs={6}>
                        { createTextField("비밀번호", signUp.password, "password", "password") }
                    </Grid>
                    <Grid item xs={6}>
                        { createTextField("확인", signUp.passwordCheck, "passwordCheck", "password") }
                    </Grid>
                    <Grid item xs={12}>
                        <Box marginLeft="1rem" fontSize="0.8rem" color="#777777">
                            문자, 숫자, 기호를 조합하여 8자 이상을 사용하세요
                        </Box>
                    </Grid>
                </Grid>
                <Box height="0.8rem" marginTop="2rem" textAlign="center" fontSize="0.8rem" fontWeight="600" color="red">
                    { isError ? errorType() : ''  }
                </Box>
                <Box display="flex" alignItems="center" justifyContent="space-between" marginTop="2rem">
                    <Link to="/identify/sign-in" style={{ textDecoration: "none", color: "blue" }}>로그인 창으로</Link>
                    <Button onClick={onClickSubmit} variant="contained" color="primary">가입</Button>
                </Box>
            </Box>
            <Box flex={5} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                <Box fontSize="1.2rem" fontWeight="600">- Youtube Clone -</Box>
                <Box fontSize="0.8rem" color="#777777">created by 최현수</Box>
                <Box marginTop="1rem">REACT / NESTJS / TYPEORM</Box>
            </Box>
        </Box>
        {/* <Box>회원가입</Box> */}
    </Box>
}

export default SignUp;