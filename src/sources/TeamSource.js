import Actions from '../actions';
import Firebase from 'firebase';

const firebaseTeamsURL = "https://tournament-time-dev.firebaseio.com/teams/"
let firebaseRef = null;

let TeamSource = {
  createTeam: {
    remote(state) {
      return new Promise((resolve, reject) => {
        firebaseRef = null;
        firebaseRef = new Firebase(firebaseTeamsURL);

        firebaseRef.push({
          "name": state.team,
          "players": {
            "player1": {
              "name": "Player 1"
            },
            "player2": {
              "name": "Player 2"
            }
          }
        });
        resolve();
      });
    },
    success: Actions.teamCreatedSuccess,
    error: Actions.teamCreatedError
  },

  deleteTeam: {
    remote(state) {
      return new Promise((resolve, reject) => {
        firebaseRef = null;
        firebaseRef = new Firebase(firebaseTeamsURL + state.team.key);

        firebaseRef.remove();
      });
      resolve();
    },
    success: Actions.teamDeletedSuccess,
    error: Actions.teamDeletedError
  },

  getTeams: {
    remote(state, selectedTeamKey){
      return new Promise((resolve, reject) => {
        firebaseRef = null;
        firebaseRef = new Firebase(firebaseTeamsURL);

        firebaseRef.once("value", (dataSnapshot) => {
          var teams = dataSnapshot.val();
          selectedTeamKey = selectedTeamKey || _.keys(teams)[0];
          var selectedTeam = teams[selectedTeamKey];
          if(selectedTeam) {
            selectedTeam.selected = true;
          }
          resolve(teams);

          firebaseRef.on("child_added", (team) => {
            let teamVal = team.val();
            teamVal.key = team.key();
            Actions.teamReceived(teamVal);
          });

          firebaseRef.on("child_changed", (team) => {
            let teamVal = team.val();
            teamVal.key = team.key();
            Actions.teamReceived(teamVal);
          });

          firebaseRef.on("child_removed", (oldTeam) => {
            let oldTeamVal = oldTeam.val();
            oldTeamVal.key = oldTeam.key();
            Actions.teamDeleted(oldTeamVal);
          });
        });
      });
    },

    success: Actions.teamsReceived
  }
}

export default TeamSource;
