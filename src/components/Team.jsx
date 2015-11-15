import React from 'react';
import mui from 'material-ui';
import Actions from '../actions';

var {ListItem} = mui;

class Team extends React.Component {
  constructor(props) {
    super(props);
  }

  onClick() {
    Actions.teamOpened(this.props.team);
  }

  render() {
    let style = {}

    if (this.props.team.selected) {
      style.backgroundColor = '#f0f0f0';
    }

    return (
      <ListItem
        href={'/#/team/' + this.props.team.key}
        style={style}
        key={this.props.team.key}
        primaryText={this.props.team.name}
        onClick={this.onClick.bind(this)}/>
    );
  }
}

export default Team
