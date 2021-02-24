import { Button } from "@material-ui/core";
import React from "react";

const CustomButton = ({ onClick, children }) => {

    return <Button variant="outlined" color="primary" onClick={onClick} style={{ padding: "0.5rem 1rem" }}>
            { children }
        </Button>
}

export default CustomButton;