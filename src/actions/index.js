import alt from '../alt';
import Firebase from 'firebase';


class Actions {
  constructor() {
    this.generateActions (
      'teamsReceived',
      'teamOpened',
      'playersReceived',
      'createTeam',
      'teamReceived',
      'teamCreatedSuccess'
    );
  }
}

export default alt.createActions(Actions);
