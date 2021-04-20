import React from "react";
import { fade, makeStyles, TextField } from "@material-ui/core"; 

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

const useStylesReddit = makeStyles((theme) => ({
  root: {
    border: '1px solid #e2e2e1',
    overflow: 'hidden',
    borderRadius: 4,
    backgroundColor: '#fcfcfb',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:hover': {
      backgroundColor: '#fff',
    },
    '&$focused': {
      backgroundColor: '#fff',
      boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
      borderColor: theme.palette.primary.main,
    },
  },
  focused: {},
}));
  
const RedditTextField = (props) => {
  const classes = useStyles();
  const redditClass = useStylesReddit();

  return <TextField className={classes.margin} variant="filled" fullWidth
            InputProps={{ classes: redditClass, disableUnderline: true }} 
            {...props} />;
}

export default RedditTextField;