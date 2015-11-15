import React from 'react';
import TeamList from './TeamList.jsx'
import PlayerList from './PlayerList.jsx'
import mui from 'material-ui';

class TeamEditor extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div style={{
          display: 'flex',
          flexFlow: 'row wrap',
          maxWidth: 960,
          width: '100%',
          margin: '30px auto 30px'
      }}>
        <TeamList {...this.props} />
        <PlayerList />
      </div>
    );
  }
}

export default TeamEditor
