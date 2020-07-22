import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import List, { ListItemAvatar, ListItem } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import { list } from './api-user';

class Demo extends Component {

  state = { users: [] };

  componentDidMount = () => {
    list().then((data) => {
      if (data.error)
        console.log(data.error);
      else {
	console.log(data);
        this.setState({users:data});
      }
    });
  }


  render() {
    const { classes } = this.props;


    return (
      <Paper className={classes} elevation={4}>
      <h1> Hello Demo </h1>
      </Paper>
    );
  }
}

export default Demo;
