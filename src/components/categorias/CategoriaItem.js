import React, {Component, PropTypes} from 'react';
import {ItemTypes} from './Constants';
import {DropTarget} from 'react-dnd';
import {
  Button,
  Glyphicon,
  ButtonGroup
} from 'react-bootstrap';

const categoriaTarget = {
  drop(props, monitor) {
    let item = monitor.getItem();
    console.error('Dragged', item.id, 'over', props.categoria.nombre, props.categoria.id);
    props.updateItem(item.id, {id_categoria_menu: props.categoria.id});
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget()
  };
}

class CategoriaItem extends Component {
  constructor(props) {
    super(props);
  }

  TodosButton = () => {
    return (
      <div>
        <ButtonGroup>
          <Button
            onClick={() => this.props.updateCategoria({})}
            bsStyle="primary"
          >
            <Glyphicon glyph="plus"/>
          </Button>
          <Button
            onClick={() => this.props.selectCategoria(0)}
            style={{
              whiteSpace: 'normal',
              width: 130
            }}
            active={this.props.active}
          >
            {"Todos"}
          </Button>
        </ButtonGroup>
        < br />
        < br />
      </div>
    )
  }
  render = () => {
    const {connectDropTarget} = this.props;
    if (this.props.categoria.id == 0) {
      return connectDropTarget(
        <div>
          <this.TodosButton />
        </div>
      )
    } else {
      return connectDropTarget(
        <div>
          <ButtonGroup>
            <Button
              onClick={() => this.props.updateCategoria(this.props.categoria)}
              bsStyle="info"
            >
              <Glyphicon glyph="edit"/>
            </Button>
            <Button
              onClick={() => this.props.selectCategoria(this.props.categoria.id)}
              style={{
                whiteSpace: 'normal',
                width: 130
              }}
              active={this.props.active}
            >
              {this.props.categoria.nombre}
            </Button>
          </ButtonGroup>
        </div>
      )
    }


  }
}

CategoriaItem.propTypes = {};

export default DropTarget(ItemTypes.ITEM, categoriaTarget, collect)(CategoriaItem);
