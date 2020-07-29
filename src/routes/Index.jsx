import React from 'react';

import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Landing from '../pages/Landing/Index';
import Home from '../pages/Home/Index';
import Products from '../pages/Products/Index';
import Create from '../pages/Products/Create';
import Watch from '../pages/Products/Watch';
import Login from '../pages/Login/Index';
import Signout from '../pages/signout';
import Account from '../pages/Account/Index';

export default function Routes(){

  const session = JSON.parse(sessionStorage.getItem("user"));
  return(
    <BrowserRouter>
        {session ?
          <Switch>
            <Route exact path="/" component={Landing}/>
            <Route exact path="/h/" component={Home}/>
            <Route exact path="/products/" component={Products}/>
            <Route exact path="/products/create" component={Create}/>
            <Route exact path="/products/watch" component={Watch}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/signout" component={Signout}/>
            <Route exact path="/account/" component={Account}/>
          </Switch>
        : 
          <Switch>
            <Route exact path="/" component={Landing}/>
            <Route exact path="/login" component={Login}/>
          </Switch>
        }
    </BrowserRouter>
  );
  
};
