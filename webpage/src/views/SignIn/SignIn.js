import { Box, LinearProgress } from "@material-ui/core";
import React, { useEffect, useReducer } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import Logo from "../../sources/google_logo.jpg";
import { CHANGE_DATA, CHANGE_DATA_STRUCT, signInDefault, signInReducer } from "./reducers/SignInReducer";
import { signInRoute, singInDefaultRoute } from "./signInRouter";

const SignIn = ({ history }) => {
    // const source = axios.CancelToken.source();

    const [ state, dispatch ] = useReducer(signInReducer, signInDefault);
    const { isLoading, isError, mode, signIn } = state;

    // useEffect(() => {
    //     return () => source.cancel();
    // }, [])

    const routeComponent = {
        signIn,
        dispatch,
        CHANGE_DATA: CHANGE_DATA,
        CHANGE_DATA_STRUCT: CHANGE_DATA_STRUCT,
    }

    const createRoute = () => {
        return <Switch>
            {
                signInRoute.map( (route, idx) =>
                    <Route key={`sign-in-${idx}`} path={route.path} render={() => <route.component { ...routeComponent } />} />)
            }
            <Redirect to={singInDefaultRoute} />
        </Switch>;
    }

    useEffect(() => {
        history.replace(`/identify/sign-in/${mode}`)
    }, [mode])

    return <Box width="100vw" height="100vh"
        display="flex" flexDirection="column" alignItems="center" justifyContent="center">
        {/* <Box position="absolute" top="0" bgcolor="blue">ㅇㅅㅇ</Box> */}
        <Box width="24rem" height="28rem" padding="2rem" paddingTop="3rem" paddingBottom="3rem"
            border={1} borderColor="#999999" borderRadius="0.5rem" textAlign="center"
            position="relative">
            { isLoading && 
                <Box position="absolute" display="flex" flexDirection="column" top={0} left={0} width="100%" height="100%">
                    <LinearProgress />
                    <Box flex={1} bgcolor="#9f9f9f" style={{ opacity: "30%" }} zIndex={1}></Box>
                </Box> 
            }
            <Box><img src={Logo} style={{ maxWidth: "7rem" }} /></Box>
            { createRoute() }
        </Box>
    </Box>
}

export default SignIn;