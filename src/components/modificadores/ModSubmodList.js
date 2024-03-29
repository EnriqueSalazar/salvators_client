import React, { Component, PropTypes } from 'react';
import SubmodificadorItem from './SubmodificadorItem';
import _ from 'lodash';

import { ItemTypes } from './Constants';
import { DropTarget } from 'react-dnd';

const submodTarget = {
  drop(props, monitor) {
    let submodificador = monitor.getItem();
    console.error('Dragged', submodificador.id);
    props.createModSubmod({
      id_modificador: props.modificador.id,
      id_submodificador: submodificador.id
    })
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget()
  };
}

class ModSubmodList extends Component {
  constructor(props) {
    super(props);
    this.state = {submodFiltered: []};
  }



  render = () => {
    let selectRowProp = {
      mode: "checkbox", // or radio
      clickToSelect: true
    };
    const {connectDropTarget} = this.props;
    return connectDropTarget(
      <div style={{height: 400}}>
        <BootstrapTable
          data={this.props.submodFiltered}
          striped
          hover
          pagination
          search
          clearSearch
          options={{
            defaultSortName: "orden",
            defaultSortOrder: "asc",
            sizePerPage: 5,
            sizePerPageList: [5, 10, 20, 50],
            deleteText: 'Eliminar',
            afterDeleteRow: this.props.handleDestroyModSubmods
          }}
          deleteRow={true}
          selectRow={selectRowProp}
        >
          <TableHeaderColumn
            dataField="id_modSubmod"
            isKey
            dataAlign="center"
            hidden
          >
            id_modSubmod
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="codigo"
            dataAlign="center"
          >
            Codigo
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="nombre"
            dataAlign="center"
            dataFormat={(cell, row) => (<SubmodificadorItem value={cell} data={row}/>)}
          >
            Nombre
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="maximo"
            dataAlign="center"
          >
            Maximo
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="minimo"
            dataAlign="center"
          >
            Minimo
          </TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }

}

ModSubmodList.PropTypes = {};

export default DropTarget(ItemTypes.SUBMOD, submodTarget, collect)(ModSubmodList);
