import React from 'react';
import mui from 'material-ui';

var {ListItem, TextField} = mui;

class Player extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ListItem
        primaryText={this.props.player.name}
        disabled={true}/>
    );
  }
}

export default Player;
