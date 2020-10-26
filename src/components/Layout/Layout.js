import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Links from "../../router/links";
import { withRouter } from "react-router";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { bindActionCreators } from "redux";
import { Toolbar, Tooltip, IconButton } from "@material-ui/core";
import { connect } from "react-redux";
import {logout} from "../../store/actions"
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      style={{marginTop:'50px'}}
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  toolbar: {
    justifyContent: "space-between"
  }
}));

function SimpleTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    const path = Links[newValue].path;
    props.history.push(path);
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            {Links.map(link => {
              return <Tab label={link.name} key={link.name} />;
            })}
          </Tabs>
          <Tooltip key={"Logout"} title={"Logout"} aria-label="Logout">
            <IconButton
              style={{ color: "white" }}
              onClick={() => props.logout()}
            >
              <ExitToAppIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      {Links.map((link, index) => {
        return (
          <TabPanel value={value} index={index} key={index}>
            {props.children}
          </TabPanel>
        );
      })}
    </div>
  );
}
const mapStateToProps = state => ({
  
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ logout }, dispatch);


export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SimpleTabs)
  );
