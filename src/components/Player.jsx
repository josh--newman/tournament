import React from 'react';
import mui from 'material-ui';

var {TextField} = mui;

class Player extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TextField defaultValue={this.props.name} />
    );
  }
}

export default Player;
