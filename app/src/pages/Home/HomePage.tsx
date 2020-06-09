import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "../../plugins/firebase";
import { Box, Paper, Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
}));

const HomePage: React.FC = () => {
  const classes = useStyles();

  return (
    <Container>
      <CssBaseline />
      HomePage
    </Container>
  );
};

export default HomePage;
