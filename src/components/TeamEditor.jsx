import React from 'react';
import TeamList from './TeamList.jsx'
import mui from 'material-ui';

class TeamEditor extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <TeamList />
    );
  }
}

export default TeamEditor
