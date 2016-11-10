import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
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

import PedidosList from '../../components/pedidos/PedidosList'
import OptionsModal from '../../components/pedidos/OptionsModal'
import NuevoPedidoModal from '../../components/pedidos/NuevoPedidoModal'

import { Grid, Col, Row } from 'react-bootstrap';

class PedidosStatus extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isOptionsModalActive: false,
      isNuevoPedidoModalActive: false,
      cliente: {},
      clientes: [],
      direccion: {},
      direcciones: []
    };
  }

  componentDidMount() {
    this.props.loadPedidos();
    this.props.loadClientes();
    this.props.loadDirecciones();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.shouldUpdatePedidos) {
      this.props.loadPedidos();
    }
    if (nextProps.shouldUpdateClientes) {
      this.props.loadClientes();
    }
    if (nextProps.shouldUpdateDirecciones) {
      this.props.loadDirecciones();
    }
    this.filterDirecciones(this.state.cliente, nextProps.direcciones);
  }

  filterDirecciones = (cliente, direcciones) => {
    if (cliente && direcciones) {
      direcciones = direcciones.filter(
        direccion => direccion.id_cliente == cliente.id
      );
      this.setState({direcciones})
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
  optionsModalOn = () => {
    this.setState({
      isOptionsModalActive: true,
      isNuevoPedidoModalActive: false
    });
  }
  selectDireccion = (direccion) => {
    this.setState({direccion})
  }
  optionsModalOff = () => {
    this.setState({isOptionsModalActive: false})
  }
  nuevoPedidoModalOff = () => {
    this.setState({
      isNuevoPedidoModalActive: false,
      cliente: {},
      direcciones: [],
      direccion: {}
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
        />
        <NuevoPedidoModal
          isNuevoPedidoModalActive={this.state.isNuevoPedidoModalActive}
          nuevoPedidoModalOff={this.nuevoPedidoModalOff}
          selectCliente={this.selectCliente}
          selectDireccion={this.selectDireccion}
          cliente={this.state.cliente}
          clientes={this.props.clientes}
          direcciones={this.state.direcciones}
          direccion={this.state.direccion}
          createDireccion={this.props.createDireccion}
          destroyDireccion={this.props.destroyDireccion}
          createCliente={this.props.createCliente}
          destroyCliente={this.props.destroyCliente}
          optionsModalOn={this.optionsModalOn}
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
    direccionReducer
  } = state;
  const {pedidos, shouldUpdatePedidos} = pedidoReducer;
  const {direcciones, shouldUpdateDirecciones} = direccionReducer;
  const {clientes, shouldUpdateClientes} = clienteReducer;
  return {
    pedidos,
    shouldUpdatePedidos,
    direcciones,
    shouldUpdateDirecciones,
    clientes,
    shouldUpdateClientes,
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
  updateCliente,
  loadDirecciones,
  destroyDireccion,
  createDireccion,
  updateDireccion
})(PedidosStatus);
