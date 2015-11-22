import React from 'react';
import mui from 'material-ui';
import Actions from '../actions';
import Player from './Player.jsx';

var {Card, CardTitle, CardText} = mui;

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

    let players = _(this.props.team.players).map((player) => {
      return (
        <Player name={player}/>
      );
    }).value();

    return (
      <Card>
        <CardTitle title={this.props.team.name} />
        <CardText>
          {players}
        </CardText>
      </Card>
    );
  }
}

export default Team
