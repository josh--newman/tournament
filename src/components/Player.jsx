import React from 'react';
import mui from 'material-ui';
import trim from 'trim';
import Actions from '../actions';

var {TextField} = mui;

class Player extends React.Component {
  constructor(props) {
    super(props);
  }

  onChange(evt) {
    this.setState({
      player: evt.target.value
    });
  }

  onKeyUp(evt) {
    if(evt.keyCode === 13 && trim(evt.target.value) != '') {
      evt.preventDefault();

      let editPlayerPayload = {
        player: this.state.player,
        teamKey: this.props.teamKey,
        playerKey: this.props.playerKey
      };

      debugger;

      Actions.editPlayer(editPlayerPayload);

      this.setState({
        player: ''
      });

      console.log("player update to: " + this.state.player)
    }
  }

  render() {
    return (
      <TextField
        defaultValue={this.props.player.name}
        onChange={this.onChange.bind(this)}
        onKeyUp={this.onKeyUp.bind(this)} />
    );
  }
}

export default Player;
