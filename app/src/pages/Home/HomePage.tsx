import React, { useState, useEffect } from "react";

import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import CircularProgress from "@material-ui/core/CircularProgress";
import firebase from "../../plugins/firebase";
import { Box, Divider, Menu, MenuItem } from "@material-ui/core";

import dataController from "../../plugins/DataController";
import { User } from "../../plugins/Schemas";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { zip, sleep } from "../../plugins/Utils";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { logout } from "../../plugins/Auth";
import LoadingPage from "../Common/LoadingPage";
import TopBar from "../Common/components/TopBar";
import { useSnackbar } from "notistack";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  taskList: {},
  taskListItem: {
    display: "flex",
    height: "100px",
    backgroundColor: "white",
    cursor: "pointer",
  },
  taskListItemLeft: {},
  taskListItemRight: {
    marginLeft: "1rem",
  },
  taskListItemTitle: {
    fontSize: "1.3rem",
  },
  taskListItemDescription: {
    fontSize: "0.8rem",
    marginTop: "5px",
    color: "rgba(0, 0, 0, 0.54)",
  },
}));

const CircularProgressWithLabel: React.FC<{ value: number }> = ({ value }) => (
  <Box position="relative" display="inline-flex">
    <CircularProgress
      variant="determinate"
      value={100}
      size={70}
      style={{ position: "absolute", left: 0, color: "#E6E9F1" }}
    />
    <CircularProgress variant="static" value={value} size={70} />
    <Box
      top={0}
      left={0}
      bottom={0}
      right={0}
      position="absolute"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Typography
        variant="caption"
        component="div"
        color="textSecondary"
        style={{ fontSize: "0.9rem" }}
      >{`${Math.round(value)}%`}</Typography>
    </Box>
  </Box>
);

const HomePage: React.FC = () => {
  const classes = useStyles();
  const [user, initialising, userError] = useAuthState(firebase.auth());
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState<boolean>(false);

  console.log("Home", user, initialising, userError);

  useEffect(() => {
    const f = async (): Promise<void> => {
      if (!user) {
        return;
      }
      setLoading(true);
      // ユーザデータの登録
      const dbUser: User = await dataController.postUserIfNeed(user);
      setLoading(false);
    };
    f();
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <TopBar />
      {loading ? (
        <LoadingPage description="読み込み中..." />
      ) : (
        <List className={classes.taskList}></List>
      )}
    </div>
  );
};

export default HomePage;
