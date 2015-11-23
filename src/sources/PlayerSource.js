import Actions from '../actions';
import Firebase from 'firebase';

let firebaseRef = null;

let PlayerSource = {
  editPlayer: {
    remote(state) {
      if (firebaseRef) {
        firebaseRef.off();
      }

      firebaseRef = new Firebase('https://tournament-time.firebaseio.com/teams/'
        + state.teamKey + "/players/" + state.playerKey);

      return new Promise((resolve, reject) => {
        firebaseRef.update({name: state.player}, (err) => {
          resolve();

          // firebaseRef.on("child_updated", (player) => {
          //   let playerVal = player.val();
          //   playerVal.key = player.key();
          //   Actions.playerReceived(playerVal);
          // });
        });
      });
    },

    success: Actions.editPlayerSuccessful
  }
}

export default PlayerSource;
