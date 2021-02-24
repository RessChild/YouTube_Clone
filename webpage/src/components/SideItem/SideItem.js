import React from "react";
import { Box } from "@material-ui/core";
import { Route, Router, useHistory } from "react-router-dom";

const MenuItem = ({ route, selected, mode }) => {

    const history = useHistory();
    const { classify, path, name } = route;

    const onClickItem = () => {
        // alert("응애응애")
        history.push(`${classify}${path}`);
    }

    return <Box height="2.5rem" onClick={onClickItem} style={{ cursor: "pointer" }}
        bgcolor={ (mode && selected) ? "#c5c5c5" : "inherit" } display="flex" alignItems="center" paddingLeft="1.5rem">
        <Box width="3rem" display="flex" alignItems="center">
            <route.icon size="1.32rem" color={ selected ? "#ff0000" : "#505050" }/>
        </Box>
        { mode && <Box fontSize="0.9rem" color="#505050" fontWeight="600" >{ name }</Box> }
    </Box>
};

export default MenuItem;