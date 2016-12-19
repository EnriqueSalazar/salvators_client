import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import {
  loadRestaurantes,
} from '../../actions/restauranteActions';
import {
  loadPedidos,
  destroyPedido,
  createPedido,
  updatePedido,
} from '../../actions/pedidoActions';
import {
  loadDomiciliarios,
} from '../../actions/domiciliarioActions';
import {
  loadClientes,
  destroyCliente,
  createCliente,
  updateCliente,
} from '../../actions/clienteActions';
import {
  loadDirecciones,
  destroyDireccion,
  createDireccion,
  updateDireccion,
} from '../../actions/direccionActions';
import {
  loadItems,
  destroyItem,
  createItem,
  updateItem,
} from '../../actions/itemActions';
import {
  loadGrupos,
  destroyGrupo,
  createGrupo,
  updateGrupo,
} from '../../actions/grupoActions';
import {
  loadCiudades,
} from '../../actions/ciudadActions';

import ButtonsPanel from '../../components/pedidodetalle/ButtonsPanel'

import {
  Grid,
  Row,
  Col,
  Button,
  Glyphicon
} from 'react-bootstrap';
import _ from 'lodash';
import moment from 'moment';
import { estados } from '../../config/'

import { toastr } from 'react-redux-toastr';

class PedidoDetalle extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedGrupoId: 0,
      selectedItemId:0,
      filteredItems:[]
    };
  }

  componentDidMount() {
    this.props.loadGrupos();
    this.props.loadItems();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.shouldUpdateGrupos) {
      this.props.loadGrupos();
    }
  }

  handleGrupoClick = (selectedGrupoId) => {
    let filteredItems = this.props.items.filter((item) => {
      return (
        item.id_grupo_menu == selectedGrupoId
      );
    });
    this.setState({selectedGrupoId,filteredItems});
  }
   handleItemClick = (selectedItemId) => {
    this.setState({selectedItemId});
  }
  render = () => {
    return (
      <div>
        <Grid>
          <Row>
            <Col md={3}>
              <ButtonsPanel
                list={this.props.grupos}
                onClick={this.handleGrupoClick}
                selectedId={this.state.selectedGrupoId}
                bsStyle='primary'
                activeStyle='danger'
              />

            </Col>
            <Col md={9}>
              <ButtonsPanel
                list={this.state.filteredItems}
                onClick={this.handleItemClick}
                selectedId={this.state.selectedItemId}
                bsStyle='warning'
                activeStyle='danger'
              />

            </Col>
          </Row>
        </Grid></div>
    );
  };
}

PedidoDetalle.propTypes = {
  loadPedidos: PropTypes.func.isRequired,
  destroyPedido: PropTypes.func.isRequired,
  createPedido: PropTypes.func.isRequired,
  updatePedido: PropTypes.func.isRequired,
  pedidos: PropTypes.array.isRequired,
  shouldUpdatePedidos: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  const {
    grupoReducer,
    itemReducer,
    pedidoReducer,
    clienteReducer,
    restauranteReducer,
    direccionReducer,
    ciudadReducer,
    domiciliarioReducer,
    cancelacionReducer,
    quejaReducer
  } = state;
  const {pedidos, shouldUpdatePedidos} = pedidoReducer;
  const {direcciones, shouldUpdateDirecciones} = direccionReducer;
  const {domiciliarios, shouldUpdateDomiciliarios} = domiciliarioReducer;
  const {restaurantes, shouldUpdateRestaurantes} = restauranteReducer;
  const {ciudades, shouldUpdateCiudades} = ciudadReducer;
  const {clientes, shouldUpdateClientes} = clienteReducer;
  const {grupos, shouldUpdateGrupos} = grupoReducer;
  const {items, shouldUpdateItems, item} = itemReducer;
  return {
    pedidos,
    shouldUpdatePedidos,
    direcciones,
    shouldUpdateDirecciones,
    restaurantes,
    shouldUpdateRestaurantes,
    clientes,
    shouldUpdateClientes,
    ciudades,
    shouldUpdateCiudades,
    domiciliarios,
    shouldUpdateDomiciliarios,
    grupos,
    shouldUpdateGrupos,
    items,
    item,
    shouldUpdateItems,
  };
}

export default connect(mapStateToProps, {
  loadPedidos,
  destroyPedido,
  createPedido,
  updatePedido,
  loadClientes,
  destroyCliente,
  createCliente,
  loadRestaurantes,
  updateCliente,
  loadDirecciones,
  destroyDireccion,
  createDireccion,
  updateDireccion,
  loadCiudades,
  loadDomiciliarios,
  loadItems,
  destroyItem,
  createItem,
  updateItem,
  loadGrupos,
  destroyGrupo,
  createGrupo,
  updateGrupo,
})(PedidoDetalle);
