import React, {Component, PropTypes} from 'react';
import SubmodificadorItem from './SubmodificadorItem';


const SubmodificadoresList = props => {
  let submodificadores = props.children;
  let selectRowProp = {
    mode: "radio", // or checkbox
    clickToSelect: true
  };
  let handleInsertRow=(submodificador)=>{
    delete submodificador.maximo;
    delete submodificador.minimo;
    props.createSubmodificador(submodificador);
  }
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
          onRowClick: props.submodificadorSelect,
          insertText: 'Nuevo',
          afterInsertRow: handleInsertRow,
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
          hiddenOnInsert={true}
        >
          Maximo
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="minimo"
          dataAlign="center"
          hiddenOnInsert={true}
        >
          Minimo
        </TableHeaderColumn>
      </BootstrapTable>
    </div>
  );
};

SubmodificadoresList.propTypes = {};

export default SubmodificadoresList;
