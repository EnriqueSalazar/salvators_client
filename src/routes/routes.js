/**
 * Created by enriq on 6/09/16.
 */
import React from 'react';
import {
  Route,
  IndexRoute,
} from 'react-router';

// import Log from './src/containers/Log';
import App from '../containers/App';
import EditMods from '../containers/EditMods';
import EditGrupos from '../containers/EditGrupos';
import EditCategorias from '../containers/EditCategorias';
import EditItems from '../containers/EditItems';
import EditFormasPago from '../containers/EditFormasPago';
import EditDescuentos from '../containers/EditDescuentos';
import EditDomiciliarios from '../containers/EditDomiciliarios';
import Home from '../containers/Home';
// import Users from './src/containers/Users';
// import Permisos from './src/containers/Permisos';
// import Recurrentes from './src/containers/Recurrentes';


const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="/editmods" component={EditMods}/>
    <Route path="/editgrupos" component={EditGrupos}/>
    <Route path="/editcategorias" component={EditCategorias}/>
    <Route path="/edititems/:id" component={EditItems}/>
    <Route path="/editformaspago" component={EditFormasPago}/>
    <Route path="/editdescuentos" component={EditDescuentos}/>
    <Route path="/editdomiciliarios" component={EditDomiciliarios}/>
    <Route path="/*" component={Home}/>
  </Route>
);

export default routes;
