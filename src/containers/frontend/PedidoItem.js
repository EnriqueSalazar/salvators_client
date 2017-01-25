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
  Label
} from 'react-bootstrap';
import _ from 'lodash';
import moment from 'moment';
import { estados } from '../../config/'
import { browserHistory } from 'react-router';
import { toastr } from 'react-redux-toastr';

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
      nombreItem: ''
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
    let nombreItem = item && item.id ? item.nombre : '';
    this.setState({filteredMods, nombreItem});
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
    this.setState({selectedModIds, selectedSubmodIds});

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
    let hasModSubmod = this.state.selectedModSubmod.find((modSubmod) => {
      let isIdMod = modSubmod.id_modificador == this.state.selectedModId;
      let isIdSubmod = modSubmod.id_submodificador == selectedSubmodId;
      return isIdMod && isIdSubmod
    })
    let selectedModSubmod = [];
    if (hasModSubmod) {
      selectedModSubmod = this.state.selectedModSubmod.filter((m) => m != hasModSubmod)
    } else {
      let id_modificador = this.state.selectedModId;
      let id_submodificador = selectedSubmodId;
      selectedModSubmod = [...this.state.selectedModSubmod, {id_modificador, id_submodificador}]
    }
    this.setState({selectedModSubmod}, () => this.filterActiveSelected());
  }

  render = () => {
    return (
      <div>
        <center>
        <h1>{this.state.nombreItem}</h1>
        </center>
        <Grid>
          <Row>
            <Col md={8}>
              <center>
                <Well>
                  <h1><Label>Modificadores</Label></h1>
                  <ButtonsPanel
                    list={this.state.filteredMods}
                    onClick={this.handleModClick}
                    selectedId={this.state.selectedModIds}
                    bsStyle='primary'
                    activeStyle='danger'
                  />
                </Well>
                <Well>
                  <h1><Label>Submodificadores</Label></h1>
                  <ButtonsPanel
                    list={this.state.filteredSubmods}
                    onClick={this.handleSubmodClick}
                    selectedId={this.state.selectedSubmodIds}
                    bsStyle='warning'
                    activeStyle='danger'
                  />
                </Well>
              </center>
            </Col>
            <Col md={4}>
              <Well>
                  <PedidoItemModList
                    filteredMods={this.state.filteredMods}
                    selectedModSubmod={this.state.selectedModSubmod}
                    submodificadores={this.props.submodificadores}
                  />
              </Well>
              <center>
              <Button
                onClick={() => this.props.handleItemAccept(this.state.selectedModSubmod)}
                style={{
                  whiteSpace: 'normal',
                  width: '12em',
                  height: '6em',
                }}
              >
                {'Aceptar'}
              </Button>
              <Button
                onClick={() => this.props.handleItemCancel()}
                style={{
                  whiteSpace: 'normal',
                  width: '12em',
                  height: '6em',
                }}
              >
                {'Cancelar'}
              </Button>
              </center>
          </Col>
          </Row>

        </Grid>
      </div>
    )
      ;
  };
}

PedidoItem.propTypes = {
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
