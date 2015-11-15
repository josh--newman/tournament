import Actions from '../actions';
import Firebase from 'firebase';

let firebaseRef = null;

let PlayerSource = {
  getPlayers: {
    remote(state){
      if (firebaseRef) {
        firebaseRef.off();
      }

      firebaseRef = new Firebase('https://tournament-time.firebaseio.com/players/'
                                + state.selectedTeam.key);
      return new Promise((resolve, reject) => {
        firebaseRef.once("value", (dataSnapshot) => {
          var players = dataSnapshot.val();
          resolve(players);

        });
      });
    },

    success: Actions.playersReceived
  }
}

export default PlayerSource;
