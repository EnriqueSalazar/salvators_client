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
  loadCiudades,
} from '../../actions/ciudadActions';

import PedidosList from '../../components/pedidos/PedidosList'
import OptionsModal from '../../components/pedidos/OptionsModal'
import NuevoPedidoModal from '../../components/pedidos/NuevoPedidoModal'
import RestauranteModal from '../../components/pedidos/RestauranteModal'

import { Grid, Col, Row } from 'react-bootstrap';
import _ from 'lodash';

class PedidosStatus extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isOptionsModalActive: false,
      isRestaurantesModalActive: false,
      isNuevoPedidoModalActive: false,
      cliente: {},
      clientes: [],
      direccion: {},
      direcciones: [],
      ciudad: {},
      restaurantes: [],
      restaurante: {}
    };
  }

  componentDidMount() {
    this.props.loadPedidos();
    this.props.loadClientes();
    this.props.loadDirecciones();
    this.props.loadCiudades();
    this.props.loadRestaurantes();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.shouldUpdatePedidos) {
      this.props.loadPedidos();
    }
    if (nextProps.shouldUpdateClientes) {
      this.props.loadClientes();
    } else {
      this.filterClientes(this.state.ciudad, nextProps.clientes);
    }
    if (nextProps.shouldUpdateRestaurantes) {
      this.props.loadRestaurantes();
    } else {
      this.filterRestaurantes(this.state.ciudad, nextProps.restaurantes);
    }
    if (nextProps.shouldUpdateDirecciones) {
      this.props.loadDirecciones();
    } else {
      this.filterDirecciones(this.state.cliente, nextProps.direcciones);
    }
  }

  filterDirecciones = (cliente, direcciones) => {
    if (!_.isEmpty(cliente) && !_.isEmpty(direcciones)) {
      direcciones = direcciones.filter(
        direccion => direccion.id_cliente == cliente.id
      );
      this.setState({direcciones})

    } else {
      direcciones = {};
    }
  }
  filterClientes = (ciudad, clientes) => {
    if (!_.isEmpty(clientes)) {
      if (!_.isEmpty(ciudad)) {
        clientes = clientes.filter(
          cliente => cliente.id_ciudad == ciudad.id
        );
      }
      this.setState({clientes})
    }
  }
  filterRestaurantes = (ciudad, restaurantes) => {
    if (!_.isEmpty(restaurantes)) {
      if (!_.isEmpty(ciudad)) {
        restaurantes = restaurantes.filter(
          restaurante => restaurante.id_ciudad == ciudad.id
        );
      }
      this.setState({restaurantes})
    }
  }

  onPedidosClick = (pedido) => {
    this.setState({
      isNuevoPedidoModalActive: true,
      isOptionsModalActive: false,
    })
  }
  selectCliente = (cliente) => {
    let direccion = {};
    this.setState({cliente, direccion})
    this.filterDirecciones(cliente, this.props.direcciones);
  }
  selectCiudad = (ciudad) => {
    let cliente = {};
    let direccion = {};
    let direcciones = []
    this.setState({ciudad, cliente, direccion, direcciones});
    this.filterClientes(ciudad, this.props.clientes);
    this.filterRestaurantes(ciudad, this.props.restaurantes);
  }
  selectDireccion = (direccion) => {
    this.setState({direccion})
  }
  selectRestaurante = (restaurante) => {
    this.setState({restaurante})
  }
  optionsModalOn = () => {
    this.setState({
      isOptionsModalActive: true,
      isNuevoPedidoModalActive: false
    });
  }

  optionsModalOff = () => {
    this.setState({isOptionsModalActive: false})
  }
  restauranteModalOn = () => {
    debugger
    this.setState({
      isRestauranteModalActive: true,
      isOptionsModalActive: false
    });
  }

  restauranteModalOff = () => {
    this.setState({isRestauranteModalActive: false})
  }
  handleDestroyCliente = (id) => {
    let cliente = {};
    let clientes = [];
    let direccion = {};
    this.setState({cliente, clientes, direccion}, () => {
        this.props.destroyCliente(id)
      }
    );
  }
  handleDestroyDireccion = (id) => {
    let direccion = {};
    let direcciones = [];
    this.setState({direccion, direcciones}, () => {
        this.props.destroyDireccion(id)
      }
    );
  }

  nuevoPedidoModalOff = () => {
    this.setState({
      isNuevoPedidoModalActive: false,
      cliente: {},
      direcciones: [],
      direccion: {},
      ciudad: {},
      clientes: this.props.clientes
    })
  }

  render = () => {
    return (
      <div>
        <PedidosList
          onPedidosClick={this.onPedidosClick}
        >
          {this.props.pedidos}
        </PedidosList>
        <OptionsModal
          isOptionsModalActive={this.state.isOptionsModalActive}
          optionsModalOff={this.optionsModalOff}
          cliente={this.state.cliente}
          direccion={this.state.direccion}
          ciudad={this.state.ciudad}
          restauranteModalOn={this.restauranteModalOn}
        />
        <NuevoPedidoModal
          isNuevoPedidoModalActive={this.state.isNuevoPedidoModalActive}
          nuevoPedidoModalOff={this.nuevoPedidoModalOff}
          selectCliente={this.selectCliente}
          selectDireccion={this.selectDireccion}
          cliente={this.state.cliente}
          clientes={this.state.clientes}
          direcciones={this.state.direcciones}
          direccion={this.state.direccion}
          createDireccion={this.props.createDireccion}
          destroyDireccion={this.props.destroyDireccion}
          createCliente={this.props.createCliente}
          optionsModalOn={this.optionsModalOn}
          ciudades={this.props.ciudades}
          selectCiudad={this.selectCiudad}
          ciudad={this.state.ciudad}
          handleDestroyCliente={this.handleDestroyCliente}
          handleDestroyDireccion={this.handleDestroyDireccion}
        />
        <RestauranteModal
          isRestauranteModalActive={this.state.isRestauranteModalActive}
          restauranteModalOff={this.restauranteModalOff}
          cliente={this.state.cliente}
          selectRestaurante={this.selectRestaurante}
          restaurante={this.state.restaurante}
          restaurantes={this.state.restaurantes}
          direccion={this.state.direccion}
          ciudad={this.state.ciudad}
        />
      </div>
    );
  };
}

PedidosStatus.propTypes = {
  loadPedidos: PropTypes.func.isRequired,
  destroyPedido: PropTypes.func.isRequired,
  createPedido: PropTypes.func.isRequired,
  updatePedido: PropTypes.func.isRequired,
  pedidos: PropTypes.array.isRequired,
  shouldUpdatePedidos: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  const {
    pedidoReducer,
    clienteReducer,
    restauranteReducer,
    direccionReducer,
    ciudadReducer
  } = state;
  const {pedidos, shouldUpdatePedidos} = pedidoReducer;
  const {direcciones, shouldUpdateDirecciones} = direccionReducer;
  const {restaurantes, shouldUpdateRestaurantes} = restauranteReducer;
  const {ciudades, shouldUpdateCiudades} = ciudadReducer;
  const {clientes, shouldUpdateClientes} = clienteReducer;
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
    shouldUpdateCiudades
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
})(PedidosStatus);
