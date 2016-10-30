import React, {Component, PropTypes} from 'react';
import {ItemTypes} from './Constants';
import {DropTarget} from 'react-dnd';
import {
  Button,
  Glyphicon,
  ButtonGroup
} from 'react-bootstrap';

const grupoTarget = {
  drop(props, monitor) {
    let item = monitor.getItem();
    console.error('Dragged', item.id, 'over', props.grupo.nombre, props.grupo.id);
    props.updateItem(item.id, {id_grupo_menu: props.grupo.id});
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget()
  };
}

class GrupoItem extends Component {
  constructor(props) {
    super(props);
  }

  TodosButton = () => {
    return (
      <div>
        <ButtonGroup>
          <Button
            onClick={() => this.props.updateGrupo({})}
            bsStyle="primary"
          >
            <Glyphicon glyph="plus"/>
          </Button>
          <Button
            onClick={() => this.props.selectGrupo(0)}
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
    if (this.props.grupo.id == 0) {
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
              onClick={() => this.props.updateGrupo(this.props.grupo)}
              bsStyle="info"
            >
              <Glyphicon glyph="edit"/>
            </Button>
            <Button
              onClick={() => this.props.selectGrupo(this.props.grupo.id)}
              style={{
                whiteSpace: 'normal',
                width: 130
              }}
              active={this.props.active}
            >
              {this.props.grupo.nombre}
            </Button>
          </ButtonGroup>
        </div>
      )
    }


  }
}

GrupoItem.propTypes = {};

export default DropTarget(ItemTypes.ITEM, grupoTarget, collect)(GrupoItem);
