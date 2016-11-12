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
import {
  loadEstados,
} from '../../actions/estadoActions';

import PedidosNavBar
  from '../../components/pedidos/PedidosNavBar'
import PedidosList
  from '../../components/pedidos/PedidosList'
import OptionsModal
  from '../../components/pedidos/OptionsModal'
import NuevoPedidoModal
  from '../../components/pedidos/NuevoPedidoModal'
import RestauranteModal
  from '../../components/pedidos/RestauranteModal'

import {
  Button,
  Glyphicon
} from 'react-bootstrap';
import _ from 'lodash';
import moment from 'moment';

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
      restaurante: {},
      pedidos: []
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
      this.filterClientes(
        this.state.ciudad,
        nextProps.clientes
      );
    }
    if (nextProps.shouldUpdateRestaurantes) {
      this.props.loadRestaurantes();
    } else {
      this.filterRestaurantes(
        this.state.ciudad,
        nextProps.restaurantes
      );
    }
    if (nextProps.shouldUpdatePedidos) {
      this.props.loadPedidos();
    } else {
      _.isEmpty(this.state.restaurante) ?
        this.filterPedidosCiudad(
          this.state.ciudad,
          nextProps.pedidos
        ) :
        this.filterPedidosRestaurante(
          this.state.restaurante,
          nextProps.pedidos
        );
    }
    if (nextProps.shouldUpdateDirecciones) {
      this.props.loadDirecciones();
    } else {
      this.filterDirecciones(
        this.state.cliente,
        nextProps.direcciones
      );
    }
  }

  filterDirecciones = (cliente, direcciones) => {
    if (!_.isEmpty(cliente) && !_.isEmpty(direcciones)) {
      direcciones = direcciones.filter(
        direccion => direccion.id_cliente == cliente.id
      );
      this.setState({direcciones})
    }
  };

  filterClientes = (ciudad, clientes) => {
    if (!_.isEmpty(clientes)) {
      if (!_.isEmpty(ciudad)) {
        clientes = clientes.filter(
          cliente => cliente.id_ciudad == ciudad.id
        );
      }
      this.setState({clientes})
    }
  };
  filterRestaurantes = (ciudad, restaurantes) => {
    if (!_.isEmpty(restaurantes)) {
      if (!_.isEmpty(ciudad)) {
        restaurantes = restaurantes.filter(
          restaurante =>
          restaurante.id_ciudad == ciudad.id
        );
      }
      this.setState({restaurantes})
    }
  };
  filterPedidosCiudad = (ciudad, pedidos) => {
    if (!_.isEmpty(pedidos)) {
      if (!_.isEmpty(ciudad)) {
        pedidos = pedidos.filter(
          pedido => {
            let restaurante =
              this.props.restaurantes.find(
                (restaurante) => {
                  return restaurante.id == pedido.id_restaurante;
                });
            return restaurante ?
            restaurante.id_ciudad == ciudad.id :
              false;
          }
        );
      }
      this.setState({pedidos})
    }
  };
  filterPedidosRestaurante = (restaurante, pedidos) => {
    if (!_.isEmpty(pedidos)) {
      if (!_.isEmpty(restaurante)) {
        pedidos = pedidos.filter(
          pedido =>
          pedido.id_restaurante == restaurante.id
        );
      }
      this.setState({pedidos})
    }
  };

  onPedidosClick = (pedido) => {
    this.setState({
      isNuevoPedidoModalActive: true,
      isOptionsModalActive: false,
    });
  };
  selectCliente = (cliente) => {
    let direccion = {};
    this.setState({cliente, direccion});
    this.filterDirecciones(
      cliente,
      this.props.direcciones
    );
  };
  selectCiudad = (ciudad) => {
    let cliente = {};
    let direccion = {};
    let direcciones = [];
    let restaurante = {};
    this.setState({
      ciudad,
      cliente,
      direccion,
      direcciones,
      restaurante
    });
    this.filterClientes(
      ciudad,
      this.props.clientes
    );
    this.filterRestaurantes(
      ciudad,
      this.props.restaurantes
    );
    this.filterPedidosCiudad(
      ciudad,
      this.props.pedidos
    );
  };
  selectDireccion = (direccion) => {
    this.setState({direccion});
  };
  selectRestaurante = (restaurante) => {
    this.setState({restaurante});
    this.filterPedidosRestaurante(
      restaurante,
      this.props.pedidos
    );
  };
  optionsModalOn = () => {
    this.setState({
      isOptionsModalActive: true,
      isNuevoPedidoModalActive: false
    });
  };

  optionsModalOff = () => {
    this.setState({isOptionsModalActive: false})
  };
  restauranteModalOn = () => {
    this.setState({
      isRestauranteModalActive: true,
      isOptionsModalActive: false
    });
  };
  restauranteModalOff = () => {
    this.setState({isRestauranteModalActive: false})
  };
  submitInitialPedido =
    (cliente, direccion, restaurante) => {
      let pedido = {
        fecha: moment(),
        h_inicio: moment(),
        id_cliente: cliente.id,
        id_direccion: direccion.id,
        id_restaurante: restaurante.id
      };
      this.props.createPedido(pedido);
    };
  handleDestroyCliente = (id) => {
    let cliente = {};
    let clientes = [];
    let direccion = {};
    this.setState({cliente, clientes, direccion}, () => {
        this.props.destroyCliente(id)
      }
    );
  };
  handleDestroyDireccion = (id) => {
    let direccion = {};
    let direcciones = [];
    this.setState({direccion, direcciones}, () => {
        this.props.destroyDireccion(id)
      }
    );
  };

  nuevoPedidoModalOff = () => {
    this.setState({
      isNuevoPedidoModalActive: false,
      cliente: {},
      direcciones: [],
      direccion: {},
      ciudad: {},
      clientes: this.props.clientes
    })
  };
  handleSelectedCiudadTab = (id_ciudad) => {
    let ciudad = this.props.ciudades.find((ciudad) => {
      return ciudad.id == id_ciudad;
    });
    this.selectCiudad(ciudad);
    this.filterPedidosCiudad(ciudad, this.props.pedidos)
  };

  handleSelectedRestauranteTab = (id_restaurante) => {
    let restaurante =
      this.props.restaurantes.find(
        (restaurante) => {
          return restaurante.id == id_restaurante;
        }
      );
    this.selectRestaurante(restaurante);
    this.filterPedidosRestaurante(
      restaurante,
      this.props.pedidos
    );
  };

  render = () => {
    return (
      <div>
        <PedidosNavBar
          list={this.props.ciudades}
          callback={this.handleSelectedCiudadTab}
          selectedKey={
            this.state.ciudad ?
              this.state.ciudad.id :
              0
          }
        />
        <PedidosNavBar
          list={this.state.restaurantes}
          callback={this.handleSelectedRestauranteTab}
          selectedKey={
            this.state.restaurante ?
              this.state.restaurante.id :
              0
          }
        />
        <PedidosList
          clientes={this.props.clientes}
          direcciones={this.props.direcciones}
          restaurantes={this.props.restaurantes}
          estados={this.props.estados}
        >
          {this.state.pedidos}
        </PedidosList>
        <Button
          onClick={() => this.onPedidosClick({})}
          bsStyle="primary"
        >
          <Glyphicon glyph="plus"/>{' Agregar'}
        </Button>
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
          submitInitialPedido={this.submitInitialPedido}
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
  estados: PropTypes.array.isRequired,
  shouldUpdatePedidos: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  const {
    pedidoReducer,
    clienteReducer,
    restauranteReducer,
    direccionReducer,
    ciudadReducer,
    estadoReducer
  } = state;
  const {pedidos, shouldUpdatePedidos} = pedidoReducer;
  const {direcciones, shouldUpdateDirecciones} = direccionReducer;
  const {restaurantes, shouldUpdateRestaurantes} = restauranteReducer;
  const {ciudades, shouldUpdateCiudades} = ciudadReducer;
  const {clientes, shouldUpdateClientes} = clienteReducer;
  const {estados, shouldUpdateEstados} = estadoReducer;
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
    estados,
    shouldUpdateEstados
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
  loadEstados,
})(PedidosStatus);
