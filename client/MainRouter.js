import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './core/Home';
import Users from './user/Users';
import Demo from './user/Demo'; 

class MainRouter extends Component {
  render() {
    return (<div>
      <Switch>
	<Route path="/users" component={Users} />
        <Route exact path="/" component={Home} />
      </Switch>
    </div>)
  }
}

export default MainRouter; 

