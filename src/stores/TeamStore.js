import alt from '../alt';
import Actions from '../actions';
import {decorate, bind, datasource} from 'alt/utils/decorators';
import TeamSource from '../sources/TeamSource';
import PlayerSource from '../sources/PlayerSource';
import _ from 'lodash';

@datasource(TeamSource, PlayerSource)
@decorate(alt)
class TeamStore {
  constructor() {
    this.state = {
      players: null
    };
  }

  @bind(Actions.playersReceived)
  receivedPlayers(players) {
    _(players)
    .keys()
    .each((key, index) => {
      players[key].key = key;
    })
    .value();

    this.setState({
      players
    });
  }

  @bind(Actions.editPlayer)
  editPlayer(editPlayerPayload) {
    this.state.player = editPlayerPayload.player;
    this.state.teamKey = editPlayerPayload.teamKey;
    this.state.playerKey = editPlayerPayload.playerKey;
    setTimeout(this.getInstance().editPlayer, 10);
  }


  @bind(Actions.teamsReceived)
  receivedTeams(teams) {
    let selectedTeam;
    _(teams)
    .keys()
    .each((key, index) => {
      teams[key].key = key;
      if (teams[key].selected) {
        selectedTeam = teams[key];
      }
    })
    .value();

    this.setState({
      teams,
      selectedTeam
    });

    setTimeout(this.getInstance().getPlayers, 100);
  }

  @bind(Actions.teamReceived)
  teamReceived(team) {
    if(this.state.teams[team.key]) {
      return;
    }

    this.state.teams[team.key] = team;

    this.setState({
      team: this.state.team
    });
  }

  @bind(Actions.createTeam)
  createTeam(team) {
    this.state.team = team;
    setTimeout(this.getInstance().createTeam, 10);
  }

  @bind(Actions.teamOpened)
  teamOpened(selectedTeam) {
    _(this.state.teams)
    .values()
    .each((team) => {
      team.selected = false;
    })
    .value();

    selectedTeam.selected = true;

    this.setState({
      selectedTeam,
      teams: this.state.teams
    });

    setTimeout(this.getInstance().getPlayers, 100);
  }

}

export default alt.createStore(TeamStore);
