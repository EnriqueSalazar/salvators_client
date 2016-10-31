import React, { Component, PropTypes } from 'react';
import CategoriaItem from './CategoriaItem';
import { Button, Glyphicon, ButtonGroup, Well } from 'react-bootstrap';

class CategoriasPanel extends Component {
  constructor(props) {
    super(props);
  }

  render = () => {
    return (
      <div>
        <h3>Categorias</h3>
        <Well>
          <CategoriaItem
            key={0}
            categoria={{id: 0}}
            updateCategoria={this.props.updateCategoria}
            selectCategoria={this.props.selectCategoria}
            updateItem={this.props.updateItem}
            active={this.props.selectedCategoria == 0}
          />
          {this.props.categorias.map((categoria, i) => {
            return (
              <CategoriaItem
                key={i}
                categoria={categoria}
                updateCategoria={this.props.updateCategoria}
                selectCategoria={this.props.selectCategoria}
                updateItem={this.props.updateItem}
                active={this.props.selectedCategoria == categoria.id}
              />
            )
          })
          }
        </Well>
      </div>
    )
  }

}

CategoriasPanel.propTypes = {};

export default CategoriasPanel;
