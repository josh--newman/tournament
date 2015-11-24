import Actions from '../actions';
import Firebase from 'firebase';

const firebaseTeamsURL = "https://tournament-time.firebaseio.com/teams/"
let firebaseRef = null;

let PlayerSource = {
  editPlayer: {
    remote(state) {
      if (firebaseRef) {
        firebaseRef.off();
      }

      firebaseRef = new Firebase(firebaseTeamsURL
        + state.teamKey + "/players/" + state.playerKey);

      return new Promise((resolve, reject) => {
        firebaseRef.update({name: state.player}, (err) => {
          resolve();
        });
      });
    },

    success: Actions.editPlayerSuccessful
  }
}

export default PlayerSource;
