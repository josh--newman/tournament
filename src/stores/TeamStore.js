import alt from '../alt';
import Actions from '../actions';
import {decorate, bind, datasource} from 'alt/utils/decorators';
import TeamSource from '../sources/TeamSource';
import _ from 'lodash';

@datasource(TeamSource)
@decorate(alt)
class TeamStore {
  constructor() {
    this.state = {
      players: null
    };
  }

  @bind(Actions.teamsReceived)
  receivedTeams(teams) {
    _(teams)
    .keys()
    .each((key, index) => {
      teams[key].key = key;
    })
    .value();

    this.setState({
      teams
    });
  }

}

export default alt.createStore(TeamStore);
