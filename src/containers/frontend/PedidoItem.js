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
import {
  loadModSubmods,
  destroyModSubmod,
  createModSubmod,
  updateModSubmod,
} from '../../actions/modSubmodActions';
import {
  loadItemMods,
  destroyItemMod,
  createItemMod,
  updateItemMod,
} from '../../actions/itemModActions';

import ButtonsPanel from '../../components/pedidodetalle/ButtonsPanel'
import PedidoItemModList from '../../components/pedidodetalle/PedidoItemModList'

import {
  Grid,
  Row,
  Col,
  Button,
  Glyphicon,
  Well,
  Label,
  FormGroup,
  ControlLabel,
  FormControl,
  Badge,
} from 'react-bootstrap';
import _ from 'lodash';
import moment from 'moment';
import {estados} from '../../config/'
import {browserHistory} from 'react-router';
import {toastr} from 'react-redux-toastr';

class PedidoItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      filteredMods: [],
      filteredSubmods: [],
      selectedModId: 0,
      selectedModSubmod: [],
      selectedModIds: [],
      selectedSubmodIds: [],
      submodDisabled: false,
      isSaveDisabled: true,
      editNota: false,
      item: {},
    };
  }

  componentDidMount() {
    this.props.loadModificadores();
    this.props.loadSubmodificadores();
    this.props.loadModSubmods();
    this.props.loadItemMods();
    this.props.loadItems();
  }

  componentWillReceiveProps(nextProps) {
    let filteredMods = nextProps.modificadores.filter((mod) => {
      let hasItemMod = nextProps.itemMods.find((itemMod) => {
        let isIdItem = itemMod.id_item_menu == +nextProps.idItem;
        let isIdMod = itemMod.id_modificador == mod.id;
        return isIdItem && isIdMod;
      })
      return hasItemMod;
    })
    let item = nextProps.items.find(item => item.id == +nextProps.idItem);
    item && item.nombre && this.setState({item});
    this.setState({filteredMods});
    if (item && item.precio != nextProps.selectedItemPrice){
      this.calcTotal();
    }
  }

  filterActiveSelected = () => {
    let selectedModIds = this.state.selectedModSubmod.map(m => m.id_modificador)
    selectedModIds = Array.from(new Set(selectedModIds));
    let selectedSubmodIds = this.state.selectedModSubmod.reduce((result, s) => {
      if (s.id_modificador == this.state.selectedModId) {
        result.push(s.id_submodificador);
      }
      return result;
    }, [])
    let isSaveDisabled = false
    this.state.filteredMods.map((mod, i) => {
      let submodsSelected = this.state.selectedModSubmod.filter((m) => m.id_modificador == mod.id)
      const length = submodsSelected.length;
      if (length > 0 && (length < mod.minimo || length > mod.maximo)) {
        isSaveDisabled = true;
      }
    })
    this.setState({selectedModIds, selectedSubmodIds, isSaveDisabled});
    this.calcTotal();
  }
  resetSelected = () => {
    this.setState({
      filteredSubmods: [],
      selectedModId: 0,
      selectedModSubmod: [],
      selectedModIds: [],
      selectedSubmodIds: [],
      submodDisabled: false,
      isSaveDisabled: true,
      editNota: false,
      total:0,
    }, () => this.filterActiveSelected());
  }
  handleModClick = (selectedModId) => {
    let filteredSubmods = this.props.submodificadores.filter((submod) => {
      let hasModSubmods = this.props.modSubmods.find((modSubmod) => {
        let isIdMod = modSubmod.id_modificador == selectedModId;
        let isIdSubmod = modSubmod.id_submodificador == submod.id;
        return isIdMod && isIdSubmod;
      })
      return hasModSubmods;
    });
    this.setState({selectedModId, filteredSubmods}, () => this.filterActiveSelected());
  }

  handleSubmodClick = (selectedSubmodId) => {
    const hasModSubmod = this.state.selectedModSubmod.find((modSubmod) => {
      const isIdMod = modSubmod.id_modificador == this.state.selectedModId;
      const isIdSubmod = modSubmod.id_submodificador == selectedSubmodId;
      return isIdMod && isIdSubmod
    })
    const completeMod = this.state.filteredMods.find((mod) => {
      return this.state.selectedModId == mod.id;
    })
    const isLastSubmod = this.state.selectedSubmodIds.length == 1;
    const isModsInMinLimit = this.state.selectedModIds.length == this.state.item.min_mod;
    const isFirstSubmod = this.state.selectedSubmodIds.length == 0;
    const isModsInMaxLimit = this.state.selectedModIds.length == this.state.item.max_mod;
    const isSubmodsInMaxLimit = this.state.selectedSubmodIds.length == completeMod.maximo;
    const shouldRemove = !(isLastSubmod && isModsInMinLimit);
    const shouldAdd = !(isFirstSubmod && isModsInMaxLimit) && !isSubmodsInMaxLimit;
    if (hasModSubmod) {
      if (shouldRemove) {
        const selectedModSubmod = this.state.selectedModSubmod.filter((m) => m != hasModSubmod)
        this.setState({selectedModSubmod}, () => this.filterActiveSelected());
      }
    } else if (shouldAdd) {
      let id_modificador = this.state.selectedModId;
      let id_submodificador = selectedSubmodId;
      const selectedModSubmod = [...this.state.selectedModSubmod, {id_modificador, id_submodificador}]
      this.setState({selectedModSubmod}, () => this.filterActiveSelected());
    }
  }

  calcTotal = () => {
    let total = this.state.item? this.state.item.precio:0;
    this.state.selectedModIds.map((mod) => {
      const completeMod = this.state.filteredMods.find((m) => mod == m.id);
      total += completeMod.precio;
    })
    const selectedSubmodIds = _.map(this.state.selectedModSubmod, 'id_submodificador');
    selectedSubmodIds.map((sub) => {
      const completeSubmod = this.props.submodificadores.find((s) => s.id == sub);
      total += completeSubmod.precio;
    })
    this.props.handleUpdateItemPrice(total);
  }
  printNota = () => {
    const nota = this.props.selectedItemNote;
    return (

      <div>
        <div
          onClick={(e) => {
            this.setState({editNota: true})
          }}
          hidden={this.state.editNota}
        >
          <strong>{'Nota'}</strong><br />
          {nota.substr(0, 25)}
        </div>
        <FormGroup controlId="formControlsTextarea" hidden={!this.state.editNota}
        >
          <ControlLabel>Nota</ControlLabel>
          <FormControl
            ref="notaTextarea"
            value={nota}
            onChange={(e) => {
              this.props.handleUpdateItemNote(e);
              this.setState({isSaveDisabled: false});
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
  render = () => {
    const item = this.state.item;
    const counter = this.state.selectedModIds.length;
    const counterColor = counter < item.min_mod ? 'red' : 'black';
    const panelTile = (
      <span>
        {item.nombre + ' '}
        <Badge>{counter}</Badge>
        <span style={{whiteSpace: 'nowrap', color: counterColor}}>
          <Glyphicon glyph="arrow-down"/>{item.min_mod}{' '}
          <Glyphicon glyph="arrow-up"/>{item.max_mod}
        </span>
        {' [$' + (item.precio ? item.precio : '0') + ']'}
      </span>
    );
    return (
      <div>

        <Grid>
          <Row>
            <Panel header={panelTile}>
              <Col md={9}>
                <Panel header="Modificadores">
                  <ButtonsPanel
                    list={this.state.filteredMods}
                    onClick={this.handleModClick}
                    selectedId={this.state.selectedModIds}
                    bsStyle='primary'
                    activeStyle='danger'
                    isDisabled={false}
                  />
                </Panel>
                <Panel header="Subodificadores">
                  <ButtonsPanel
                    list={this.state.filteredSubmods}
                    onClick={this.handleSubmodClick}
                    selectedId={this.state.selectedSubmodIds}
                    bsStyle='warning'
                    activeStyle='danger'
                    isDisabled={this.state.submodDisabled}
                  />
                </Panel>
              </Col>
              <Col md={3}>
                <Panel>
                  <ListGroup fill>
                    <ListGroupItem>
                      <PedidoItemModList
                        filteredMods={this.state.filteredMods}
                        selectedModSubmod={this.state.selectedModSubmod}
                        submodificadores={this.props.submodificadores}
                      />
                      <h3>
                      {'Total : $'+this.props.selectedItemPrice}
                      </h3>
                      <Button
                        onClick={this.resetSelected}
                        bsStyle="danger"
                        block
                      >
                        <Glyphicon glyph="erase"/> {' Limpiar'}
                      </Button>

                    </ListGroupItem>
                    <center>
                      <ListGroupItem>
                        {this.printNota()}

                      </ListGroupItem>
                      <ListGroupItem>
                        <Button
                          onClick={() => this.props.handleItemAccept(this.state.selectedModSubmod)}
                          style={{
                            whiteSpace: 'normal',
                            width: '7em',
                            height: '4em',
                          }}
                          disabled={this.state.isSaveDisabled}
                          bsStyle="success"
                        >
                          {'Aceptar'}
                        </Button>
                        <Button
                          onClick={() => this.props.handleItemCancel()}
                          style={{
                            whiteSpace: 'normal',
                            width: '7em',
                            height: '4em',
                          }}
                          bsStyle="danger"
                        >
                          {'Cancelar'}
                        </Button>

                      </ListGroupItem>
                    </center>

                  </ListGroup>
                </Panel>
              </Col>
            </Panel>
          </Row>

        </Grid>
      </div>
    )
      ;
  };
}

PedidoItem.propTypes = {};

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
    quejaReducer,
    modificadorReducer,
    submodificadorReducer,
    modSubmodReducer,
    itemModReducer
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
  const {modSubmods, shouldUpdateModSubmods} = modSubmodReducer;
  const {itemMods, shouldUpdateItemMods} = itemModReducer;
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
    modSubmods,
    shouldUpdateModSubmods,
    itemMods,
    shouldUpdateItemMods
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
  loadModSubmods,
  destroyModSubmod,
  createModSubmod,
  updateModSubmod,
  loadItemMods,
  destroyItemMod,
  createItemMod,
  updateItemMod,
})(PedidoItem);
