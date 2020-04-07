import React from "react";
import classes from "./Toollbar.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";
import { Link } from "react-router-dom";

const toollbar = (props) => (
  <header className={classes.Toollbar}>
    <DrawerToggle clicked={props.drawerToggleClicked} />
    <div className={classes.Logo}>
      <Link to="/">
        <Logo />
      </Link>
    </div>
    <nav className={classes.DesktopOnly}>
      <NavigationItems />
    </nav>
  </header>
);

export default toollbar;
