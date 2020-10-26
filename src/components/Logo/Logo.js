import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/swvl.png'
import classes from './Logo.css';

const logo = (props) => (
    <div className={classes.Logo}>
        <Link to={props.city && `/city/${props.city._id}`} >
            <img src={Logo} alt="swvl logo"/>
        </Link>
    </div>
);
            
export default logo;