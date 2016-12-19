/**
 * Created by enriq on 6/09/16.
 */
import React from 'react';
import {
  Route,
  IndexRoute,
} from 'react-router';

// import Log from './src/containers/Log';
import EditMods from '../containers/backend/EditMods';
import EditGrupos from '../containers/backend/EditGrupos';
import EditCategorias from '../containers/backend/EditCategorias';
import EditItems from '../containers/backend/EditItems';
import EditFormasPago from '../containers/backend/EditFormasPago';
import EditDescuentos from '../containers/backend/EditDescuentos';
import EditRestaurantes from '../containers/backend/EditRestaurantes';
import EditDomiciliarios from '../containers/backend/EditDomiciliarios';
import EditEstados from '../containers/backend/EditEstados';
import BackendApp from '../containers/backend/BackendApp';
import BackendHome from '../containers/backend/BackendHome';
import FrontendApp from '../containers/frontend/FrontendApp';
import FrontendHome from '../containers/frontend/FrontendHome';
import PedidosStatus from '../containers/frontend/PedidosStatus';
import PedidoDetalle from '../containers/frontend/PedidoDetalle';
import PedidoItem from '../containers/frontend/PedidoItem';
import Home from '../containers/Home';
// import Users from './src/containers/Users';
// import Permisos from './src/containers/Permisos';
// import Recurrentes from './src/containers/Recurrentes';

const routes = (<div>
    <Route path="/backend" component={BackendApp}>
      <IndexRoute component={BackendHome}/>
      <Route path="editmods" component={EditMods}/>
      <Route path="editgrupos" component={EditGrupos}/>
      <Route path="editcategorias" component={EditCategorias}/>
      <Route path="editdomiciliarios" component={EditDomiciliarios}/>
      <Route path="editestados" component={EditEstados}/>
      <Route path="edititems/:id" component={EditItems}/>
      <Route path="editformaspago" component={EditFormasPago}/>
      <Route path="editdescuentos" component={EditDescuentos}/>
      <Route path="editrestaurantes" component={EditRestaurantes}/>
      <Route path="*" component={BackendHome}/>
    </Route>
    <Route path="/frontend" component={FrontendApp}>
      <IndexRoute component={FrontendHome}/>
      <Route path="pedidosstatus" component={PedidosStatus}/>
      <Route path="pedidodetalle/:id" component={PedidoDetalle}/>
      <Route path="pedidoitem/:id_pedido/:id_item" component={PedidoItem}/>
      <Route path="*" component={FrontendHome}/>
    </Route>
    <Route path="/*" component={Home}/>
  </div>
);

export default routes;
