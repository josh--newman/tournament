import alt from '../alt';
import Firebase from 'firebase';


class Actions {
  constructor() {
    this.generateActions (
      'teamsReceived',
      'teamOpened',
      'playersReceived'
    );
  }
}

export default alt.createActions(Actions);
