import Actions from '../actions';
import Firebase from 'firebase';

let firebaseRef = new Firebase('https://tournament-time.firebaseio.com/teams');

let TeamSource = {
  getTeams: {
    remote(state){
      return new Promise((resolve, reject) => {
        firebaseRef.once("value", (dataSnapshot) => {
          var teams = dataSnapshot.val();
          resolve(teams);
        });
      });
    },

    success: Actions.teamsReceived
  }
}

export default TeamSource;
