import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import  links  from './links'

const routes = links.map(link=>{
    return <Route key={link.name} exact path={link.path} component={link.page} />
})
const router = () => (
    <Switch>
        {routes}
        <Redirect to="/help-view" />
    </Switch>
);

export default router;