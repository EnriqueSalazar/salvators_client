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
  Label,
  FormGroup,
  FormControl,
  ControlLabel,
  Checkbox,
  FieldGroup
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
      restauranteSelect: false,
      editNota: false,
      isSobrecargoEditable: false,
      isDescuentoEditable: false,
      selectedItemNote: '',
      selectedItemPrice:0,

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
            this.setState({pedidoItems}, this.setSubtotal(pedidoItems, nextProps.items));
          } else if (!_.isEqual(this.state.pedidoItems, pedidoItems) || isStatePedidoItemsEmpty) {
            saved = false;
          } else if (this.state.pedido && pedido.id_restaurante != this.state.pedido.id_restaurante) {
            saved = false;

          } else if (this.state.pedido && pedido.nota_pedido != this.state.pedido.nota_pedido) {
            saved = false;
          }
          this.setState({saved});
        }
      }
    }
    this.updateTotal();
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
  handleUpdateItemNote = (e) => {
    const selectedItemNote = e.target.value;
    this.setState({selectedItemNote});
  }
  handleUpdateItemPrice = (selectedItemPrice)=>{
    this.setState({selectedItemPrice});
  }
  handleItemAccept = (selectedModSubmods) => {
    const pedidoItems = this.state.pedidoItems;
    const id_item = this.state.selectedItemId;
    const nota = this.state.selectedItemNote;
    const precio = this.state.selectedItemPrice;
    pedidoItems.push({id_item, nota, selectedModSubmods, precio});
    const selectedItemId = 0;
    const selectedItemNote = '';
    this.setState({selectedItemId, pedidoItems, selectedItemNote}, this.toggleShowItemDetails);
    !_.isEmpty(selectedModSubmods) && this.setState({saved: false});
    const items = this.props.items;
    this.setSubtotal(pedidoItems, items);
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
    const toastrConfirmOptions = {
      onOk: () => browserHistory.push('/frontend/pedidosstatus/'),
      // onCancel: () => this.props.loadPedidos()
    };
    toastr.confirm('Seguro que desea salir sin guardar los cambios?', toastrConfirmOptions);
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
  setSubtotal = (pedidoItems, items) => {
    let sum = 0;
    pedidoItems.map((itemId, h) => {
      let item = items.find((i) => i.id == itemId.id_item);
      const itemPrecio = item.precio || 0;
      sum += itemPrecio;
    })
    this.setState({subtotal: sum}, this.updateTotal());
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
    const restaurantes = this.props.restaurantes;
    return (
      <div>
        <div onClick={this.toggleSelectRestaurante} hidden={this.state.restauranteSelect}>
          <strong>{'Restaurante'}</strong><br />
          {restaurante.id == 0 ? 'PickUp' : 'Nombre: ' + restaurante.nombre}<br />
        </div>
        <FormGroup controlId="formControlsSelect" hidden={!this.state.restauranteSelect}>
          <ControlLabel>Restaurante</ControlLabel>
          <FormControl
            componentClass="select"
            placeholder="Seleccione"
            value={restaurante ? restaurante.id : 'select'}
            onChange={this.selectRestauranteForm}
            onBlur={this.toggleSelectRestaurante}
          >
            <option value="select">Select</option>
            {restaurantes.map((restaurante, i) => {
              return <option key={i} value={restaurante.id}>{restaurante.nombre}</option>
            })}
          </FormControl>
        </FormGroup>
      </div>
    )
  }
  printNota = () => {
    const pedido = this.state.pedido;
    return (

      <div>
        <div
          onClick={() => {
            this.setState({editNota: true})
          }}
          hidden={this.state.editNota}
        >
          <strong>{'Nota'}</strong><br />
          {pedido.nota_pedido && pedido.nota_pedido.substr(0, 25)}
        </div>
        <FormGroup controlId="formControlsTextarea" hidden={!this.state.editNota}
        >
          <ControlLabel>Nota</ControlLabel>
          <FormControl
            value={this.state.pedido.nota_pedido}
            onChange={(e) => {
              this.setState({pedido: Object.assign({}, this.state.pedido, {nota_pedido: e.target.value}), saved: false})
            }}
            onBlur={() => {
              this.setState({editNota: false})
            }}
            componentClass="textarea"
            placeholder="Escriba una nota..."
          />
        </FormGroup>

      </div>
    )
  }
  toggleSelectRestaurante = () => {
    const restauranteSelect = !this.state.restauranteSelect;
    this.setState({restauranteSelect});
  }
  selectRestauranteForm = (e) => {
    const restauranteId = e.target.value;
    let restaurante = {}
    if (restauranteId == 0) {
      restaurante.id = restauranteId;
      restaurante.nombre = 'PickUp';
      restaurante.valor = 0;
    } else {
      restaurante = this.props.restaurantes.find((r) => r.id == restauranteId);
    }
    const pedido = Object.assign(this.state.pedido, {id_restaurante: restauranteId, valor_domicilio: restaurante.valor})
    const saved = false;
    this.setState({restaurante, pedido, saved}, this.updateTotal);
  };
  updateTotal = () => {
    let pedido = this.state.pedido;
    if (pedido) {
      let subtotal = 0;
      this.state.pedidoItems.map((item)=>{
        subtotal+=item.precio;
      })
      pedido.valor_impuesto = (subtotal + pedido.valor_domicilio) * 0.16;
      pedido.subtotal = subtotal;
      pedido.valor_total = pedido.valor_impuesto + pedido.subtotal + pedido.valor_domicilio - pedido.valor_descuento;
      this.setState({pedido});
    }
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

                <ListGroup fill>
                  <ListGroupItem>
                    <strong>{'Cliente'}</strong>

                    {this.state.cliente && this.printCliente()}
                    {this.state.direccion && this.printDireccion()}

                  </ListGroupItem>
                  <ListGroupItem>

                    {this.state.restaurante && this.printRestaurante()}

                    <Checkbox
                      value={this.state.pedido ? this.state.pedido.is_pickup : false}
                      onChange={() => {
                        let pedido = this.state.pedido;
                        pedido.is_pickup = !pedido.is_pickup;
                        if (pedido.is_pickup) {
                          pedido.valor_domicilio = 0;
                        } else {
                          pedido.valor_domicilio = this.state.restaurante.valor;
                        }
                        this.setState({pedido}, this.updateTotal())
                      }}
                    >
                      Para llevar
                    </Checkbox>
                  </ListGroupItem>
                  <ListGroupItem>

                    {this.state.pedido && this.printNota()}

                  </ListGroupItem>
                  <ListGroupItem>
                    <FormGroup>
                      <Row>
                        <Col md={5}>
                          <ControlLabel>Impuestos</ControlLabel>
                          <div style={{textAlign: 'right'}}>
                            {'$ ' + (this.state.pedido && (this.state.pedido.valor_impuesto ? this.state.pedido.valor_impuesto : 0))}
                          </div>
                        </Col>
                        <Col md={5}>
                          <ControlLabel>Subtotal</ControlLabel>
                          <div style={{textAlign: 'right'}}>
                            {'$ ' + (this.state.pedido && (this.state.pedido.subtotal ? this.state.pedido.subtotal : 0))}
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={5}>
                          <ControlLabel>Sobrecargo</ControlLabel>
                          <FormControl
                            type="text"
                            value={this.state.pedido ? this.state.pedido.valor_domicilio : 0}
                            onChange={(e) => {
                              let pedido = this.state.pedido;
                              pedido.valor_domicilio = e.target.value;
                              this.setState({pedido});
                            }}
                          />
                        </Col>
                        <Col md={5}>
                          <ControlLabel>Descuento</ControlLabel>
                          <FormControl
                            type="text"
                            value={this.state.pedido ? this.state.pedido.valor_descuento : 0}
                            onChange={(e) => {
                              let pedido = this.state.pedido;
                              pedido.valor_descuento = e.target.value;
                              this.setState({pedido}, this.updateTotal());
                            }}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col md={10}>
                          <ControlLabel>{'Total '}</ControlLabel>
                          <h2>$ {this.state.pedido ? this.state.pedido.valor_total + 0 : 0}</h2>
                        </Col>
                      </Row>
                    </FormGroup>
                  </ListGroupItem>
                </ListGroup>


              </Panel>
              <Row>
                <Col md={5}>
                  <Button
                    onClick={() => this.handlePedidoSave()}
                    style={{
                      whiteSpace: 'normal',
                      width: '8em',
                      height: '4em',
                    }}
                    block
                    disabled={false && this.state.saved || _.isEmpty(this.state.pedidoItems)}
                    bsStyle="success"
                  >
                    {'Guardar'}
                  </Button>

                </Col>
                <Col md={5}>
                  <Button
                    onClick={this.state.saved ? () => this.handlePedidoAccept() : () => this.handlePedidoCancel()}
                    style={{
                      whiteSpace: 'normal',
                      width: '8em',
                      height: '4em',
                    }}
                    block
                    bsStyle={this.state.saved && !_.isEmpty(this.state.pedidoItems) ? 'primary' : 'danger'}

                  >
                    {this.state.saved && !_.isEmpty(this.state.pedidoItems) ? 'Aceptar y enviar' : 'Cancelar'}
                  </Button>

                </Col>
              </Row>
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
      selectedItemNote={this.state.selectedItemNote}
      handleUpdateItemNote={this.handleUpdateItemNote}
      selectedItemPrice={this.state.selectedItemPrice}
      handleUpdateItemPrice={this.handleUpdateItemPrice}
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
