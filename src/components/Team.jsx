import React from 'react';
import mui from 'material-ui';

var {ListItem} = mui;

class Team extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ListItem primaryText={this.props.team.name} />
    );
  }
}

export default Team
