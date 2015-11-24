import React from 'react';
import mui from 'material-ui';
import Actions from '../actions';
import Player from './Player.jsx';

var {Card, CardTitle, CardText, CardActions, FlatButton} = mui;

class Team extends React.Component {
  constructor(props) {
    super(props);
  }

  onClick() {
    Actions.deleteTeam(this.props.team)
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
        <CardActions style={{
          float: "right",
          marginTop: "10px",
          zIndex: 100
        }}>
          <FlatButton
            onClick={this.onClick.bind(this)}
            label="delete"/>
        </CardActions>
        <CardTitle
          style={{
            borderBottom: "solid #FF5606 1px"
          }}
          title={this.props.team.name} />
        <CardText
          style={{
            margin: "0",
            padding: "5px 0 0 10px" 
          }}>
          {players}
        </CardText>
      </Card>
    );
  }
}

export default Team;
