import React from 'react';
import mui from 'material-ui';
import trim from 'trim';
import Actions from '../actions';

var {TextField} = mui;

class Player extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.setState({
      editingPlayer: false
    });
  }

  onClick() {
    this.setState({
      editingPlayer: true
    });
  }

  onChange(evt) {
    this.setState({
      player: evt.target.value
    });
  }

  onKeyUp(evt) {
    if(evt.keyCode === 13 && trim(evt.target.value) != '') {
      evt.preventDefault();
      this.refs.playerTextField.blur();

      let editPlayerPayload = {
        player: this.state.player,
        teamKey: this.props.teamKey,
        playerKey: this.props.playerKey
      };

      Actions.editPlayer(editPlayerPayload);

      this.setState({
        player: ''
      });

      console.log("player update to: " + this.state.player)
    }
  }

  onBlur() {
    this.setState({
      editingPlayer: false
    });
  }

  render() {
    let playerField = null;
    if (this.state.editingPlayer) {
      return (
        <TextField
          ref="playerTextField"
          defaultValue={this.props.player.name}
          onChange={this.onChange.bind(this)}
          onKeyUp={this.onKeyUp.bind(this)}
          onBlur={this.onBlur.bind(this)} />
      );
    } else {
      return (
        <p
          style={{
            display: "inline-block",
            width: "256px",
            fontSize: "16px"
          }}
          onClick={this.onClick.bind(this)}>
          {this.props.player.name}
        </p>
      );
    }
  }
}

export default Player;
