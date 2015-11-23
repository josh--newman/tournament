import React from 'react';
import mui from 'material-ui';
import Actions from '../actions'
import Team from './Team.jsx'
import TeamStore from '../stores/TeamStore'
import connectToStores from 'alt/utils/connectToStores';
import _ from 'lodash';
import trim from 'trim';

var {
  Card,
  List,
  CircularProgress,
  IconButton,
  TextField,
  ListItem} = mui;

@connectToStores
class TeamList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.setState({
      addingTeam: false
    });
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

  onClick() {
    if (!this.state.addingTeam) {
      this.setState({
        addingTeam: true
      });
    } else {
      this.setState({
        addingTeam: false
      });
    }
  }

  onChange(evt) {
    this.setState({
      newTeam: evt.target.value
    });
  }

  onKeyUp(evt) {
    if(evt.keyCode === 13 && trim(evt.target.value) != '') {
      evt.preventDefault();

      Actions.createTeam(this.state.newTeam);

      this.setState({
        newTeam: ''
      });

      console.log('Created a new team: ', evt.target.value);
    }
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

    let addTeamField = null;
    if (this.state.addingTeam) {
      addTeamField = <TextField style={{
                        marginLeft: "15px"
                      }}
                      hintText="Team name"
                      value={this.state.newTeam}
                      onChange={this.onChange.bind(this)}
                      onKeyUp={this.onKeyUp.bind(this)} />;

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
        margin: "0 auto",
        display: "block",
        maxWidth: "600px"
      }}>
        <IconButton
          iconClassName="material-icons"
          onClick={this.onClick.bind(this)}>add</IconButton>
        {addTeamField}
        {teamNodes}
      </Card>
    );
  }
}

export default TeamList
