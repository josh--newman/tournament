import React from 'react';
import mui from 'material-ui';
import Team from './Team.jsx'
import TeamStore from '../stores/TeamStore'
import connectToStores from 'alt/utils/connectToStores';

var {Card, List} = mui;

@connectToStores
class TeamList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    TeamStore.getTeams();
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
    var teamNodes = _(this.props.teams)
      .keys()
      .map((k) => {
        let team = this.props.teams[k];
        return (
          <Team team={team}/>
        );
      })
      .value();

    return (
      <Card style={{
        flexGrow: 1
      }}>
        <List>
          {teamNodes}
        </List>
      </Card>
    );
  }
}

export default TeamList
