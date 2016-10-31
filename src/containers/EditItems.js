import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import {
  loadItems,
  destroyItem,
  createItem,
  updateItem,
} from '../actions/itemActions';
import {
  loadModificadores,
  destroyModificador,
  createModificador,
  updateModificador,
} from '../actions/modificadorActions';
import {
  loadItemMods,
  destroyItemMod,
  createItemMod,
  updateItemMod,
} from '../actions/itemModActions';
import _ from 'lodash';
import Modificadores from '../components/items/Modificadores'
import Item from '../components/items/Item'
import { browserHistory } from 'react-router';
import { Grid, Col, Row } from 'react-bootstrap';
import {
  Button,
  Glyphicon
} from 'react-bootstrap';

class EditItems extends Component {

  constructor(props) {
    super(props);
    this.state = ({
      item: {},
      modFiltered: [],
      shouldUpdate: true
    })
  }

  componentDidMount() {
    this.props.loadItems();
    this.props.loadModificadores();
    this.props.loadItemMods();
    this.setState({
      item: this.props.items.find((item) => {
        return item.id == this.props.params.id;
      })
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.item.id
      && (nextProps.item.id != this.props.params.id)) {
      browserHistory.push('/edititems/' + nextProps.item.id);
      this.props.loadItemMods();
    }
    if (nextProps.shouldUpdateModificadores) {
      this.props.loadModificadores();
    }
    if (nextProps.shouldUpdateItems) {
      this.props.loadItems();
    }
    if (nextProps.shouldUpdateItemMods) {
      this.props.loadItemMods();
    }
    if (!_.isEqual(nextProps.items, this.props.items)) {
      this.setState({
        item: nextProps.items.find((item) => {
          return item.id == this.props.params.id;
        })
      });
      this.props.loadItemMods();
    }
    if (!(_.isEmpty(this.state.item))) {
      let modFiltered =
        nextProps.modificadores.filter((modificador) => {
          return (nextProps.itemMods.find((itemMod) => {
            modificador.id_itemMod = itemMod.id;
            return (
              (itemMod.id_modificador == modificador.id)
              && (itemMod.id_item_menu == this.state.item.id)
            );
          }));
        });
      this.setState({modFiltered});
    }
  }

  shouldComponentUpdate() {
    return this.state.shouldUpdate;
  }

  handleUpdateItem = (item) => {
    if (item.id) {
      this.props.updateItem(item.id, item);
    } else {
      this.props.createItem(item);
    }
  };

  handleDestroyItemMods = (ids) => {
    this.setState({shouldUpdate: false}, () => {
        let toErase = [];
        ids.map((id) => {
          toErase.push(this.props.destroyItemMod(id));
        });
        Promise.all(toErase).then(() => {
          this.setState({shouldUpdate: true});
          this.props.loadItemMods();
        })
      }
    );
  };

  handleDestroyItem = (id) => {
    this.props.destroyItem(id);
    browserHistory.push('/editgrupos/');
  };

  render = () => {
    return (
      <div>
        <Grid>
          <Row>
            <Button
              className="play"
              onClick={() => {
                browserHistory.push('/editgrupos');
              }}
              bsSize="xsmall"
              bsStyle="info"
            >
              <Glyphicon glyph="menu-left"/>
              <Glyphicon glyph="menu-left"/>
              {' Volver'}
            </Button>
            <br />
            <br />
          </Row>
          <Row>
            <Col md={6}>
              <Item
                item={this.state.item}
                modFiltered={this.state.modFiltered}
                itemSubmit={this.handleUpdateItem}
                itemMods={this.props.itemMods}
                createItemMod={this.props.createItemMod}
                handleDestroyItemMods={this.handleDestroyItemMods}
                modificadores={this.props.modificadores}
                handleDestroyItem={this.handleDestroyItem}
              />
            </Col>
            <Col md={6}>
              <Modificadores
                modificadores={this.props.modificadores}
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>

            </Col>
          </Row>
        </Grid>
      </div>
    );
  };

}

EditItems.propTypes = {
  loadItems: PropTypes.func.isRequired,
  destroyItem: PropTypes.func.isRequired,
  createItem: PropTypes.func.isRequired,
  updateItem: PropTypes.func.isRequired,
  loadModificadores: PropTypes.func.isRequired,
  destroyModificador: PropTypes.func.isRequired,
  createModificador: PropTypes.func.isRequired,
  updateModificador: PropTypes.func.isRequired,
  loadItemMods: PropTypes.func.isRequired,
  destroyItemMod: PropTypes.func.isRequired,
  createItemMod: PropTypes.func.isRequired,
  updateItemMod: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  shouldUpdateItems: PropTypes.bool.isRequired,
  modificadores: PropTypes.array.isRequired,
  modificador: PropTypes.object.isRequired,
  shouldUpdateModificadores: PropTypes.bool.isRequired,
  itemMods: PropTypes.array.isRequired,
  shouldUpdateItemMods: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  const {
    itemReducer,
    modificadorReducer,
    itemModReducer
  } = state;
  const {items, shouldUpdateItems, item} = itemReducer;
  const {modificadores, shouldUpdateModificadores, modificador} = modificadorReducer;
  const {itemMods, shouldUpdateItemMods} = itemModReducer;
  return {
    items,
    item,
    shouldUpdateItems,
    modificadores,
    modificador,
    shouldUpdateModificadores,
    itemMods,
    shouldUpdateItemMods
  };
}

export default connect(mapStateToProps, {
  loadItems,
  destroyItem,
  createItem,
  updateItem,
  loadModificadores,
  destroyModificador,
  createModificador,
  updateModificador,
  loadItemMods,
  destroyItemMod,
  createItemMod,
  updateItemMod,
})(DragDropContext(HTML5Backend)(EditItems));
