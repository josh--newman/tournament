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
    let players = _(this.props.team.players)
      .keys()
      .map((k) => {
        let player = this.props.team.players[k];
        let playerKey = k;
        
        return (
          <Player player={player}
                  playerKey={playerKey}
                  teamKey={this.props.team.key} />
        );
      })
      .value();

    return (
      <Card style={{
        margin: "15px"
      }}>
        <CardTitle title={this.props.team.name} />
        <CardText>
          {players}
        </CardText>
      </Card>
    );
  }
}

export default Team;
