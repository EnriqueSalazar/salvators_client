import React, { Component, PropTypes } from 'react';
import ModificadorItem from './ModificadorItem';
import _ from 'lodash';

import { ItemTypes } from './Constants';
import { DropTarget } from 'react-dnd';

const modTarget = {
  drop(props, monitor) {
    let modificador = monitor.getItem();
    console.error('Dragged', modificador.id);
    props.createItemMod({
      id_item_menu: props.item.id,
      id_modificador: modificador.id
    })
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget()
  };
}

class ItemModList extends Component {
  constructor(props) {
    super(props);
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
          data={this.props.modFiltered}
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
            afterDeleteRow: this.props.handleDestroyItemMods
          }}
          deleteRow={true}
          selectRow={selectRowProp}
        >
          <TableHeaderColumn
            dataField="id_itemMod"
            isKey
            dataAlign="center"
            hidden
          >
            id_itemMod
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
            dataFormat={(cell, row) => (<ModificadorItem value={cell} data={row}/>)}
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

ItemModList.PropTypes = {};

export default DropTarget(ItemTypes.MOD, modTarget, collect)(ItemModList);
