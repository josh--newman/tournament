import React from 'react';
import mui from 'material-ui';
import Player from './Player.jsx';
import _ from 'lodash';
import connectToStores from 'alt/utils/connectToStores';
import TeamStore from '../stores/TeamStore';

var {Card, List, CircularProgress} = mui;

@connectToStores
class PlayerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: []
    };
  }

  static getStores() {
    return [TeamStore];
  }

  static getPropsFromStores() {
    // Maybe be more selective here
    // to lower memory footprint
    return TeamStore.getState();
  }

  render() {
    let playerNodes = null;
    playerNodes = _.values(this.props.players).map((player, i) => {
      return (
        <Player player={player} key={i}/>
      );
    });

    return (
      <Card style={{
        flexGrow: 2,
        marginLeft: 30
      }}>
        <List>
          {playerNodes}
        </List>
      </Card>
    );
  }
}

export default PlayerList;
