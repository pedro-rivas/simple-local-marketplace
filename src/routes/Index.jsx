import React from 'react';

import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Landing from '../pages/Landing/Index';
import Home from '../pages/Home/Index';
import Products from '../pages/Products/Index';
import Create from '../pages/Products/Create';

export default function Routes(){

  //const session = sessionStorage.getItem("user");
  
  return(
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Landing}/>
            <Route exact path="/h/" component={Home}/>
            <Route exact path="/products/" component={Products}/>
            <Route exact path="/products/create" component={Create}/>
        </Switch>
    </BrowserRouter>
  );
  
};
