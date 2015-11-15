import Actions from '../actions';
import Firebase from 'firebase';

let firebaseRef = new Firebase('https://tournament-time.firebaseio.com/teams');

let TeamSource = {
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
        });
      });
    },

    success: Actions.teamsReceived
  }
}

export default TeamSource;
