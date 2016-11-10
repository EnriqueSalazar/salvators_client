import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import {
  loadItems,
  destroyItem,
  createItem,
  updateItem,
} from '../../actions/itemActions';
import {
  loadCategorias,
  destroyCategoria,
  createCategoria,
  updateCategoria,
} from '../../actions/categoriaActions';

import CategoriasPanel from '../../components/categorias/CategoriasPanel'
import CategoriaModal from '../../components/categorias/CategoriaModal'
import ItemsList from '../../components/categorias/ItemsList'

import {Grid, Col, Row} from 'react-bootstrap';


class EditCategorias extends Component {

  constructor(props) {
    super(props);
    this.state = {
      categoria: {},
      editingCategoria: false,
      selectedCategoria: 0
    };
  }

  componentDidMount() {
    this.props.loadCategorias();
    this.props.loadItems();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.shouldUpdateItems) {
      this.props.loadItems();
    }
    if (nextProps.shouldUpdateCategorias) {
      this.props.loadCategorias();
      this.categoriaModalOff();
    }
  }

  selectCategoria = (id) => {
    this.setState({selectedCategoria: id});
    console.error('selectedCategoria', this.state.selectedCategoria);
  };

  itemSelect = (item) => {
    console.error('itemSelect', item);
  };

  handleUpdateCategoria = (categoria) => {
    if (categoria.id) {
      this.props.updateCategoria(categoria.id, categoria);
    } else {
      this.props.createCategoria(categoria);
    }
  };

  categoriaModalOff = () => {
    this.setState({editingCategoria: false, categoria: {}});
  };

  updateCategoria = (categoria) =>{
    this.setState({editingCategoria: true, categoria: categoria});
  }

  render = () => {
    return (
      <div>
        <Grid>
          <Row>
            <Col md={3}>
              <CategoriasPanel
                categorias={this.props.categorias}
                updateCategoria={this.updateCategoria}
                selectCategoria={this.selectCategoria}
                updateItem={this.props.updateItem}
                selectedCategoria={this.state.selectedCategoria}
              />
            </Col>
            <Col md={9}>
              <ItemsList
                itemSelect={this.itemSelect}
                selectedCategoria={this.state.selectedCategoria}
              >
                {this.props.items}
              </ItemsList>
            </Col>
          </Row>
        </Grid>
        <CategoriaModal
          initialValues={this.state.categoria}
          categoriaSubmit={this.handleUpdateCategoria}
          isModalActive={this.state.editingCategoria}
          categoriaModalOff={this.categoriaModalOff}
          destroyCategoria={this.props.destroyCategoria}
        />
      </div>
    );
  };
}

EditCategorias.propTypes = {
  loadCategorias: PropTypes.func.isRequired,
  destroyCategoria: PropTypes.func.isRequired,
  createCategoria: PropTypes.func.isRequired,
  updateCategoria: PropTypes.func.isRequired,
  loadItems: PropTypes.func.isRequired,
  destroyItem: PropTypes.func.isRequired,
  createItem: PropTypes.func.isRequired,
  updateItem: PropTypes.func.isRequired,
  categorias: PropTypes.array.isRequired,
  shouldUpdateCategorias: PropTypes.bool.isRequired,
  items: PropTypes.array.isRequired,
  item: PropTypes.object.isRequired,
  shouldUpdateItems: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  const {
    categoriaReducer,
    itemReducer,
  } = state;
  const {categorias, shouldUpdateCategorias} = categoriaReducer;
  const {items, shouldUpdateItems, item} = itemReducer;
  return {
    categorias,
    shouldUpdateCategorias,
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
  loadCategorias,
  destroyCategoria,
  createCategoria,
  updateCategoria,
})(DragDropContext(HTML5Backend)(EditCategorias));
