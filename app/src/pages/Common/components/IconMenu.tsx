import React, { useState, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import { Menu, MenuItem } from "@material-ui/core";
import { logout } from "../../../plugins/Auth";
import DBUserStatus from "../../../plugins/DBUserStatus";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1,
  },
  linkItem: {
    "& a": { textDecoration: "none" },
    "& a:visited": { color: "inherit" },
  },
}));

const IconMenu: React.FC = () => {
  const classes = useStyles();
  const [user, ,] = DBUserStatus();
  const [anchorEl, setAnchorEl] = useState(null);
  const onClickIcon = (event): void => {
    setAnchorEl(event.currentTarget);
  };

  const onCloseIcon = (): void => {
    setAnchorEl(null);
  };

  return (
    <Fragment>
      <Button onClick={onClickIcon}>
        {user ? <Avatar alt={user.name} src={user.photo_url} /> : <Avatar />}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        keepMounted
        onClose={onCloseIcon}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <MenuItem className={classes.linkItem}>
          <Link to="/home">ホーム</Link>
        </MenuItem>
        {user && user.roles.includes("admin") && (
          <MenuItem className={classes.linkItem}>
            <Link to="/">admin専用（仮）</Link>
          </MenuItem>
        )}
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
    </Fragment>
  );
};

export default IconMenu;
