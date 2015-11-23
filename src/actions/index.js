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
      'teamCreatedSuccess',
      'editPlayer',
      'editPlayerSuccessful',
      'playerReceived'
    );
  }
}

export default alt.createActions(Actions);
