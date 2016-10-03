import React, {Component, PropTypes} from 'react';
import SubmodificadorItem from './SubmodificadorItem';


const SubmodificadoresList = props => {
  let submodificadores = props.children;
  var selectRowProp = {
    mode: "radio", // or checkbox
    clickToSelect: true
  };
  return (
    <div style={{height: 400}}>
      <BootstrapTable
        data={submodificadores}
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
          insertText: 'Nuevo',
          afterInsertRow: props.createSubmodificador,
          deleteText: 'Eliminar',
          afterDeleteRow: props.destroySubmodificador
        }}
        insertRow={true}
        deleteRow={true}
        selectRow={selectRowProp}
      >
        <TableHeaderColumn
          dataField="id"
          isKey
          dataAlign="center"
          hidden
          hiddenOnInsert={true}
          autoValue={true}
        >
          ID
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
          dataFormat={(cell, row)=>(<SubmodificadorItem value={cell} data={row}/>)}
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
};

SubmodificadoresList.propTypes = {};

export default SubmodificadoresList;
