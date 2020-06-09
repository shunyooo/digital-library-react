import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "../../plugins/firebase";
import { Link as RouterLink } from "react-router-dom";
import { Box, Paper, LinearProgress } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(6),
    width: "80vw",
    maxWidth: "500px",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    // width: "40vw",
    padding: theme.spacing(1),
    textTransform: "none",
  },
  progress: {
    width: "100%",
  },
}));

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

const LoginPage: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const updateSignUpState = async (): Promise<void> => {
    setLoading(true);
    const res = await firebase.auth().getRedirectResult();
    console.log("getRedirectResult:", res);
    setIsSignUp(Boolean(res.user));
    setLoading(false);
  };

  const init = async (): Promise<void> => {
    await updateSignUpState();
    if (isSignUp) {
      history.push("/home");
    }
  };

  useEffect(() => {
    init();
  }, [isSignUp]);

  const login = async (): Promise<void> => {
    console.log("login");
    try {
      const res = await firebase.auth().signInWithRedirect(googleAuthProvider);
      console.log("res", res);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "100vh", minWidth: "100vw" }}
    >
      <CssBaseline />
      <Grid item>
        {loading && <LinearProgress className={classes.progress} />}
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h2">
            InShelf
          </Typography>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={login}
            disabled={loading}
          >
            {loading ? "認証情報を確認中..." : "Google ログイン"}
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
