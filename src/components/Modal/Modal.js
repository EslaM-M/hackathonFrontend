import React from 'react';
import classes from './Modal.css'
import { Card } from '@material-ui/core';
const modal = (props) => {

    return (
        <div className={classes.Container}>
            <Card className={classes.Modal} >
               {props.children}
            </Card>
        </div>
    )
}

export default modal;