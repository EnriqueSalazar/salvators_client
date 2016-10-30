/**
 * Created by enriq on 6/09/16.
 */
import React from 'react';
import {
  Route,
  IndexRoute,
} from 'react-router';

// import Log from './src/containers/Log';
import App from './src/containers/App';
import EditMods from './src/containers/EditMods';
import EditGrupos from './src/containers/EditGrupos';
import EditItems from './src/containers/EditItems';
import Home from './src/containers/Home';
// import Users from './src/containers/Users';
// import Permisos from './src/containers/Permisos';
// import Recurrentes from './src/containers/Recurrentes';


const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="/editmods" component={EditMods}/>
    <Route path="/editgrupos" component={EditGrupos}/>
    <Route path="/edititems/:id" component={EditItems}/>
    <Route path="/*" component={Home}/>
  </Route>
);

export default routes;
