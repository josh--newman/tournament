import React from 'react';
import mui from 'material-ui';
import Team from './Team.jsx'
import TeamStore from '../stores/TeamStore'
import connectToStores from 'alt/utils/connectToStores';
import _ from 'lodash';

var {Card, List, CircularProgress} = mui;

@connectToStores
class TeamList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.selectedTeam = this.props.params.team;
    TeamStore.getTeams(this.selectedTeam);
  }

  componentWillReceiveProps(nextProps) {
    if (this.selectedTeam != nextProps.params.team) {
      this.selectedTeam = nextProps.params.team;
      TeamStore.getTeams(this.selectedTeam)
    }
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
    if(!this.props.teams) {
      return (
        <Card style={{
          flexGrow: 1
        }}>
          <CircularProgress
            mode="indeterminate"
            style={{
              paddingTop: '20px',
              paddingBottom: '20px',
              margin: '0 auto',
              display: 'block',
              width: '60px'
            }}
          />
        </Card>
      )
    }

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
