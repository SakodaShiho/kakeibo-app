import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { auth } from "../firebase";
import Header from "./Header";
import Box from "@material-ui/core/Box";
import Copyright from "./Copyright";
import Button from "@material-ui/core/Button";

import "../css/Home.css";
import "../css/LoginSignup.css";

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
    width: "200px",
    backgroundColor: "#aecbcd",
    height: "50px",
    borderRadius: "30px",
    boxShadow: "none",
    transition: "all 0.8s",
    "&:hover": {
      backgroundColor: "#71a4a8",
      boxShadow: "none",
    },
  },
}));

function Home(props) {
  const classes = useStyles();
  return (
    <div>
      <Header />

      <div class="btn_field">
        <Button className={classes.submit} onClick={() => auth.signOut()}>
          Sign out
        </Button>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </div>
  );
}

export default Home;
