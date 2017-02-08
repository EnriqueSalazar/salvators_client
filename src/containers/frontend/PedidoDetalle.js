//todo select dropdown for restaurants to change on the fly
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {
  Panel,
  ListGroup,
  ListGroupItem
} from 'react-bootstrap';
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
import {
  loadModificadores,
  destroyModificador,
  createModificador,
  updateModificador,
} from '../../actions/modificadorActions';
import {
  loadSubmodificadores,
  destroySubmodificador,
  createSubmodificador,
  updateSubmodificador,
} from '../../actions/submodificadorActions';

import ButtonsPanel from '../../components/pedidodetalle/ButtonsPanel'
import PedidoItemList from '../../components/pedidodetalle/PedidoItemList'
import PedidoItem from './PedidoItem';

import {browserHistory} from 'react-router';

import {
  Grid,
  Row,
  Col,
  Button,
  Glyphicon,
  Well,
  Label
} from 'react-bootstrap';
import _ from 'lodash';
import moment from 'moment';
import {estados} from '../../config/'

import {toastr} from 'react-redux-toastr';

class PedidoDetalle extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedGrupoId: 0,
      selectedItemId: 0,
      filteredItems: [],
      idPedido: 0,
      showItemDetails: 0,
      pedidoItems: [],
      saved: true,
      pedido: null,
      cliente: null,
      direccion: null,
      restaurante: null,
    };
  }

  componentDidMount() {
    this.props.loadGrupos();
    this.props.loadItems();
    this.props.loadModificadores();
    this.props.loadSubmodificadores();
    this.props.loadPedidos();
    this.props.loadClientes();
    this.props.loadRestaurantes();
    this.props.loadDirecciones();
    this.setState({idPedido: this.props.params.id_pedido});
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.shouldUpdateGrupos) {
      this.props.loadGrupos();
    }
    if (nextProps.shouldUpdatePedidos) {
      this.props.loadPedidos();
    }
    if (nextProps.pedidos) {
      let pedido = nextProps.pedidos.find(p => p.id == this.state.idPedido);
      if (pedido) {
        this.setState({pedido});
        if (nextProps.clientes && !this.state.cliente) {
          let cliente = nextProps.clientes.find(c => c.id == pedido.id_cliente);
          this.setState({cliente});
        }
        if (nextProps.restaurantes && !this.state.restaurante) {
          let restaurante = nextProps.restaurantes.find(c => c.id == pedido.id_restaurante);
          this.setState({restaurante});
        }
        if (nextProps.direcciones && !this.state.direccion) {
          let direccion = nextProps.direcciones.find(c => c.id == pedido.id_direccion);
          this.setState({direccion});
        }
        if (pedido) {
          const pedidoItems = pedido.items ? JSON.parse(pedido.items) : [];
          const isStatePedidoItemsEmpty = this.state.pedidoItems.length == 0;
          const isPropsPedidoItemsEmpty = pedidoItems.length == 0;
          let saved = true;
          if (isStatePedidoItemsEmpty && !isPropsPedidoItemsEmpty) {
            this.setState({pedidoItems});
          } else if (!_.isEqual(this.state.pedidoItems, pedidoItems) || isStatePedidoItemsEmpty) {
            saved = false;
          }
          this.setState({saved});
        }
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.pedidos.length > 0;
  }

  toggleShowItemDetails = () => {
    const showItemDetails = !this.state.showItemDetails;
    this.setState({showItemDetails},
      this.props.loadPedidos
    );
  }
  handleGrupoClick = (selectedGrupoId) => {
    let filteredItems = this.props.items.filter((item) => {
      return (
        item.id_grupo_menu == selectedGrupoId
      );
    });
    this.setState({selectedGrupoId, filteredItems});
  }
  handleItemClick = (selectedItemId) => {
    this.setState({selectedItemId}, this.toggleShowItemDetails);
  }
  handleItemAccept = (selectedModSubmods) => {
    let pedidoItems = this.state.pedidoItems;
    let id_item = this.state.selectedItemId;
    pedidoItems.push({id_item, selectedModSubmods});
    let selectedItemId = 0;
    this.setState({selectedItemId, pedidoItems}, this.toggleShowItemDetails);
    !_.isEmpty(selectedModSubmods) && this.setState({saved: false});
  }
  handleItemCancel = () => {
    let selectedItemId = 0;
    this.setState({selectedItemId}, this.toggleShowItemDetails);
  }

  handlePedidoSave = () => {
    // let pedido = this.props.pedidos.find((p) => p.id == this.state.idPedido);
    let pedido = this.state.pedido;
    if (pedido) {
      pedido.items = JSON.stringify(this.state.pedidoItems);
      this.props.updatePedido(pedido.id, pedido);
    }
  }
  handlePedidoCancel = () => {
    browserHistory.push('/frontend/pedidosstatus/');
  }
  handlePedidoAccept = () => {
    let pedido = this.state.pedido;
    if (pedido) {
      pedido.id_estado = 1;
      this.props.updatePedido(pedido.id, pedido).then(() => {
        browserHistory.push('/frontend/pedidosstatus/');
      });
    }

  }
  handleRemoveItem = (i) => {
    let pedidoItems = this.state.pedidoItems;
    pedidoItems.splice(i, 1);
    let saved = false;
    this.setState({pedidoItems, saved});
  }

  printCliente = () => {
    const cliente = this.state.cliente;
    return (
      <div>
        {'Nombre: ' + cliente.nombre}<br />
        {'Cedula: ' + cliente.cedula}<br />
        {'Telefono: ' + cliente.telefono}
      </div>
    )
  }
  printDireccion = () => {
    const direccion = this.state.direccion;
    return (
      <div>
        {'Direccion: ' + direccion.direccion}
      </div>
    )
  }
  printRestaurante = () => {
    const restaurante = this.state.restaurante;
    return (
      <div>
        {'Nombre: ' + restaurante.nombre}<br />
        {'Direccion: ' + restaurante.direccion}<br />
        {'Valor domicilio: ' + restaurante.valor}<br />
      </div>
    )
  }

  pedidoGrupos = () => {
    return (
      <div>
        <Grid>
          <Row>
            <Col md={3}>
              <Panel header="Grupos">
                <center>
                  <ButtonsPanel
                    list={this.props.grupos}
                    onClick={this.handleGrupoClick}
                    selectedId={this.state.selectedGrupoId}
                    bsStyle='primary'
                    activeStyle='danger'
                    isDisabled={false}
                  />
                </center>
              </Panel>

            </Col>
            <Col md={6}>
              <Panel header="Items">
                <ButtonsPanel
                  list={this.state.filteredItems}
                  onClick={this.handleItemClick}
                  selectedId={this.state.selectedItemId}
                  bsStyle='warning'
                  activeStyle='danger'
                  isDisabled={false}
                />
              </Panel>

            </Col>
            <Col md={3}>
              <Panel header="Pedido">

                {this.state.pedidoItems && this.pedidoItemList()}
                <center>
                  <Button
                    onClick={() => this.handlePedidoSave()}
                    style={{
                      whiteSpace: 'normal',
                      width: '8em',
                      height: '4em',
                    }}
                    disabled={this.state.saved || _.isEmpty(this.state.pedidoItems)}
                  >
                    {'Guardar'}
                  </Button>
                  <Button
                    onClick={this.state.saved ? () => this.handlePedidoAccept() : () => this.handlePedidoCancel()}
                    style={{
                      whiteSpace: 'normal',
                      width: '8em',
                      height: '4em',
                    }}
                  >
                    {this.state.saved && !_.isEmpty(this.state.pedidoItems)? 'Aceptar y enviar' : 'Cancelar'}
                  </Button>
                </center>
                <ListGroup fill>
                  <ListGroupItem>
                    <strong>{'Cliente'}</strong>

                    {this.state.cliente && this.printCliente()}
                    {this.state.direccion && this.printDireccion()}

                  </ListGroupItem>
                  <ListGroupItem>
                    <strong>{'Restaurante'}</strong>

                    {this.state.restaurante && this.printRestaurante()}

                  </ListGroupItem>
                </ListGroup>


              </Panel>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }

  pedidoItemList = () => {
    return (<PedidoItemList
      pedidoItems={this.state.pedidoItems}
      items={this.props.items}
      modificadores={this.props.modificadores}
      submodificadores={this.props.submodificadores}
      handleRemoveItem={this.handleRemoveItem}
    />)
  }
  pedidoItem = () => {
    return (<PedidoItem
      idItem={this.state.selectedItemId}
      handleItemAccept={this.handleItemAccept}
      handleItemCancel={this.handleItemCancel}
    />)
  }
  render = () => {
    return <div>{
      this.state.showItemDetails ?
        this.pedidoItem() :
        this.pedidoGrupos()
    }</div>
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
    modificadorReducer,
    submodificadorReducer,
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
  const {modificadores, shouldUpdateModificadores} = modificadorReducer;
  const {submodificadores, shouldUpdateSubmodificadores, submodificador} = submodificadorReducer;
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
    modificadores,
    shouldUpdateModificadores,
    submodificadores,
    submodificador,
    shouldUpdateSubmodificadores,
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
  loadModificadores,
  destroyModificador,
  createModificador,
  updateModificador,
  loadSubmodificadores,
  destroySubmodificador,
  createSubmodificador,
  updateSubmodificador,
})(PedidoDetalle);
