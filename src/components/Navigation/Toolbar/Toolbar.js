import React from "react";
import { Logo } from "../../";
import classes from "./Toolbar.css";
import { Grid, IconButton, Tooltip } from "@material-ui/core/";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { logout } from "../../../store/actions";
import { bindActionCreators } from "redux";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const Toolbar = props => {
  return (
    <header className={classes.Toolbar}>
      <div className={classes.LogoContainer}>
        <Logo city={props.selectedCity} />
      </div>
      <div className={classes.ActionButtons}>
        <Grid item>
          <Tooltip key={"Logout"} title={"Logout"} aria-label="Logout">
            <IconButton
              style={{ color: "white" }}
              onClick={() => props.logout()}
            >
              <ExitToAppIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      </div>
    </header>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => bindActionCreators({ logout }, dispatch);

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Toolbar)
);
