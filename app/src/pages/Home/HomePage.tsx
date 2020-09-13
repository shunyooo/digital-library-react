import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import firebase from "../../plugins/firebase";
import { Menu, MenuItem } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const logout = () => {
  firebase.auth().signOut();
};

const TopBar: React.FC = () => {
  const classes = useStyles();
  const [user, initialising, error] = useAuthState(firebase.auth());
  const [anchorEl, setAnchorEl] = useState(null);
  const onClickIcon = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const onCloseIcon = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          InShelf
        </Typography>
        <Button onClick={onClickIcon}>
          <Avatar alt={user.displayName} src={user.photoURL} />
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          keepMounted
          onClose={onCloseIcon}
        >
          <MenuItem onClick={logout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

const HomePage: React.FC = () => {
  const classes = useStyles();
  const [user, initialising, userError] = useAuthState(firebase.auth());
  const [storeValues, storeLoading, storeError] = useCollectionData(
    firebase.firestore().collection("comics"),
    {
      idField: "id",
    }
  );

  console.log("Home", user, initialising, userError);
  console.log("comics", storeValues, storeLoading, storeError);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <TopBar />
    </div>
  );
};

export default HomePage;
