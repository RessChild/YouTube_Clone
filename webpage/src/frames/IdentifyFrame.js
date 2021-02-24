import { Box } from "@material-ui/core";
import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { IdentifyRoute } from "../router";

const IdentifyFrame = () => {

    const viewRoute = () => {
        return <Switch>
            { IdentifyRoute.map( ({ classify ,path, component }, idx) => <Route key={`identify-${idx}`} path={`${classify}${path}`} component={component} /> ) }
            <Redirect to="/identify/sign-in" />
        </Switch>
    } 

    return <Box width="100vw" height="100vh"
        display="flex" flexDirection="column" alignItems="center" justifyContent="center">
        { viewRoute() }
    </Box>
}

export default IdentifyFrame;