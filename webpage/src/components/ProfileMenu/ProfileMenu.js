import { Box, Button, ClickAwayListener, Grow, IconButton, MenuItem, MenuList, Paper, Popper } from "@material-ui/core";
import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { menuList } from "./data/menuList";

const ProfileMenu = ({ userInfo: { firstName, lastName, email } }) => {
    const history = useHistory();

    const [ open, setOpen ] = useState(false);
    const anchorRef = useRef();

    const onClickMenu = ({ currentTarget: { id }}) => {
        handleClose();
        console.log(id);
        if( id === "log-out" ) localStorage.removeItem('userInfo');
        history.go();
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleListKeyDown = (event) => {
        if (event.key === 'Tab') {
          event.preventDefault();
          setOpen(false);
        }
    }
    
    const onClickButton = () => setOpen(!open);

    return <Box display="flex">
        <Box paddingLeft="1.5rem" paddingRight="1.5rem" ref={anchorRef}>
            <IconButton onClick={onClickButton}
                style={{ background:"#7777ff", borderRadius: "1rem", 
                border: "0", width: "2rem", height: "2rem", fontSize: "1rem",
                textAlign:"center", color: "white", lineHeight: "2rem" }}>
                {`${lastName[0]}`}    
            </IconButton>
            {/* <button onClick={onClickButton}
                style={{ background:"#7777ff", borderRadius: "1rem", 
                border: "0", width: "2rem", height: "2rem",
                textAlign:"center", color: "white", lineHeight: "2rem" }}>
                {`${userInfo.lastName[0]}`}
            </button> */}
        </Box>
        <Popper open={open} anchorEl={anchorRef.current} transition >
            <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                <Box width="20rem" display="flex" flexDirection="column">
                    <Box display="flex" padding="1rem" borderColor="#aaaaaa" borderBottom={1}>
                        <Box width="3rem" height="3rem" bgcolor="#7777ff" borderRadius="1.5rem" 
                            textAlign="center" lineHeight="3rem" fontSize="1.5rem" color="#ffffff">
                            {`${lastName[0]}`} 
                        </Box>
                        <Box marginLeft="1rem" display="flex" flexDirection="column">
                            <Box height="1.5rem">{ `${firstName}${lastName}` }</Box>
                            <Box height="1.5rem">{email}</Box>
                        </Box>
                    </Box>
                    <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                        {
                            menuList.map( (menu, idx) => {
                                return <MenuItem key={`menuItem-${idx}`} onClick={onClickMenu} id={menu.id}>
                                        <menu.icon size="1.3rem" />
                                        <Box paddingLeft="0.5rem" fontSize="0.9rem" fontWeight="700">
                                            { menu.text }
                                        </Box>
                                    </MenuItem>
                            })   
                        }
                    </MenuList>
                </Box>
                </ClickAwayListener>
            </Paper>
        </Popper>
    </Box>
};

export default ProfileMenu;