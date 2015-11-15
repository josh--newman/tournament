import React from 'react';
import App from '../components/App.jsx';
import TeamEditor from '../components/TeamEditor.jsx';
import Router from 'react-router';

let Route = Router.Route;
let DefaultRoute = Router.DefaultRoute;

let routes = (
  <Route path="/" handler={App}>
    <DefaultRoute handler={TeamEditor} />
    <Route path="teams" handler={TeamEditor} />
  </Route>
);

Router.run(routes, Router.HashLocation, (Root) => {
  React.render(<Root />, document.getElementById('container'));
});
