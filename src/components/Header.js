import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { PriceField } from "./PriceField";

import "../css/Home.css";
import "../css/LoginSignup.css";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginRight: "1rem",
      width: "25ch",
    },
  },
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
    "&:disabled": {
      backgroundColor: "#c7c7c7",
    },
  },
}));

const Header = () => {
  const classes = useStyles();
  const [price, setPrice] = useState("");

  return <PriceField setPrice={setPrice} price={price} />;
};

export default Header;
