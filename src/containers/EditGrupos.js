import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import {
  loadItems,
  destroyItem,
  createItem,
  updateItem,
} from '../actions/itemActions';
import {
  loadGrupos,
  destroyGrupo,
  createGrupo,
  updateGrupo,
} from '../actions/grupoActions';

import GruposPanel from '../components/grupos/GruposPanel'
import GrupoModal from '../components/grupos/GrupoModal'
import ItemsList from '../components/grupos/ItemsList'

import {Grid, Col, Row} from 'react-bootstrap';


class EditGrupos extends Component {

  constructor(props) {
    super(props);
    this.state = {
      grupo: {},
      editingGrupo: false,
      selectedGrupo: 0
    };
  }

  componentDidMount() {
    this.props.loadGrupos();
    this.props.loadItems();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.shouldUpdateItems) {
      this.props.loadItems();
    }
    if (nextProps.shouldUpdateGrupos) {
      this.props.loadGrupos();
      this.grupoModalOff();
    }
  }

  selectGrupo = (id) => {
    this.setState({selectedGrupo: id});
    console.error('selectedGrupo', this.state.selectedGrupo);
  };

  itemSelect = (item) => {
    console.error('itemSelect', item);
  };

  handleUpdateGrupo = (grupo) => {
    if (grupo.id) {
      this.props.updateGrupo(grupo.id, grupo);
    } else {
      this.props.createGrupo(grupo);
    }
  };

  grupoModalOff = () => {
    this.setState({editingGrupo: false, grupo: {}});
  };

  updateGrupo = (grupo) =>{
    this.setState({editingGrupo: true, grupo: grupo});
  }

  render = () => {
    return (
      <div>
        <Grid>
          <Row>
            <Col md={3}>
              <GruposPanel
                grupos={this.props.grupos}
                updateGrupo={this.updateGrupo}
                selectGrupo={this.selectGrupo}
                updateItem={this.props.updateItem}
                selectedGrupo={this.state.selectedGrupo}
              />
            </Col>
            <Col md={9}>
              <ItemsList
                itemSelect={this.itemSelect}
                selectedGrupo={this.state.selectedGrupo}
              >
                {this.props.items}
              </ItemsList>
            </Col>
          </Row>
        </Grid>
        <GrupoModal
          initialValues={this.state.grupo}
          grupoSubmit={this.handleUpdateGrupo}
          isModalActive={this.state.editingGrupo}
          grupoModalOff={this.grupoModalOff}
          destroyGrupo={this.props.destroyGrupo}
        />
      </div>
    );
  };
}

EditGrupos.propTypes = {
  loadGrupos: PropTypes.func.isRequired,
  destroyGrupo: PropTypes.func.isRequired,
  createGrupo: PropTypes.func.isRequired,
  updateGrupo: PropTypes.func.isRequired,
  loadItems: PropTypes.func.isRequired,
  destroyItem: PropTypes.func.isRequired,
  createItem: PropTypes.func.isRequired,
  updateItem: PropTypes.func.isRequired,
  grupos: PropTypes.array.isRequired,
  shouldUpdateGrupos: PropTypes.bool.isRequired,
  items: PropTypes.array.isRequired,
  item: PropTypes.object.isRequired,
  shouldUpdateItems: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  const {
    grupoReducer,
    itemReducer,
  } = state;
  const {grupos, shouldUpdateGrupos} = grupoReducer;
  const {items, shouldUpdateItems, item} = itemReducer;
  return {
    grupos,
    shouldUpdateGrupos,
    items,
    item,
    shouldUpdateItems,
  };
}

export default connect(mapStateToProps, {
  loadItems,
  destroyItem,
  createItem,
  updateItem,
  loadGrupos,
  destroyGrupo,
  createGrupo,
  updateGrupo,
})(DragDropContext(HTML5Backend)(EditGrupos));
