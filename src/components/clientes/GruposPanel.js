import React, { Component, PropTypes } from 'react';
import GrupoItem from './GrupoItem';
import { Button, Glyphicon, ButtonGroup, Well } from 'react-bootstrap';

class GruposPanel extends Component {
  constructor(props) {
    super(props);
  }

  render = () => {
    return (
      <div>
        <h3>Grupos</h3>
        <Well>
          <GrupoItem
            key={0}
            grupo={{id: 0}}
            updateGrupo={this.props.updateGrupo}
            selectGrupo={this.props.selectGrupo}
            updateItem={this.props.updateItem}
            active={this.props.selectedGrupo == 0}
          />
          {this.props.grupos.map((grupo, i) => {
            return (
              <GrupoItem
                key={i}
                grupo={grupo}
                updateGrupo={this.props.updateGrupo}
                selectGrupo={this.props.selectGrupo}
                updateItem={this.props.updateItem}
                active={this.props.selectedGrupo == grupo.id}
              />
            )
          })
          }
        </Well>
      </div>
    )
  }

}

GruposPanel.propTypes = {};

export default GruposPanel;
