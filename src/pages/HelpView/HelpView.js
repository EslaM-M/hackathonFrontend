import React, { Component } from 'react';
import Aux from '../../hoc/Aux'
import cssClasses from './HelpView.css'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}
const useStyles = makeStyles((theme) => ({
  fab: {
    margin: theme.spacing(2),
  },
  absolute: {
    position: 'absolute',
    bottom: theme.spacing(15),
    right: theme.spacing(68),
  },
}));

export default function HelpView() {
  const classes = useStyles();
  return (
    <Aux>
      <h1>
        Help View Controller
        </h1>
      <div className={cssClasses.Container}>
        <div className={cssClasses.menuItemContainer}></div>
        <div className={cssClasses.mobileScreenContainer}>
          <div style={{
            width: '45%',
            margin: '100px'
          }}>
            <List dense={true}>
              {generate(
                <ListItem>
                  <ListItemText
                    primary="Captain Not Wearing the mask"
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                      <EditIcon />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>,
              )}
            </List>
          </div>
          <Tooltip title="Add" aria-label="add">
            <Fab color="secondary" className={classes.absolute}>
              <AddIcon />
            </Fab>
          </Tooltip>
        </div>

      </div>
    </Aux >
  )
}