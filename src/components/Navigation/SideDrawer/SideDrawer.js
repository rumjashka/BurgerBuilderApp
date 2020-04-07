import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./SideDrawer.module.css";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../hoc/Aux/Aux";
import { BrowserRouter as Router, Link } from "react-router-dom";

const sideDrawer = (props) => {
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (props.open) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }
  return (
    <Aux>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses.join(" ")}>
        <div className={classes.Logo}>
          <Router>
            <Link to="/">
              <Logo />
            </Link>
          </Router>
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;
