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
  loadQuejas,
  destroyQueja,
  createQueja,
  updateQueja,
} from '../../actions/quejaActions';
import {
  loadDirecciones,
  destroyDireccion,
  createDireccion,
  updateDireccion,
} from '../../actions/direccionActions';
import {
  loadCancelaciones,
  destroyCancelacion,
  createCancelacion,
  updateCancelacion,
} from '../../actions/cancelacionActions';
import {
  loadCiudades,
} from '../../actions/ciudadActions';
import PedidosNavBar
  from '../../components/pedidos/PedidosNavBar';
import PedidosList
  from '../../components/pedidos/PedidosList';
import OptionsModal
  from '../../components/pedidos/OptionsModal';
import NuevoPedidoModal
  from '../../components/pedidos/NuevoPedidoModal';
import RestauranteModal
  from '../../components/pedidos/RestauranteModal';
import NotaModal
  from '../../components/pedidos/NotaModal';
import NotaPagoModal
  from '../../components/pedidos/NotaPagoModal';
import DomiciliarioModal
  from '../../components/pedidos/DomiciliarioModal';
import CancelacionForm
  from '../../components/pedidos/CancelacionForm';
import QuejaForm
  from '../../components/pedidos/QuejaForm';

import {
  Button,
  Glyphicon
} from 'react-bootstrap';
import _ from 'lodash';
import moment from 'moment';
import { estados } from '../../config/'

import { toastr } from 'react-redux-toastr';

class PedidosStatus extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isOptionsModalActive: false,
      isRestaurantesModalActive: false,
      isNuevoPedidoModalActive: false,
      isNotaModalActive: false,
      isNotaPagoModalActive: false,
      isDomiciliarioModalActive: false,
      cliente: {},
      clientes: [],
      direccion: {},
      direcciones: [],
      ciudad: {},
      restaurantes: [],
      restaurante: {},
      pedidos: [],
      pedido: {},
      cancelacionForm: {},
      isCancelacionFormActive: false
    };
  }

  componentDidMount() {
    this.props.loadPedidos();
    this.props.loadClientes();
    this.props.loadDirecciones();
    this.props.loadCiudades();
    this.props.loadDomiciliarios();
    this.props.loadRestaurantes();
    this.props.loadCancelaciones();
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
    if (nextProps.shouldUpdateCancelaciones) {
      this.props.loadCancelaciones();
    }
  }

  filterDirecciones = (cliente, direcciones) => {
    if (!_.isEmpty(cliente) && !_.isEmpty(direcciones)) {
      direcciones = direcciones.filter(
        direccion => direccion.id_cliente == cliente.id
      );
      this.setState({direcciones});
    }
  };

  filterClientes = (ciudad, clientes) => {
    if (!_.isEmpty(clientes)) {
      if (!_.isEmpty(ciudad)) {
        clientes = clientes.filter(
          cliente => cliente.id_ciudad == ciudad.id
        );
      }
      this.setState({clientes});
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
      this.setState({restaurantes});
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
      this.setState({pedidos});
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
      this.setState({pedidos});
    }
  };
  filterPedidosdomiciliario = (domiciliario, pedidos) => {
    if (!_.isEmpty(pedidos)) {
      if (!_.isEmpty(domiciliario)) {
        pedidos = pedidos.filter(
          pedido =>
          pedido.id_domiciliario == domiciliario.id &&
          pedido.id_estado == estados.domiciliario.id
        );
      }
      this.setState({pedidos});
    }
  };

  onPedidosClick = (pedido) => {
    if (pedido.id) {
      let cliente = this.props.clientes.find((cliente) => {
        return cliente.id == pedido.id_cliente;
      });
      let ciudad = this.props.ciudades.find((ciudad) => {
        return ciudad.id == cliente.id_ciudad;
      });
      let direccion = this.props.direcciones.find((direccion) => {
        return direccion.id == pedido.id_direccion;
      });
      this.setState({
          cliente,
          direccion,
          ciudad,
          pedido
        }, () => {
          this.optionsModalOn()
        }
      );
    } else {
      this.setState({
        isNuevoPedidoModalActive: true,
        isOptionsModalActive: false,
      });
    }
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

  selectDomiciliario = (domiciliario) => {
    this.setState({domiciliario});
    this.filterPedidosdomiciliario(
      domiciliario,
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
    let cliente = {};
    let direccion = {};
    let pedido = {};
    this.setState({
      cliente,
      direccion,
      pedido,
      isOptionsModalActive: false
    });
  };
  cancelacionFormOn = (id_pedido) => {
    let cancelacionForm = {};
    if (id_pedido) {
      cancelacionForm = this.props.cancelaciones.find((cancelacion) => {
        return cancelacion.id_pedido == id_pedido;
      });
    } else {
      cancelacionForm = {
        id_pedido: this.state.pedido.id,
        nota_cliente: '',
        nota_operador: ''
      }
    }
    this.setState({
      isOptionsModalActive: false,
      isCancelacionFormActive: true,
      cancelacionForm
    });
  };
  cancelacionFormOff = () => {
    this.setState({
      isCancelacionFormActive: false,
      cancelacionForm: {},
      pedido: {}
    });
  };
  handleUpdateCancelacionForm = (cancelacion) => {
    let pedido = this.state.pedido;
    pedido.id_estado = 6;
    Promise.all([
      this.props.createCancelacion(cancelacion),
      this.props.updatePedido(pedido.id, pedido)
    ]).then(() => {
      this.setState({
          pedido: {}
        },
        () => this.cancelacionFormOff()
      )
    });
  };
  quejaFormOn = () => {
    this.setState({
      isOptionsModalActive: false,
      isQuejaFormActive: true,
      quejaForm: {
        id_pedido: this.state.pedido.id,
        nota_cliente: '',
        nota_operador: ''
      }
    });
  };
  quejaFormOff = () => {
    this.setState({
      isQuejaFormActive: false,
      quejaForm: {},
      pedido: {}
    });
  };
  handleUpdateQuejaForm = (queja) => {
    let pedido = this.state.pedido;
    pedido.id_estado = 6;
    Promise.all([
      this.props.createQueja(queja),
    ]).then(() => {
      this.setState({
          pedido: {}
        },
        () => this.quejaFormOff()
      )
    });
  };
  notaModalOn = (pedido) => {
    this.setState({
      isNotaModalActive: true,
      pedido
    });
  };
  notaModalOff = () => {
    this.setState({
      isNotaModalActive: false,
      pedido: {}
    });
  };
  notaPagoModalOn = (pedido) => {
    this.setState({
      isNotaPagoModalActive: true,
      pedido
    });
  };
  notaPagoModalOff = () => {
    this.setState({
      isNotaPagoModalActive: false,
      pedido: {}
    })
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

  domiciliarioModalOn = (pedido) => {
    this.setState({
      isDomiciliarioModalActive: true,
      isOptionsModalActive: false,
      pedidos: [],
      pedido
    });
  };
  domiciliarioModalOff = () => {
    this.setState({
      isDomiciliarioModalActive: false,
      pedido: {}
    });
    this.props.loadPedidos();
  };

  submitInitialPedido =
    (cliente, direccion, restaurante) => {
      let pedido = {
        fecha: moment(),
        h_inicio: moment(),
        id_cliente: cliente.id,
        id_direccion: direccion.id,
        id_restaurante: restaurante.id,
        id_estado: 0
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
  handleUpdatePedidoEstado = (field, pedido, nextEstado) => {
    this.optionsModalOff();
    pedido[field] = moment();
    pedido.id_estado = nextEstado.id;
    const toastrConfirmOptions = {
      onOk: () => this.props.updatePedido(pedido.id, pedido),
      onCancel: () => this.props.loadPedidos()
    };
    toastr.confirm('Seguro que desea cambiar a estado ' + nextEstado.nombre, toastrConfirmOptions);
  };
  handleUpdatePedidoNota = (pedido) => {
    this.props.updatePedido(pedido.id, pedido);
    this.setState({isNotaModalActive: false});
  };
  handleUpdatePedidoNotaPago = (pedido) => {
    this.props.updatePedido(pedido.id, pedido);
    this.setState({isNotaPagoModalActive: false});
  };

  handleAsignarPedidoDomiciliario = (pedido, domiciliario) => {
    pedido.id_domiciliario = domiciliario.id;
    pedido.id_estado = estados.domiciliario.id;
    pedido.h_domiciliario = moment();
    this.props.updatePedido(pedido.id, pedido);
    this.domiciliarioModalOff();
  };
  handleAceptarPedidosDomiciliario = (pedidos, pedido, domiciliario) => {
    pedidos.map(pedido => {
      pedido.h_entregado = moment();
      pedido.id_estado = estados.entregado.id;
      this.props.updatePedido(pedido.id, pedido);
    });
    this.handleAsignarPedidoDomiciliario(pedido, domiciliario);
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
          estados={estados}
          handleUpdatePedido={this.handleUpdatePedidoEstado}
          notaModalOn={this.notaModalOn}
          notaPagoModalOn={this.notaPagoModalOn}
          domiciliarioModalOn={this.domiciliarioModalOn}
          domiciliarios={this.props.domiciliarios}
          onPedidosClick={this.onPedidosClick}
          cancelacionFormOn={this.cancelacionFormOn}
        >
          {this.state.pedidos}
        </PedidosList>
        <Button
          onClick={() => this.onPedidosClick({})}
          bsStyle="primary"
          //updatePedido={this.props.updatePedido}
        >
          <Glyphicon glyph="modal-window"/>{' Iniciar'}
        </Button>
        <OptionsModal
          isOptionsModalActive={this.state.isOptionsModalActive}
          optionsModalOff={this.optionsModalOff}
          cliente={this.state.cliente}
          direccion={this.state.direccion}
          ciudad={this.state.ciudad}
          restauranteModalOn={this.restauranteModalOn}
          cancelacionFormOn={this.cancelacionFormOn}
          quejaFormOn={this.quejaFormOn}
          pedido={this.state.pedido}
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
        <NotaModal
          initialValues={this.state.pedido}
          notaModalOff={this.notaModalOff}
          notasSubmit={this.handleUpdatePedidoNota}
          isModalActive={this.state.isNotaModalActive}
        />
        <NotaPagoModal
          initialValues={this.state.pedido}
          notaPagoModalOff={this.notaPagoModalOff}
          notaPagosSubmit={this.handleUpdatePedidoNotaPago}
          isModalActive={this.state.isNotaPagoModalActive}
        />
        <DomiciliarioModal
          handleAsignarPedidoDomiciliario={this.handleAsignarPedidoDomiciliario}
          handleAceptarPedidosDomiciliario={this.handleAceptarPedidosDomiciliario}
          domiciliarios={this.props.domiciliarios}
          pedidos={this.state.pedidos}
          domiciliario={this.state.domiciliario}
          domiciliarioModalOff={this.domiciliarioModalOff}
          selectDomiciliario={this.selectDomiciliario}
          clientes={this.props.clientes}
          direcciones={this.props.direcciones}
          pedido={this.state.pedido}
          isDomiciliarioModalActive={this.state.isDomiciliarioModalActive}
        />
        <CancelacionForm
          initialValues={this.state.cancelacionForm}
          cancelacionFormSubmit={this.handleUpdateCancelacionForm}
          isModalActive={this.state.isCancelacionFormActive}
          cancelacionFormOff={this.cancelacionFormOff}
        />
        <QuejaForm
          initialValues={this.state.quejaForm}
          quejaFormSubmit={this.handleUpdateQuejaForm}
          isModalActive={this.state.isQuejaFormActive}
          quejaFormOff={this.quejaFormOff}
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
    ciudadReducer,
    domiciliarioReducer,
    cancelacionReducer,
    quejaReducer
  } = state;
  const {pedidos, shouldUpdatePedidos} = pedidoReducer;
  const {direcciones, shouldUpdateDirecciones} = direccionReducer;
  const {domiciliarios, shouldUpdateDomiciliarios} = domiciliarioReducer;
  const {cancelaciones, shouldUpdateCancelaciones, cancelacion} = cancelacionReducer;
  const {quejas, shouldUpdateQuejas, queja} = quejaReducer;
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
    shouldUpdateCiudades,
    domiciliarios,
    shouldUpdateDomiciliarios,
    cancelaciones,
    shouldUpdateCancelaciones,
    cancelacion,
    quejas,
    shouldUpdateQuejas,
    queja
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
  loadCancelaciones,
  destroyCancelacion,
  createCancelacion,
  updateCancelacion,
  loadQuejas,
  destroyQueja,
  createQueja,
  updateQueja,
})(PedidosStatus);
