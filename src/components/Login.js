import React, { useContext } from "react";
import { AuthContext } from "../auth/AuthProvider";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import Copyright from "./Copyright";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import "../css/style.css";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#aecbcd",
    height: "50px",
    borderRadius: "30px",
    boxShadow: "none",
    transition: "all 0.8s",
    "&:hover": {
      backgroundColor: "#71a4a8",
    },
  },
  formControlLabel: {
    fontSize: "0.8rem",
  },
}));

const Login = ({ history }) => {
  const { login } = useContext(AuthContext);
  const classes = useStyles();

  // AuthContextからlogin関数を受け取る
  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    login(email.value, password.value, history);
  };

  return (
    <Container component="main" maxWidth="xs" className="inner">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label={
              <Typography className={classes.formControlLabel}>
                ログイン情報を記憶する
              </Typography>
            }
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Log in
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <NavLink
                to="/Signup"
                variant="body2"
                style={{ fontSize: "0.8rem" }}
              >
                新規登録
              </NavLink>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default withRouter(Login);
