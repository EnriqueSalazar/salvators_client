import React, {Component, PropTypes} from 'react';
import {
  Button,
  Glyphicon,
  ButtonGroup
} from 'react-bootstrap';

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
    if (this.props.grupo.id == 0) {
      return (
        <div>
          <this.TodosButton />
        </div>
      )
    } else {
      return (
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

export default GrupoItem;
