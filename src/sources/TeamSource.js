import Actions from '../actions';
import Firebase from 'firebase';

let firebaseRef = new Firebase('https://tournament-time.firebaseio.com/teams');

let TeamSource = {
  createTeam: {
    remote(state) {
      return new Promise((resolve, reject) => {
        if(!firebaseRef) {
          return resolve();
        }

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

  getTeams: {
    remote(state, selectedTeamKey){
      return new Promise((resolve, reject) => {
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
        });
      });
    },

    success: Actions.teamsReceived
  }
}

export default TeamSource;
